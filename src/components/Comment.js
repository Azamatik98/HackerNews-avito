import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { getNewsItem } from "../services/HackerService";
import * as actions from "../components/actions/actions";
import { connect } from "react-redux";
import { timeHackNews } from "../services/date";

const mapStateProps = (state) => {
  return { contentStatus: state.contentStatus };
};

const actionCreators = { changeStatusBranch: actions.changeStatusBranch };

const Comment = ({ commentID, changeStatusBranch, contentStatus }) => {
  const [kids, setKids] = useState([]);
  const [comment, setComment] = useState({});
  const [requestStatus, setRequestStatus] = useState("finished");

  useEffect(() => {
    const getRequest = async () => {
      setRequestStatus("fetching");
      const data = await getNewsItem(commentID);
      setComment(data);
      if (
        !data ||
        !data.kids ||
        !contentStatus.commentBranch[data.id] ||
        contentStatus.commentBranch[data.id] === "closed"
      ) {
        return;
      }
      setKids(data.kids);
    };

    getRequest().then(() => setRequestStatus("finished"));
  }, [commentID, contentStatus]);

  const createMarkup = () => {
    return { __html: comment.text };
  };

  const handleKids = () => {
    if (comment.kids === 0 || kids.length === 0 || !contentStatus) {
      return;
    }
    if (
      contentStatus.commentBranch[comment.id] &&
      contentStatus.commentBranch[comment.id] === "opened"
    ) {
      return kids.map((kidID) => (
        <LazyLoad key={kidID}>
          <Comment
            key={kidID}
            commentID={kidID}
            changeBranchStatus={changeStatusBranch}
            contentStatus={contentStatus}
          />
        </LazyLoad>
      ));
    }
  };

  const handleChangeStatusBranch = () => {
    const status =
      !contentStatus.commentBranch[comment.id] ||
      contentStatus.commentBranch[comment.id] === "closed"
        ? "opened"
        : "closed";
    sessionStorage.setItem(
      "branchesStatus",
      JSON.stringify({ ...contentStatus.commentBranch, [comment.id]: status })
    );
    changeStatusBranch({ id: comment.id, status });
  };

  const btnState =
    !contentStatus.commentBranch[comment.id] ||
    contentStatus.commentBranch[comment.id] === "closed";

  const fetchingStatus = requestStatus === "fetching";

  const renderHeader = () =>
    !comment.by ? (
      <div
        className="skeleton-block skeleton-block-header"
        style={{ maxWidth: "300px" }}
      >
        {" "}
      </div>
    ) : (
      <>
        <span>Author by: </span>
        {comment.by}
        <span> Date: </span>
        {timeHackNews(comment.time)}
      </>
    );

  const renderText = () => {
    if (comment.deleted) {
      return <h4>[The comment has been deleted]</h4>;
    }
    if (comment.text) {
      return (
        <div
          className="comment-text"
          dangerouslySetInnerHTML={createMarkup()}
        />
      );
    }
    return (
      <div className="comment-text">
        <div className="skeleton-block"> </div>
        <div className="skeleton-block"> </div>
        <div className="skeleton-block"> </div>
      </div>
    );
  };

  return (
    comment && (
      <article className="comment">
        <div className="comment-info">{renderHeader()}</div>
        {renderText()}
        {comment.kids ? (
          <button
            className="button button-animated button-comment"
            onClick={handleChangeStatusBranch}
            disabled={fetchingStatus}
          >
            <span>
              <span>{btnState ? "Show" : "Hide"}</span>
            </span>
          </button>
        ) : (
          <div />
        )}
        {handleKids()}
      </article>
    )
  );
};

export default connect(mapStateProps, actionCreators)(Comment);

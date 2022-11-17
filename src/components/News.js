import React, { useEffect, useState } from "react";
import { getNewsItem } from "../services/HackerService";
import Comment from "./Comment";
import NewsSkeleton from "./NewsSkeleton";
import LazyLoad from "react-lazyload";
import { timeHackNews } from "../services/date";

const News = ({
  match: {
    params: { id },
  },
}) => {
  const [news, setNews] = useState({});
  const [comments, setComments] = useState([]);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateComments().then(() => setSeconds(59));
    }
    return () => {
      clearTimeout(timer);
    };
  }, [setSeconds, seconds]);

  useEffect(() => {
    const newsRequest = async () => {
      const response = await getNewsItem(id);
      if (response.kids) {
        setComments(response.kids);
      }
      setNews(response);
    };
    newsRequest().then(() => {});
  }, [id, setComments]);

  const renderComments = () =>
    comments.map((ID) => (
      <LazyLoad key={ID} placeholder={<NewsSkeleton />}>
        <Comment key={ID} ID={ID} />
      </LazyLoad>
    ));

  const handleUpdateComments = async () => {
    const response = await getNewsItem(id);
    if (response.kids) {
      setComments(response.kids);
    }
    setNews(response);
    setSeconds(59);
  };

  const renderTitle = () => {
    if (news.title) {
      return (
        <h2>
          {news.title}
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link link-source"
            href={news.url}
          >
            Switch to the News
          </a>
        </h2>
      );
    }
    return (
      <div className="skeleton-item justify-center">
        <div
          className="skeleton-block skeleton-block-title"
          style={{ maxWidth: "500px" }}
        >
          {" "}
        </div>
      </div>
    );
  };

  const renderInfo = () => {
    if (news.by) {
      return (
        <section className="story-info justify-center">
          <div>
            <span>Points:</span> {news.score}
          </div>
          <div>
            <span>Author by:</span> {news.by}
          </div>
          <div>
            <span>Date:</span> {timeHackNews(news.time)}
          </div>
        </section>
      );
    }
    return (
      <div className="skeleton-item justify-center">
        <div
          className="skeleton-block skeleton-block-info"
          style={{ maxWidth: "50px" }}
        >
          {" "}
        </div>
        <div
          className="skeleton-block skeleton-block-info"
          style={{ maxWidth: "100px" }}
        >
          {" "}
        </div>
        <div
          className="skeleton-block skeleton-block-info"
          style={{ maxWidth: "150px" }}
        >
          {" "}
        </div>
      </div>
    );
  };

  return (
    news && (
      <main>
        <article>
          {renderTitle()}
          {renderInfo()}
          <div className="comments-header">
            <div className="comment-counter-wrapper">
              <span>Comments {news.descendants ?? 0}</span>
            </div>
            <button
              className="button button-animated"
              onClick={handleUpdateComments}
            >
              <span>
                <span>Update</span>
              </span>
            </button>
          </div>
          <section className="comments-list">
            {comments.length > 0 ? (
              renderComments()
            ) : (
              <h3 className="h3">No comments</h3>
            )}
          </section>
        </article>
      </main>
    )
  );
};

export default News;

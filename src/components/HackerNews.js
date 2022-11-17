import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Ids } from "../services/Ids";
import * as actions from "./actions/actions";
import { getHackerNews } from "../services/HackerService";
import NewsPreview from "./NewsPreview";
import LazyLoad from "react-lazyload";
import NewsSkeleton from "./NewsSkeleton";

const mapStateProps = (state) => {
  return { news: state.news, contentStatus: state.contentStatus };
};

const actionCreators = {
  addNewsLast: actions.addNewsLast,
};

const HackerNews = ({ news, addNewsLast }) => {
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateNewsIDs().then(() => setSeconds(59));
    }
    return () => {
      clearTimeout(timer);
    };
  }, [setSeconds, seconds]);

  const handleUpdateNewsIDs = async () => {
    const lastNewsIDs = await getHackerNews();
    addNewsLast({ lastNewsIDs: lastNewsIDs.slice(0, 100) });
    setSeconds(59);
  };

  const renderPlaceholders = () =>
    Ids.map((id) => (
      <div key={id} className="lazyload-wrapper">
        <NewsSkeleton />
      </div>
    ));

  const renderStories = () =>
    news.lastNewsIDs.map((newsID) => (
      <LazyLoad key={newsID} placeholder={<NewsSkeleton />} offset={300}>
        <NewsPreview key={newsID} id={newsID} />
      </LazyLoad>
    ));

  return (
    <main>
      <h2>New News</h2>
      <div className="refresh-btn-wrapper">
        <button
          className="button button-animated"
          onClick={handleUpdateNewsIDs}
        >
          <span>
            <span>Update</span>
          </span>
        </button>
      </div>
      <section className="stories-list">
        {news.lastNewsIDs.length === 0 ? renderPlaceholders() : renderStories()}
      </section>
    </main>
  );
};

export default connect(mapStateProps, actionCreators)(HackerNews);

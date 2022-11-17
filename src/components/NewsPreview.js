import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNewsItem } from "../services/HackerService";
import NewsSkeleton from "./NewsSkeleton";
import { timeHackNews } from "../services/date";

const NewsPreview = ({ id }) => {
  const [news, setNews] = useState({});
  const [requestStatus, setRequestStatus] = useState("fetching");

  useEffect(() => {
    setRequestStatus("fetching");
    const newsRequest = async () => {
      const response = await getNewsItem(id);
      setNews(response);
    };
    newsRequest().then(() => setRequestStatus("finished"));
  }, [id]);

  return !news || requestStatus === "fetching" ? (
    <NewsSkeleton />
  ) : (
    <article className="story-preview">
      <Link className="link" to={`/${news.id}`}>
        {news.title}
      </Link>
      <section className="story-info">
        <div>
          <span>Points:</span> {news.score}
        </div>
        <div>
          <span>Author by:</span> {news.by}
        </div>
        <div>
          <span>Date:</span> {timeHackNews(news.time)}
        </div>
        <div>
          <span>Comments:</span> {news.descendants}
        </div>
      </section>
    </article>
  );
};

export default NewsPreview;

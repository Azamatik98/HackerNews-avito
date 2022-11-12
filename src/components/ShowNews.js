import React from "react";
import NewsList from "./NewsList";
import useDataFetcher from "../hooks/dataHackerNews";
import Loader from "./Loader";

const ShowNews = ({ type }) => {
  const { isLoading, stories } = useDataFetcher(type ? type : "top");

  return (
    <React.Fragment>
      <Loader show={isLoading}>Loading...</Loader>
      <React.Fragment>
        {stories.map(
          ({ data: news }) => news && <NewsList key={news.id} news={news} />
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ShowNews;

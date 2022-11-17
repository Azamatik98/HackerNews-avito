import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../components/actions/actions";
import { getHackerNews } from "../services/HackerService";
import HackerNews from "../components/HackerNews";
import News from "../components/News";
import Header from "../components/Header";

const mapStateProps = (state) => {
  return { news: state.news };
};

const actionCreators = {
  addNewsLast: actions.addNewsLast,
  addNews: actions.addNews,
  setStatusBranch: actions.setStatusBranch,
};

const App = ({ addNewsLast, addNews, setStatusBranch }) => {
  useEffect(() => {
    const getNews = async () => {
      const lastNewsIDs = await getHackerNews();
      const data = JSON.parse(sessionStorage.getItem("branchesStatus"));
      addNewsLast({ lastNewsIDs: lastNewsIDs.slice(0, 100) });
      const commentBranch = data ?? {};
      setStatusBranch({ commentBranch });
    };
    getNews().then(() => {});
  }, [addNewsLast, addNews, setStatusBranch]);

  return (
    <Router basename="/">
      <Header />
      <Switch>
        <Route exact path="/" component={HackerNews} />
        <Route path="/:id" component={News} />
      </Switch>
    </Router>
  );
};

export default connect(mapStateProps, actionCreators)(App);

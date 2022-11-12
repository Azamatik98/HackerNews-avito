import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import ShowNews from "../components/ShowNews";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route
            render={({ match }) => {
              const { type } = match.params;
              return <ShowNews type={type} />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

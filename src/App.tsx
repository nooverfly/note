import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./views/home";
import ReactIndex from "./views/react";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/react">
            <ReactIndex />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

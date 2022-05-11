import { request } from "https";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "./assets/style/animate.css";
import EchartsSummary from "./views/canvas/chart/echarts";
import CssFoundation from "./views/css/foundation";
import CssLibrary from "./views/css/library";
import Home from "./views/home";
import BrowserEvent from "./views/javascript/foundation/browser-event";
import ScrollDemo from "./views/javascript/foundation/scroll";
import RxJSIndex from "./views/javascript/rxjs";
import ReactIndex from "./views/react";
import AntdIndex from "./views/react/antd";
import ContextDemo from "./views/react/context";
import ReactEvent from "./views/react/event";
import CallbackDemo from "./views/react/hooks/useCallback";
import RefDemo from "./views/react/ref";
import SvgFoundation from "./views/svg/foundation";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/react/context" component={ContextDemo}></Route>
          <Route path="/react/ref" component={RefDemo}></Route>
          <Route path="/react/event" component={ReactEvent}></Route>
          <Route path="/react/antd" component={AntdIndex}></Route>
          <Route
            path="/react/hooks/useCallback"
            component={CallbackDemo}
          ></Route>
          <Route path="/react" component={ReactIndex}></Route>
          <Route path="/rxjs" component={RxJSIndex}></Route>
          <Route path="/events" component={BrowserEvent}></Route>
          <Route path="/js-base/scroll" component={ScrollDemo}></Route>
          <Route path="/css/foundation" component={CssFoundation}></Route>
          <Route path="/css/library" component={CssLibrary}></Route>
          <Route path="/svg/foundation" component={SvgFoundation}></Route>
          <Route
            path="/canvas/chart/echarts"
            component={EchartsSummary}
          ></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

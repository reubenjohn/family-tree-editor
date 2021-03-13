import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Viewer from "./components/Viewer";
import Editor from "./components/Editor";

console.log('Demo React version: ', React.version);

export default function AppRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/editor">
            <Editor/>
          </Route>
          <Route path="/">
            <Viewer/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

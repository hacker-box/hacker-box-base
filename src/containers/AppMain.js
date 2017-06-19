const React = require("react");
const { BrowserRouter, Route } = require("react-router-dom");
const StandardLayout = require("../common/containers/StandardLayout");
const ActionTrigger = require("./test/ActionTrigger");
const SelectorTrigger = require("./test/SelectorTrigger");

const AppMain = () => (
  <BrowserRouter>
    <StandardLayout>
      <Route path="/" exact render={() => <h1>:-)</h1>} />
      <Route path="/test/action" component={ActionTrigger} />
      <Route path="/test/selector" component={SelectorTrigger} />
    </StandardLayout>
  </BrowserRouter>
);

module.exports = AppMain;

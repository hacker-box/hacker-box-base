const { createStore, combineReducers, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const loggerMiddleware = require("redux-logger");
const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const { loadJsonFromScript } = require("../common/utils/LoadingUtil");
const { setMessages } = require("../common/utils/MessageUtil");
const CustomLogger = require("../common/utils/CustomLogger");
const promiseMiddleware = require("redux-promise");

require("../styles");

const AppMain = require("../containers/AppMain");
const reducers = require("../reducers");
const logger = loggerMiddleware({ logger: CustomLogger });

const initialState = {};

const reducer = combineReducers(reducers);

const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  logger
)(createStore);

const store = finalCreateStore(reducer, initialState);

setMessages(loadJsonFromScript("messages-bundle"));

ReactDOM.render(
  <Provider store={store}>
    <AppMain />
  </Provider>,
  document.getElementById("root")
);

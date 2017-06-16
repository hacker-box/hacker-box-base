const CustomLogger = {
  history: []
};

const env = process.env.NODE_ENV;
const HISTORY_MAX = 100;
let tout;
let lastState;

function postMessageAndLog(api, post) {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    if (post) {
      CustomLogger.history.push({ api, args });
      if (CustomLogger.history.length > HISTORY_MAX) {
        CustomLogger.history = CustomLogger.history.splice(0, HISTORY_MAX / 2);
      }
      const [msg, , nextState] = args;
      if (msg.indexOf("next state") !== -1) {
        lastState = nextState;
      }
      clearTimeout(tout);
      tout = setTimeout(
        () => {
          window.parent.postMessage(
            JSON.stringify({ action: "setState", data: lastState }),
            "*"
          );
        },
        500
      );
    }
    return console[api](...args);
  };
}

for (let api in console) {
  if (console.hasOwnProperty(api)) {
    CustomLogger[api] = postMessageAndLog(
      api,
      window && window.parent === window.top && env === "development"
    );
  }
}

module.exports = CustomLogger;

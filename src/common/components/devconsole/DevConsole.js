const React = require("react");
const { history } = require("../../utils/CustomLogger");
const _camelCase = require("lodash.camelcase");
const { default: JSONTree } = require("react-json-tree");

const createStyle = css => css.split(";").reduce((reactCss, css) => {
    const [key, value] = css.split(":");
    reactCss[_camelCase(key)] = value;
    return reactCss;
  }, {});

const LogLine = props => {
  const args = props.log.args.slice(0);
  let arg = args.shift();
  const logs = [];
  let key = 0;

  const colorLogs = (msg, idx) =>
    logs.push(
      <span key={key++} style={idx === 0 ? {} : createStyle(args.shift())}>
        {msg}
      </span>
    );

  while (arg) {
    if (typeof arg === "string") {
      arg.split("%c").forEach(colorLogs);
    } else {
      logs.push(
        <JSONTree key={key++} theme="mocha" data={arg} hideRoot={true} />
      );
    }
    arg = args.shift();
  }

  return <div>{logs}</div>;
};

const DevConsole = props => {
  return (
    <div style={{ padding: "10px" }}>
      {props.done && history.map((log, idx) => <LogLine log={log} key={idx} />)}
    </div>
  );
};

module.exports = DevConsole;

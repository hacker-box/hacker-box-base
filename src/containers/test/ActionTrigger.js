const React = require("react");
const { connect } = require("react-redux");
const { DevConsole } = require("../../common/components/devconsole");

class ActionTrigger extends React.Component {
  state = {
    done: false
  };
  componentWillMount = () => {
    const act = this.props.triggerAction();
    if (act && act.then && typeof act.then === "function") {
      act.then(() => this.setState({ done: true }));
    } else {
      this.setState({ done: true });
    }
  };

  render() {
    return <DevConsole done={this.state.done} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    triggerAction: () => {}
  };
}

module.exports = connect(null, mapDispatchToProps)(ActionTrigger);

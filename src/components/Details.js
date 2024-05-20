/** @jsx vNode */
import { vNode, View } from "@ocdla/view";

export default class Details {
  root;
  actions = [];
  props = {};

  constructor(props) {
    this.props = props || {};
  }

  setRoot(node) {
    this.root = node;
  }

  render() {
    return (
      <div>
        <h1>Details Component</h1>
      </div>
    );
  }

  getUserInput(id) {
    let elem = document.getElementById(id);
    return elem.value;
  }

  listenTo(event, selector) {
    let elem = document.querySelector(selector);
    elem.addEventListener(event, this);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let id = target.dataset.id;
    let method;

    // Bail out if we're not interested in the user's interaction.
    if (dataset == null || action == null || !this.actions.includes(action)) {
      return;
    }

    method = "onRequest" + this.toTitleCase(action);

    this[method](dataset);
  }
}

// For future use.
// Don't worry about these.
export function useState(initialValue) {
  console.log("useState called");
  return [initialValue, () => {}];
}

export function useEffect(callback, dependencies) {
  console.log("useEffect called");
  callback();
}

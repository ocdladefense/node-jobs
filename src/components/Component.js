/**
 * Example of a base component class that implements some of the
 * methods of our previous Controller.js class.
 */

/** @jsx vNode */
import { vNode, View } from "@ocdla/view";

export default class Component {
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
        <h1>Component</h1>
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

  async handleEvent(e) {
    // When an error occurs, the message will be displayed to the user.
    // But then, what do we want to happen?  Do go back to the list if there an error?
    // Or do we stay on the page and display the error message?
    // Also validations errors - we obbserved that the error message is displayed, but the form is still submitted.
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let record;
    let message = "";
    let method;
    let error = false;

    if (dataset == null || action == null) {
      return false;
    }
    e.preventDefault();
    e.stopPropagation();

    if (!this.actions.includes(action)) {
      return false;
    }

    method = "onRequest" + this.toTitleCase(action);

    try {
      await this[method](dataset);
      message = "The action was completed successfully.";
    }
    catch(e) {
      console.log(e, method);
      message = e.message;
      error = true;
    }

    window.alert(message);

    // For forms, don't move on to the next page if there was an error.
    if(error) return false;

    window.location.assign("#");
    window.location.reload();
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

export function urlHash(hashPath, params) {
  let hash = `#${hashPath}!`;

  
  Object.keys(params).forEach((key, index) => {
    hash += `${key}=${params[key]}`;

    if (index !== Object.keys(params).length - 1) {
      hash += ";";
    }
  });

  console.log(hash);
  window.location.assign(hash);
}


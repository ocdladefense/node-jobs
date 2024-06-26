/**
 * Example of a base component class that implements some of the
 * methods of our previous Controller.js class.
 */

/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Job from "@ocdla/employment/Job.js";


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
    let message = "";
    let method;
    let error = false;
    let record;
    let type = e.type; // click or submit

    if (dataset == null || action == null) {
      return false;
    }
    e.preventDefault();
    e.stopPropagation();

    if (!this.actions.includes(action)) {
      return false;
    }

    method = "onRequest" + this.toTitleCase(action);

    // Getting form data if needed
    if (action == "save") {
      record = this.getFormData();
      record = record.toSObject();
      dataset = record;
    }

    let result;

    try {
      result = await this[method](dataset);
      message = "The action was completed successfully.";
      if (result.status >= 200 && result.status <= 299) {
        return true;
      }
    }
    catch (e) {
      console.log(e, method);
      window.alert(e.message);
      return false;
    }

    // if result is false, nothing needs to be done
    if (!result) return;

    window.alert(message);

    // For forms, don't move on to the next page if there was an error.
    if (error) return false;

    //urlHash("#");
    return false;
  }

  getFormData() {
    let formEl = document.getElementById("record-form");
    let formData = new FormData(formEl);
  
    return Job.fromFormData(formData);
  }

}



// For future use.
// Don't worry about these.
export function useState(initialValue) {
  console.log("useState called");
  return [initialValue, () => { }];
}

export function useEffect(callback, dependencies) {
  console.log("useEffect called");
  callback();
}

export function urlHash(hash, params) {

  //Checks to make sure hash is not null
  hash = hash || "#";
  // hash has to start with #
  if (!hash.startsWith("#")) {
    hash = "#" + hash;
  }
  hash += "!";
  if (params != null) {
    Object.keys(params).forEach((key, index) => {
      hash += `${key}=${params[key]}`;
      if (index !== Object.keys(params).length - 1) {
        hash += ";";
      }
    });
  }

  window.location.assign(hash);
}

export function parseHash(hash) {
  let paramObj = {};



  if (hash == null) {
    hash = "#";
  }
  if (!hash.indexOf('#') === 0) {
    hash = "#" + hash;
  }


  let route = hash.indexOf('!') === -1 ? hash : hash.substring(hash.indexOf('#'), hash.indexOf('!'));

  if (hash.indexOf('!') === -1) {
    return [route, paramObj];
  }


  let queryString = hash.substring(hash.indexOf('!') + 1);


  if (queryString == "") {
    return [route, paramObj];
  }
  let params = queryString.split(';');

  params.forEach(param => {
    const [key, value] = param.split('=');
    paramObj[key] = value;
  });


  return [ route, paramObj ];

}


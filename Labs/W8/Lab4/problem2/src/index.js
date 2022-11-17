import { interval } from "rxjs";

let hoursInput;
let minutesInput;
let secondsInput;
const source = interval(1000);
const countdownForm = document.getElementById("countdownForm");
const errorDiv = document.getElementById("error");
const numberRegex = /^[0-9]*$/;

function validateForm(formInput) {
  //remove errors on resubmit
  removeError();

  hoursInput = formInput.get("hours").trim();
  minutesInput = formInput.get("minutes").trim();
  secondsInput = formInput.get("seconds").trim();

  //Validate
  //Regex
  if (!numberRegex.test(hoursInput)) {
    displayError("Hours can only contain numbers");
    return false; //one error at a time
  }
  if (!numberRegex.test(minutesInput)) {
    displayError("Minutes can only contain numbers");
    return false; //one error at a time
  }
  if (!numberRegex.test(secondsInput)) {
    displayError("Seconds can only contain numbers");
    return false; //one error at a time
  }

  // not >= 60
  if (minutesInput >= 60) {
    displayError("Minutes must be less than 60");
    return false; //one error at a time
  }
  if (secondsInput >= 60) {
    displayError("Seconds must be less than 60");
    return false; //one error at a time
  }

  // > 0
  if (hoursInput < 0) {
    displayError("Hours must be greater than 0");
    return false; //one error at a time
  }
  if (minutesInput < 0) {
    displayError("Minutes must be greater than 0");
    return false; //one error at a time
  }
  if (secondsInput < 0) {
    displayError("Seconds must be greater than 0");
    return false; //one error at a time
  }

  //Blank check
  if (hoursInput.length < 1) {
    displayError("Hours must not be blank");
    return false; //one error at a time
  }
  if (minutesInput.length < 1) {
    displayError("Minutes must not be blank");
    return false; //one error at a time
  }
  if (secondsInput.length < 1) {
    displayError("Seconds must not be blank");
    return false; //one error at a time
  }
  return true;
}

function displayError(errorMessage) {
  let errorTextElement = document.createElement("p");
  let errorTextNode = document.createTextNode(errorMessage);
  errorTextElement.id = "errorText"; //for styling
  errorTextElement.appendChild(errorTextNode);
  errorDiv.appendChild(errorTextElement);
}

function removeError() {
  let errorTextElement = document.getElementById("errorText");
  if (errorTextElement) {
    //only remove if present
    errorTextElement.parentElement.removeChild(errorTextElement);
  }
}

countdownForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let formInput = new FormData(countdownForm);
  if (validateForm(formInput)) {
    const subscribe = source.subscribe((val) => console.log(val));
    //todo if form is valid
    //disable submit -> stop
    //disable inputs
    //start timer
  }
});

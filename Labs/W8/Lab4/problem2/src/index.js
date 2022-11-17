import { interval } from "rxjs";

let hoursInput;
let minutesInput;
let secondsInput;

const intervalObject = interval(1000);
const hoursField = document.getElementById("hoursInput");
const minutesField = document.getElementById("minutesInput");
const secondsField = document.getElementById("secondsInput");
const countdownForm = document.getElementById("countdownForm");
const countdownSubmitButton = document.getElementById("submitCountdown");
const countdownStopButton = document.getElementById("stopButton");
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
    //Convert Input Fields to ints
    const subscribe = intervalObject.subscribe(() => {
      //Countdown end on time out
      console.log(
        hoursField.value + ":" + minutesField.value + ":" + secondsField.value
      );
      if (
        parseInt(hoursField.value) === 0 &&
        parseInt(minutesField.value) === 0 &&
        parseInt(secondsField.value) === 0
      ) {
        subscribe.unsubscribe();
        hideAndDisableButton(countdownStopButton);
        showAndEnableButton(countdownSubmitButton);
        return;
      }
      if (
        parseInt(minutesField.value) === 0 &&
        parseInt(secondsField.value) === 0
      ) {
        hoursField.value -= 1;
        minutesField.value = 59;
        secondsField.value = 59;
        return;
      }
      if (parseInt(secondsField.value) === 0) {
        secondsField.value = 59;
        minutesField.value -= 1;
        return;
      }
      secondsField.value -= 1;
    });
    hideAndDisableButton(countdownSubmitButton);
    showAndEnableButton(countdownStopButton);
    disableInputs();
  }
});

//todo add stop logic
//todo move event listener to observable

//Button State
function hideAndDisableButton(buttonElement) {
  buttonElement.style.display = "none";
  buttonElement.disabled = true;
}
function showAndEnableButton(buttonElement) {
  buttonElement.style.display = "inline-block";
  buttonElement.disabled = false;
}
function disableInputs() {
  const countdownInputs = document.querySelectorAll("input[type=text]");
  countdownInputs.forEach((input) => {
    input.disabled = true;
  });
}

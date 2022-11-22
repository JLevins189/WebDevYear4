import { interval, fromEvent } from "rxjs";

let hoursInput;
let minutesInput;
let secondsInput;
let startTimerSubscription;

const intervalObject = interval(1000);
const hoursField = document.getElementById("hoursInput");
const minutesField = document.getElementById("minutesInput");
const secondsField = document.getElementById("secondsInput");
const countdownForm = document.getElementById("countdownForm");
const countdownSubmitButton = document.getElementById("submitCountdown");
const countdownStopButton = document.getElementById("stopButton");
const countdownClearButton = document.getElementById("clearButton");
const countdownInputs = document.querySelectorAll("input[type=text]");
const errorDiv = document.getElementById("error");
const numberRegex = /^[0-9]*$/;

//Observables
const countdownFormSubmitObservable = fromEvent(countdownForm, "submit");
countdownFormSubmitObservable.subscribe((ev) => handleSubmit(ev));

const stopButtonObservable = fromEvent(countdownStopButton, "click");
stopButtonObservable.subscribe(() => onStopTimer());

const clearButtonObservable = fromEvent(countdownClearButton, "click");
clearButtonObservable.subscribe(() => clearInputs());

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

  //Blank check & validation
  if (hoursInput.length < 1) {
    hoursField.value = 0;
  }
  if (minutesInput.length < 1) {
    minutesField.value = 0;
  }
  if (secondsInput.length < 1 && minutesInput <= 0 && hoursInput <= 0) {
    displayError("At least one input must be filled in");
    return false; //one error at a time
  }
  if (secondsInput.length < 1) {
    secondsField.value = 0;
  }
  return true;
}

function handleSubmit(ev) {
  ev.preventDefault();
  let formInput = new FormData(countdownForm);

  if (validateForm(formInput)) {
    //Convert Input Fields to ints
    startTimerSubscription = intervalObject.subscribe(() => {
      //Countdown end on time out
      if (
        parseInt(hoursField.value) === 0 &&
        parseInt(minutesField.value) === 0 &&
        parseInt(secondsField.value) === 0
      ) {
        onStopTimer();
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
    onStartTimer();
  }
}

function onStartTimer() {
  hideAndDisableButton(countdownSubmitButton);
  hideAndDisableButton(countdownClearButton);
  showAndEnableButton(countdownStopButton);
  disabledInputs(true);
}

function onStopTimer() {
  startTimerSubscription.unsubscribe();
  hideAndDisableButton(countdownStopButton);
  showAndEnableButton(countdownSubmitButton);
  showAndEnableButton(countdownClearButton);
  disabledInputs(false);
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

//Button State
function hideAndDisableButton(buttonElement) {
  buttonElement.style.display = "none";
  buttonElement.disabled = true;
}
function showAndEnableButton(buttonElement) {
  buttonElement.style.display = "inline-block";
  buttonElement.disabled = false;
}
function disabledInputs(boolean) {
  countdownInputs.forEach((input) => {
    input.disabled = boolean;
  });
}
function clearInputs() {
  countdownInputs.forEach((input) => {
    input.value = "";
  });
}

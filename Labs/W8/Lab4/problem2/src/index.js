let hoursInput;
let minutesInput;
let secondsInput;
const countdownForm = document.getElementById("countdownForm");
const numberRegex = /^[0-9]*$/;

function validateForm(formInput) {
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
  return true;
}

countdownForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  console.log(ev.target);
  let formInput = new FormData(countdownForm);

  if (validateForm(formInput)) {
    //todo if form is valid
    //disable submit -> stop
    //start timer
  }
});

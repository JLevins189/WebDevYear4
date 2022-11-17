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
}

countdownForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  console.log(ev.target);
  let formInput = new FormData(countdownForm);

  if (validateForm(formInput)) {
    //todo if form is valid
  }
});

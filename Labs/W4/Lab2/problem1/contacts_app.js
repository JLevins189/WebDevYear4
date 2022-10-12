const contactsTable = document.getElementById("contactsTable");
const addContactForm = document.getElementById("addContactForm");
const noContactsMessage = document.getElementById("noContactsMessage");
const contactsContentDiv = document.getElementById("contactsContent");
const errorDiv = document.getElementById("error");

const nameRegex = /^[a-zA-Z ]+$/;
const mobileRegex = /^[0-9]*$/;


addContactForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    removeError();
    let formInput = new FormData(addContactForm);
    if(validateForm(formInput))  {  //if form is valid
        addContact(formInput);
        hideNoContactsMessage();
    }
 });

function addContact(formInput)  {
    let nameInput = formInput.get("name").trim();
    let mobileInput = formInput.get("mobile").trim();
    let emailInput = formInput.get("email").trim();

    let tableRowElement = document.createElement("tr");
    let nameTableCellElement = document.createElement("td");
    let mobileTableCellElement = document.createElement("td");
    let emailTableCellElement = document.createElement("td");

    let nameTableCellTextNode = document.createTextNode(nameInput);
    let mobileTableCellTextNode = document.createTextNode(mobileInput);
    let emailTableCellTextNode = document.createTextNode(emailInput);

    nameTableCellElement.appendChild(nameTableCellTextNode);
    mobileTableCellElement.appendChild(mobileTableCellTextNode);
    emailTableCellElement.appendChild(emailTableCellTextNode);

    tableRowElement.appendChild(nameTableCellElement);
    tableRowElement.appendChild(mobileTableCellElement);
    tableRowElement.appendChild(emailTableCellElement);
    contactsTable.appendChild(tableRowElement);
    clearForm();  //clear form input valuesafter successful add
}

function validateForm(formInput)  {
    let nameInput = formInput.get("name").trim();
    let mobileInput = formInput.get("mobile").trim();
    let emailInput = formInput.get("email").trim();

    //Name validation
    if(!(nameInput.length < 20)) {
        displayError("Name should be 20 characters max");
        console.log(nameInput.length);
        return false; //one error at a time
    }
    if(!nameRegex.test(nameInput)){
        displayError("Name only contain letters and spaces");
        return false; //one error at a time
    }
    //Mobile validation
    if(!(mobileInput.length === 10)) {
        displayError("Mobile should be 10 numbers long");
        return false; //one error at a time
    }
    if(!mobileRegex.test(mobileInput)) {
        displayError("Mobile should only contain numbers");
        return false; //one error at a time
    }
    //Email validation    
    if(!(emailInput.length < 40)) {
        displayError("Email should be 40 characters max");
        return false; //one error at a time
    }
    if(!validateEmail(emailInput)) {
        displayError("Email format incorrect");
        return false; //one error at a time
    }
    return true;
}

function displayError(errorMessage)  {
    let errorTextElement = document.createElement("p");
    let errorTextNode = document.createTextNode(errorMessage);
    errorTextElement.id = "errorText"  //for styling
    errorTextElement.appendChild(errorTextNode);
    errorDiv.appendChild(errorTextElement);
}

function removeError()  {
    let errorTextElement = document.getElementById("errorText");
    if(errorTextElement) {  //only remove if present
        errorTextElement.parentElement.removeChild(errorTextElement);
    }
}

function validateEmail(email)  {
    var lastPositionOfAt = email.lastIndexOf('@');
    var lastPositionOfDot = email.lastIndexOf('.');
    //Regex for email is controversial for validation due to older patterns] still being around
    //HTMl carries out most of the validation using input type email
    if(lastPositionOfAt < lastPositionOfDot && lastPositionOfAt > 0 && email.indexOf("@@") === -1 && (email.length - lastPositionOfAt) > 2)
        return true;
    return false;    
}

function clearForm() {
    addContactForm.querySelectorAll("input").forEach(element => {if(!(element.type === "submit")) element.value = "";});  //clear all values except submit button
}

function hideNoContactsMessage()  {
    // hide message
    noContactsMessage.style.display = "none";
    //show table and header
    contactsContentDiv.style.display = "block";
}
const contactsTable = document.getElementById("contactsTable");
const contactsTableBody = contactsTable.tBodies[0];
const addContactForm = document.getElementById("addContactForm");
const noContactsMessage = document.getElementById("noContactsMessage");
const contactsContentDiv = document.getElementById("contactsContent");
const errorDiv = document.getElementById("error");
const searchInput = document.getElementById("mobileSearch");
const noResultDiv = document.getElementById("noResult");

const nameTableHeader = document.getElementById("nameColumn");
const mobileTableHeader = document.getElementById("phoneColumn");
const emailTableHeader = document.getElementById("emailColumn");

const nameRegex = /^[a-zA-Z ]+$/;
const mobileRegex = /^[0-9]*$/;

let nameDirection = -1;  //-1 = ascending //1 = descending
let mobileDirection = -1;  //-1 = ascending //1 = descending
let emailDirection = -1;  //-1 = ascending //1 = descending

hideNoContactsMessage();

nameTableHeader.addEventListener('click', function(ev) {
    sortTable(contactsTable, 0, nameDirection);
    toggleNameDirection();
 });

 mobileTableHeader.addEventListener('click', function(ev) {
    sortTable(contactsTable, 1, mobileDirection);
    toggleMobileDirection();
 });

 emailTableHeader.addEventListener('click', function(ev) {
    sortTable(contactsTable, 2, emailDirection);
    toggleEmailDirection();
 });

 searchInput.addEventListener('keyup', function(ev) {
    search();
});

addContactForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    removeError();
    let formInput = new FormData(addContactForm);
    // if(validateForm(formInput))  {  //if form is valid
    //     addContact(formInput);
    //     hideNoContactsMessage();
    // }
    addContact(formInput);
    hideNoContactsMessage();
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
    contactsTableBody.appendChild(tableRowElement);
    // clearForm();  //clear form input values after successful add
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

function sortTable(table, rowNumber, reverse) {  //stack overflow solution
    let tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0); // put rows into array
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (a.cells[rowNumber].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[rowNumber].textContent.trim())
               );
    });
    for(let i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function toggleNameDirection()  {
    if(nameDirection === 1)  {
        nameDirection = -1;
    }
    else if(nameDirection === -1)  {
        nameDirection = 1;
    }
}

function toggleMobileDirection()  {
    if(mobileDirection === 1)  {
        mobileDirection = -1;
    }
    else if(mobileDirection === -1)  {
        mobileDirection = 1;
    }
}

function toggleEmailDirection()  {
    if(emailDirection === 1)  {
        emailDirection = -1;
    }
    else if(emailDirection === -1)  {
        emailDirection = 1;
    }
}

function search() {
    let resultsAmount = 0;
    let tb = contactsTable.tBodies[0];
    let rows = tb.rows;

    //iterate over rows and get mobile column and filter based off this
    for(let i = 0; i < rows.length; i++)  {
        let mobileNumber = rows[i].cells[1].textContent;
        if (mobileNumber.toUpperCase().indexOf(searchInput.value.toUpperCase()) > -1) {  //i.e. number is found as substring 
          rows[i].style.display = "";
          resultsAmount++;
        } else {
          rows[i].style.display = "none";
        }
        if(resultsAmount === 0)  {
            showNoResults();
        }
        else  {
            hideNoResults();
            console.log(resultsAmount);
        }
    }
}

function showNoResults()  {
    noResultDiv.style.display = "block";
}

function hideNoResults()  {
    noResultDiv.style.display = "none";
}





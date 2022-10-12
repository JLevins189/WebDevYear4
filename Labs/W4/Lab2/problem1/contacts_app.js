let contact_counter = 1;
const contactsTable = document.getElementById("contactsTable");
const addContactForm = document.getElementById("addContactForm");
const noContactsMessage = document.getElementById("noContactsMessage");
const contactsTableHeader = document.getElementById("contactsTableHeader");
const contactsContainer = document.getElementById("contactsContainer");
const errorDiv = document.getElementById("error");

const nameRegex = /^[a-zA-Z ]+$/;
const mobileRegex = /^[0-9]*$/;
const spaceElement = document.createElement("p");
const nonBreakingSpace = document.createTextNode("\u00A0");


addContactForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    removeError();
    let formInput = new FormData(addContactForm);
    validateForm(formInput);
 });

//also implements the edit and delete listeners here
function addContact(noteTextString, noteColour)  {
    hideNoContactsMessage();  //display empty message until a contact is added then add layout around
    //div
    let noteDivElement = document.createElement("div");
    noteDivElement.style.backgroundColor = noteColour;
    noteDivElement.className = "contact";
    noteDivElement.id ="contact_" + contact_counter;  //contact number as id to manipulate

    //text
    let noteTextElement = document.createElement("p");
    noteTextElement.className = "contacttext";
    noteTextElement.id = "contacttext_" + contact_counter;
    let noteTextNode = document.createTextNode(noteTextString);
    noteTextElement.appendChild(noteTextNode);
    noteTextElement.appendChild(document.createElement("br"))
    noteDivElement.appendChild(noteTextElement);

    //edit button
    let editButtonElement = document.createElement("button");
    let editButtonText = document.createTextNode("Edit Contact");
    editButtonElement.id = "editbutton_" + contact_counter;
    editButtonElement.appendChild(editButtonText);
    noteDivElement.appendChild(editButtonElement);

    noteDivElement.appendChild( document.createTextNode( '\u00A0' ) );  //whitespace

    //delete button
    let deleteButtonElement = document.createElement("button");
    let deleteButtonText = document.createTextNode("Delete Contact");
    deleteButtonElement.id = "deletebutton_" + contact_counter;
    deleteButtonElement.appendChild(deleteButtonText);

    noteDivElement.appendChild(deleteButtonElement);

    notesContainer.appendChild(noteDivElement);
    deleteButtonElement.addEventListener("click", function() {
        deleteNote(deleteButtonElement.id);
    });

    //add edit listener
    editButtonElement.addEventListener("click", function() {
        if(editButtonElement.innerHTML === "Save Changes")  {
            console.log(editButtonElement.innerHTML);
            noteTextElement.contentEditable = false;
            editButtonElement.innerHTML = "Edit Contact";
        }
        else if(editButtonElement.innerHTML === "Edit Contact")  {
            console.log(editButtonElement.innerHTML);
            noteTextElement.contentEditable = true;
            editButtonElement.innerHTML = "Save Changes";
        }
    });

    //incriment note id on each addidtion
    contact_counter++;
}

// function deleteNote(deleteButtonId)  {
//     document.getElementById(deleteButtonId).parentElement.remove();
//     note_counter--;
//     if(note_counter < 2)  {
//         showNoNotesMessage();
//     }
// }

function hideNoContactsMessage()  {
    if(contact_counter >= 1)  {
        // hide message
        noContactsMessage.style.display = "none";
        //show headers
        contactsTableHeader.style.display = "block";
    }
}

function showNoNotesMessage()  {
    if(contact_counter < 1)  {
        // hide message
        noContactsMessage.style.display = "block";
        //show headers
        contactsTableHeader.style.display = "none";
    }
}

function validateForm(formInput)  {
    let nameInput = formInput.get("name").trim();
    let mobileInput = formInput.get("mobile").trim();
    let emailInput = formInput.get("email").trim();

    //Name validation
    if(!(nameInput.length < 20)) {
        displayError("Name should be 20 characters max");
        console.log(nameInput.length);
        return; //one error at a time
    }
    if(!nameRegex.test(nameInput)){
        displayError("Name only contain letters and spaces");
        return; //one error at a time
    }
    //Mobile validation
    if(!(mobileInput.length === 10)) {
        displayError("Mobile should be 10 numbers long");
        return; //one error at a time
    }
    if(!mobileRegex.test(mobileInput)) {
        displayError("Mobile should only contain numbers");
        return; //one error at a time
    }
    //Email validation    
    if(!(emailInput.length < 40)) {
        displayError("Email should be 40 characters max");
        return; //one error at a time
    }
    if(!validateEmail(emailInput)) {
        displayError("Email format incorrect");
        return; //one error at a time
    }
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
let contact_counter = 1;
const contactsTable = document.getElementById("contactsTable");
const addContactForm = document.getElementById("addContactForm");
const noContactsMessage = document.getElementById("noContactsMessage");
const contactsTableHeader = document.getElementById("contactsTableHeader");
const contactsContainer = document.getElementById("contactsContainer");
const spaceElement = document.createElement("p");
const nonBreakingSpace = document.createTextNode("\u00A0");


addContactForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let formInput = new FormData(addContactForm);
    validateForm(formInput);
    //todo validate
    //todo errors
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
    const nameRegex = /^[a-zA-Z ]+$/;
    const mobileRegex = /^[0-9]*$/;

    let nameInput = formInput.get("name");
    let mobileInput = formInput.get("mobile");

    //Name validation
    if(!nameInput.length < 20) {}
        //show error
        //break
    if(!nameRegex.test(nameInput)){}
        //show error
        //break

    //Mobile validation    
    if(!mobileRegex.test(mobileInput)){}
        //show error
        //break    
    if(!mobileInput.length === 10){}
        //show error
        //break

    //Email validation    
    


}

function displayError()  {

}

function removeError()  {
    
}
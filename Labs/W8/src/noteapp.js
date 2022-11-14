import { fromEvent } from "rxjs";

let note_counter = 0;
const noteDisplayArea = document.getElementById("note-display");
const addNoteForm = document.getElementById("addNoteForm");
const noNotesMessage = document.getElementById("noNotesMessage");
const notesHeader = document.getElementById("notesHeader");
const notesContainer = document.getElementById("notesContainer");
const spaceElement = document.createElement("p");
const nonBreakingSpace = document.createTextNode("\u00A0");
let deleteNoteSubscription;
// addNoteForm.addEventListener("submit", function (ev) {
// ev.preventDefault();
// let formInput = new FormData(addNoteForm);
// addNote(formInput.get("note"), formInput.get("colours"));
// });

//also implements the edit and delete listeners here
function addNote(noteTextString, noteColour) {
  hideNoNotesMessage(); //display empty message until a note is added then add layout around
  note_counter++; //incriment note id on each addidtion

  //div
  let noteDivElement = document.createElement("div");
  noteDivElement.style.backgroundColor = noteColour;
  noteDivElement.className = "note";
  noteDivElement.id = "note_" + note_counter; //note number as id to manipulate

  //text
  let noteTextElement = document.createElement("p");
  noteTextElement.className = "notetext";
  noteTextElement.id = "notetext_" + note_counter;
  let noteTextNode = document.createTextNode(noteTextString);
  noteTextElement.appendChild(noteTextNode);
  noteTextElement.appendChild(document.createElement("br"));
  noteDivElement.appendChild(noteTextElement);

  //edit button
  let editButtonElement = document.createElement("button");
  let editButtonText = document.createTextNode("Edit Note");
  editButtonElement.id = "editbutton_" + note_counter;
  editButtonElement.appendChild(editButtonText);
  noteDivElement.appendChild(editButtonElement);
  noteDivElement.appendChild(document.createTextNode("\u00A0")); //whitespace

  //delete button
  let deleteButtonElement = document.createElement("button");
  let deleteButtonText = document.createTextNode("Delete Note");
  deleteButtonElement.id = "deletebutton_" + note_counter;
  deleteButtonElement.appendChild(deleteButtonText);
  noteDivElement.appendChild(deleteButtonElement);

  notesContainer.appendChild(noteDivElement); //append all

  //add delete button listener
  const deleteNoteObservable = fromEvent(deleteButtonElement, "click");
  deleteNoteSubscription = deleteNoteObservable.subscribe(deleteNoteObserver);

  //add edit listener
  editButtonElement.addEventListener("click", function () {
    if (editButtonElement.innerHTML === "Save Changes") {
      console.log(editButtonElement.innerHTML);
      noteTextElement.contentEditable = false;
      editButtonElement.innerHTML = "Edit Note";
    } else if (editButtonElement.innerHTML === "Edit Note") {
      console.log(editButtonElement.innerHTML);
      noteTextElement.contentEditable = true;
      editButtonElement.innerHTML = "Save Changes";
    }
  });
}

function deleteNote(deleteButtonId) {
  document.getElementById(deleteButtonId).parentElement.remove();
  note_counter--;
  if (note_counter < 1) {
    showNoNotesMessage();
  }
}

function hideNoNotesMessage() {
  //runs when note is added
  // hide message
  noNotesMessage.style.display = "none";
  //show headers
  notesHeader.style.display = "block";
}

function showNoNotesMessage() {
  //if the last note is deleted a message will appear instead
  // show message
  noNotesMessage.style.display = "block";
  //hide headers
  notesHeader.style.display = "none";
}

//https://dev.to/sagar/reactive-programming-in-javascript-with-rxjs-4jom as template
const addNoteObserver = {
  next: function (e) {
    e.preventDefault();
    let formInput = new FormData(addNoteForm);
    addNote(formInput.get("note"), formInput.get("colours"));
  },
  error: function (err) {
    console.error(err);
  },
  complete: function () {
    console.log("Completed");
  },
};

const deleteNoteObserver = {
  next: function (e) {
    deleteNote(e.target.id);
    deleteNoteSubscription.unsubscribe();
  },
  error: function (err) {
    console.error(err);
  },
  complete: function () {
    console.log("Completed");
  },
};
const addNoteObservable = fromEvent(addNoteForm, "submit");
addNoteObservable.subscribe(addNoteObserver);

import { fromEvent } from "rxjs";

class Note extends HTMLElement {
  editNoteSubscription;
  deleteNoteSubscription;

  constructor(...args) {
    super();
    this.setAttribute("id", args[0]);
    this.setAttribute("noteText", args[1]);
    this.setAttribute("colour", args[2]);
    this.setAttribute("children", args[3]);

    const shadow = this.attachShadow({
      mode: "open",
    });

    let noteDivElement = document.createElement("div");
    noteDivElement.style.backgroundColor = this.getAttribute("colour");
    noteDivElement.setAttribute("class", "note");

    //text
    let noteTextElement = document.createElement("p");
    noteTextElement.setAttribute("class", "notetext");
    noteTextElement.setAttribute("id", this.getAttribute("id"));
    let noteTextNode = document.createTextNode(this.getAttribute("noteText"));
    noteTextElement.appendChild(noteTextNode);
    noteTextElement.appendChild(document.createElement("br"));
    noteDivElement.appendChild(noteTextElement);

    //add related note button
    let addRelatedNoteButtonElement = document.createElement("button");
    let addRelatedNoteButtonText = document.createTextNode("Add Related Note");
    addRelatedNoteButtonElement.appendChild(addRelatedNoteButtonText);
    noteDivElement.appendChild(addRelatedNoteButtonElement);
    noteDivElement.appendChild(document.createTextNode("\u00A0")); //whitespace

    //edit button
    let editButtonElement = document.createElement("button");
    let editButtonText = document.createTextNode("Edit Note");
    editButtonElement.appendChild(editButtonText);
    noteDivElement.appendChild(editButtonElement);
    noteDivElement.appendChild(document.createTextNode("\u00A0")); //whitespace

    //delete button
    let deleteButtonElement = document.createElement("button");
    let deleteButtonText = document.createTextNode("Delete Note");
    // deleteButtonElement.id = "deletebutton_" + note_counter;
    deleteButtonElement.appendChild(deleteButtonText);
    noteDivElement.appendChild(deleteButtonElement);

    shadow.appendChild(noteDivElement); //append all
    notesContainer.appendChild(shadow);

    // add delete button listener
    // const deleteNoteObservable = fromEvent(deleteButtonElement, "click");
    // this.deleteNoteSubscription =
    //   deleteNoteObservable.subscribe(deleteNoteObserver);

    // const editNoteObservable = fromEvent(editButtonElement, "click");
    // this.editNoteSubscription = editNoteObservable.subscribe(() => {
    //   if (editButtonElement.innerHTML === "Save Changes") {
    //     noteTextElement.contentEditable = false;
    //     editButtonElement.innerHTML = "Edit Note";
    //   } else if (editButtonElement.innerHTML === "Edit Note") {
    //     noteTextElement.contentEditable = true;
    //     editButtonElement.innerHTML = "Save Changes";
    //   }
    // });
  }
  add() {
    notesArray.push(this); //add to array of notes
  }
  // update(noteObj) {
  //   notesArray.push(noteObj);
  // }
  remove() {
    notesArray = notesArray.filter((note) => note !== noteObj);
  }
}

let note_counter = 0;
const addNoteForm = document.getElementById("addNoteForm");
const noNotesMessage = document.getElementById("noNotesMessage");
const notesHeader = document.getElementById("notesHeader");
const notesContainer = document.getElementById("notesContainer");

//also implements the edit and delete listeners here
function addNote(noteTextString, noteColour) {
  hideNoNotesMessage(); //display empty message until a note is added then add layout around
  note_counter++; //increment note id on each addidtion
  const note = new Note(note_counter, noteTextString, noteColour, null);
  // note.add();
}

// function deleteNote(deleteButtonId) {
//   document.getElementById(deleteButtonId).parentElement.remove();
//   note_counter--;
//   if (note_counter < 1) {
//     showNoNotesMessage();
//   }
// }

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
    // deleteNote(e.target.id);
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
customElements.define("note-el", Note);

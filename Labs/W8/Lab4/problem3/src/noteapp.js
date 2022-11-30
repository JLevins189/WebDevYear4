import { fromEvent, Subject } from "rxjs";

class Note extends HTMLElement {
  editNoteSubscription;
  children = [];

  constructor(...args) {
    super();
    this.setAttribute("id", args[0]);
    this.setAttribute("noteText", args[1]);
    this.setAttribute("colour", args[2]);

    const shadow = this.attachShadow({
      mode: "open",
    });
    const noteDivElement = document.createElement("div");
    noteDivElement.setAttribute("id", this.getAttribute("id"));
    noteDivElement.style.backgroundColor = this.getAttribute("colour");
    noteDivElement.setAttribute("class", "note");

    //text
    const noteTextElement = document.createElement("p");
    noteTextElement.setAttribute("class", "noteText");
    const noteTextNode = document.createTextNode(this.getAttribute("noteText"));
    noteTextElement.appendChild(noteTextNode);
    noteTextElement.appendChild(document.createElement("br"));
    noteDivElement.appendChild(noteTextElement);
    this.noteDivElement = noteDivElement;

    //add related note button
    const addRelatedNoteButtonElement = document.createElement("button");
    const addRelatedNoteButtonText =
      document.createTextNode("Add Related Note");
    addRelatedNoteButtonElement.appendChild(addRelatedNoteButtonText);
    noteDivElement.appendChild(addRelatedNoteButtonElement);
    noteDivElement.appendChild(document.createTextNode("\u00A0")); //whitespace

    //edit button
    const editButtonElement = document.createElement("button");
    const editButtonText = document.createTextNode("Edit Note");
    editButtonElement.appendChild(editButtonText);
    noteDivElement.appendChild(editButtonElement);
    noteDivElement.appendChild(document.createTextNode("\u00A0")); //whitespace

    this.colourChangeSub = new Subject();
    this.deleteNoteSub = new Subject();

    const changeColourButton = document.createElement("button");
    changeColourButton.setAttribute("id", this.getAttribute("id") + "_change");
    changeColourButton.innerHTML = "Change Colour";
    const changeColourButtonObserver = fromEvent(changeColourButton, "click");
    changeColourButtonObserver.subscribe(() => {
      let newColour = new FormData(addNoteForm).get("colours");
      noteDivElement.style.background = newColour;
      this.setAttribute("colour", newColour);
      this.colourChangeSub.next(newColour);
    });
    noteDivElement.appendChild(changeColourButton);

    //delete button
    const deleteButtonElement = document.createElement("button");
    const deleteButtonText = document.createTextNode("Delete Note");
    deleteButtonElement.appendChild(deleteButtonText);

    const deleteNoteObservable = fromEvent(deleteButtonElement, "click");
    deleteNoteObservable.subscribe(() => {
      deleteNoteDivElement(this.noteDivElement);
      this.deleteNoteSub.next();
    });

    noteDivElement.appendChild(deleteButtonElement);
    shadow.appendChild(noteDivElement); //append all
    if (args.length > 3) {
      const parentElement = args[3];
      if (parentElement.children.length > 0) {
        //2nd or later child - attach after final child
        parentElement.children[
          parentElement.children.length - 1
        ].noteDivElement.after(shadow);
      } else {
        //first child - attach after parent
        parentElement.noteDivElement.after(shadow);
      }
    } else {
      //parent
      notesContainer.appendChild(shadow);
    }

    const newLinked = fromEvent(addRelatedNoteButtonElement, "click");
    newLinked.subscribe(() => this.createLinked(this));

    const editNoteObservable = fromEvent(editButtonElement, "click");
    this.editNoteSubscription = editNoteObservable.subscribe(() => {
      if (editButtonElement.innerHTML === "Save Changes") {
        noteTextElement.contentEditable = false;
        editButtonElement.innerHTML = "Edit Note";
      } else if (editButtonElement.innerHTML === "Edit Note") {
        noteTextElement.contentEditable = true;
        editButtonElement.innerHTML = "Save Changes";
      }
    });
  }
  createLinked(parent) {
    const formInput = new FormData(addNoteForm);
    const childNote = new Note(
      ++note_counter,
      formInput.get("note"),
      parent.getAttribute("colour"),
      parent
    );
    parent.setAttribute(
      "children",
      parseInt(parent.getAttribute("children")) + 1 || 1
    );
    childNote.link(this);
    parent.children.push(childNote);
  }
  link(p) {
    this.setAttribute("parentId", p.id);
    p.colourChangeSub.subscribe((colour) => {
      this.noteDivElement.style.background = colour;
      this.colourChangeSub.next(colour);
    });
    p.deleteNoteSub.subscribe(() => {
      deleteNoteDivElement(this.noteDivElement);
      this.deleteNoteSub.next();
    });
  }
}

let note_counter = 0;
const addNoteForm = document.getElementById("addNoteForm");
const noNotesMessage = document.getElementById("noNotesMessage");
const notesHeader = document.getElementById("notesHeader");
const notesContainer = document.getElementById("notesContainer");

function addRootNote(noteTextString, noteColour) {
  hideNoNotesMessage(); //display empty message until a note is added then add layout around
  note_counter++; //increment note id on each addition
  const note = new Note(note_counter, noteTextString, noteColour);
}

function deleteNoteDivElement(noteDivElement) {
  noteDivElement.remove();
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

//ADD ROOT NOTE
const addNoteObservable = fromEvent(addNoteForm, "submit");
addNoteObservable.subscribe((e) => {
  e.preventDefault();
  let formInput = new FormData(addNoteForm);
  addRootNote(formInput.get("note"), formInput.get("colours"));
});

customElements.define("note-el", Note);

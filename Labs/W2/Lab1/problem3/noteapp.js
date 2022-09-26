let note_counter = 1;
const noteDisplayArea = document.getElementById("note-display");
const addNoteForm = document.getElementById("addNoteForm");

addNoteForm.addEventListener('submit', function(ev) {
    ev.preventDefault();
    var oData = new FormData(addNoteForm);
    console.log(oData.get("note"));
    addNote(oData.get("note"));
 });


function addNote(noteTextString)  {
    //div
    let noteDivElement = document.createElement("div");
    noteDivElement.className ="note";
    noteDivElement.id ="note_" + note_counter;  //note number as id to manipulate

    //text
    let noteTextElement = document.createElement("p");
    noteTextElement.className = "notetext";
    noteTextElement.id = "notetext_" + note_counter;
    let noteTextNode = document.createTextNode(noteTextString);
    noteTextElement.appendChild(noteTextNode);
    noteDivElement.appendChild(noteTextElement);

    //edit button
    let editButtonElement = document.createElement("button");
    let editButtonText = document.createTextNode("Edit Note");
    editButtonElement.id = "editbutton_" + note_counter;
    editButtonElement.appendChild(editButtonText);
    noteDivElement.appendChild(editButtonElement);

    //delete button
    let deleteButtonElement = document.createElement("button");
    let deleteButtonText = document.createTextNode("Delete Note");
    deleteButtonElement.id = "deletebutton_" + note_counter;
    deleteButtonElement.appendChild(deleteButtonText);

    noteDivElement.appendChild(deleteButtonElement);

    noteDisplayArea.appendChild(noteDivElement);
    note_counter++;
    deleteButtonElement.addEventListener("click", function() {
        deleteNote(deleteButtonElement.id);
    });

    editButtonElement.addEventListener("click", function() {
        //todo
        document.
    });
}

function deleteNote(deleteButtonId)  {
    document.getElementById(deleteButtonId).parentElement.remove();
}


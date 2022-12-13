import { useState } from "react";

function NoteListElement(props) {
  const { noteText, noteColour, id, handleDeleteNote } = props;
  const { notes, setNotes } = props.notes;
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing((prev) => !prev);

  const updateNote = (newText) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, noteText: newText } : note
      )
    );
  };

  return (
    <div className="note" style={{ backgroundColor: noteColour }}>
      <p
        className="noteText"
        contentEditable={editing}
        // https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
        onInput={(e) => updateNote(e.currentTarget.textContent)}
      >
        {noteText}
      </p>
      <br />
      <button onClick={toggleEditing}>
        {!editing ? "Edit Note" : "Save Changes"}
      </button>{" "}
      &nbsp;
      <button onClick={() => handleDeleteNote(id)}>Delete Note</button> &nbsp;
    </div>
  );
}
export default NoteListElement;

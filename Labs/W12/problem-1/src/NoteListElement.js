function NoteListElement(props) {
  const { noteText, noteColour, id, handleDeleteNote } = props;

  return (
    <div className="note" style={{ backgroundColor: noteColour }}>
      <p className="noteText">{noteText}</p>
      <br />
      <button>Edit Note</button> &nbsp;
      <button onClick={() => handleDeleteNote(id)}>Delete Note</button> &nbsp;
    </div>
  );
}
export default NoteListElement;

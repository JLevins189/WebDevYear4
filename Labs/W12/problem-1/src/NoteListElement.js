function NoteListElement(props) {
  const { noteText, noteColour } = props;
  return (
    <div className="note" style={{ backgroundColor: noteColour }}>
      <p className="notetext">{noteText}</p>
      <br />
      <button>Edit Note</button> &nbsp;
      <button>Delete Note</button> &nbsp;
    </div>
  );
}
export default NoteListElement;

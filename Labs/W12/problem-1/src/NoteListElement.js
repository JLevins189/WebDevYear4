function NoteListElement(props) {
  return (
    <div className="note" style={{ backgroundColor: "red" }}>
      <p className="notetext"></p>
      <br />
      <button>Edit Note</button> &nbsp;
      <button>Delete Note</button> &nbsp;
    </div>
  );
}
export default NoteListElement;

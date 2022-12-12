function NoteList(props) {
  const { notes } = props;
  return (
    <div id="notesList">
      {notes.length > 0 ? <p>Notes not empty</p> : <p>Notes empty</p>}
    </div>
  );
}

export default NoteList;

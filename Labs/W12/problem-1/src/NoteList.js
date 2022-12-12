import EmptyList from "./EmptyList";

function NoteList(props) {
  const { notes } = props;
  return (
    <div id="notesList">
      {notes.length > 0 ? <p>Notes not empty</p> : <EmptyList />}
    </div>
  );
}

export default NoteList;

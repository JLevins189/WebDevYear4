import EmptyList from "./EmptyList";
import NoteListElement from "./NoteListElement";

function NoteList(props) {
  const { notes } = props;
  return (
    <div id="notesList">
      {notes.length > 0 ? (
        notes.map((note) => <NoteListElement />)
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default NoteList;

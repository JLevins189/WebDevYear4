import EmptyList from "./EmptyList";
import NoteListElement from "./NoteListElement";

function NoteList(props) {
  const { notes, setNotes } = props.notes;

  const handleDeleteNote = (id) => {
    const filteredArray = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(filteredArray);
  };

  return (
    <div id="notesList">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteListElement
            noteText={note.noteText}
            noteColour={note.noteColour}
            key={note.id}
            id={note.id}
            handleDeleteNote={handleDeleteNote}
          />
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default NoteList;

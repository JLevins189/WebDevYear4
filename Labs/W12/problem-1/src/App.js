import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import "./App.css";
import NoteList from "./NoteList";

function App() {
  const [noteText, setNoteText] = useState("");
  const [noteColour, setNoteColour] = useState("white");
  const [notes, setNotes] = useState([]);

  const handleAddNote = (e) => {
    e.preventDefault();
    setNotes((prev) => [...prev, { noteText, noteColour }]);
  };

  return (
    <div className="App">
      <AddNoteForm
        handleSubmit={handleAddNote}
        noteText={{ noteText, setNoteText }}
        noteColour={{ noteColour, setNoteColour }}
      />
      <NoteList notes={notes} />
    </div>
  );
}
export default App;

import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import "./App.css";
import NoteList from "./NoteList";

function App() {
  const [noteCounter, setNoteCounter] = useState(1);
  const [noteText, setNoteText] = useState("");
  const [noteColour, setNoteColour] = useState("white");
  const [notes, setNotes] = useState([]);

  const handleAddNote = (e) => {
    e.preventDefault();
    setNotes((prev) => [...prev, { id: noteCounter, noteText, noteColour }]);
    setNoteCounter((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <AddNoteForm
        handleSubmit={handleAddNote}
        noteText={{ noteText, setNoteText }}
        noteColour={{ noteColour, setNoteColour }}
      />
      <NoteList notes={{ notes, setNotes }} />
    </div>
  );
}
export default App;

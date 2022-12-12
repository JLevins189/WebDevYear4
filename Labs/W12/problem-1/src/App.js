import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import "./App.css";

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
    </div>
  );
}
export default App;

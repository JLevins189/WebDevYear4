import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import "./App.css";

function App() {
  const [noteText, setNoteText] = useState("");
  const [noteColour, setNoteColour] = useState("white");
  const [errorMessage, setErrorMessage] = useState({});

  const handleAddNote = (e) => {
    e.preventDefault();
    if (errorMessage.noteText === null) {
      console.log("Test");
    }
  };

  return (
    <div className="App">
      <AddNoteForm
        handleSubmit={handleAddNote}
        noteText={{ noteText, setNoteText }}
        noteColour={{ noteColour, setNoteColour }}
        errorMessage={{ errorMessage, setErrorMessage }}
      />
    </div>
  );
}

export default App;

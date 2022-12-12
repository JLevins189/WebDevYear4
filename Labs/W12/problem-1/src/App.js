import { useEffect, useState } from "react";
import AddNoteForm from "./AddNoteForm";
import "./App.css";

function App() {
  const [noteText, setNoteText] = useState("");
  const [noteColour, setNoteColour] = useState("white");
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    //Validate Note Text
    if (noteText.length < 1) {
      setErrorMessage((prev) => {
        return { ...prev, noteText: "Note Text must not be blank" };
      });
      return;
    }
    //Clear error message if not blank
    setErrorMessage((prev) => {
      return { ...prev, noteText: null };
    });
  }, [noteText]);

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
      />
    </div>
  );
}

export default App;

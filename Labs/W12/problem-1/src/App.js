import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import "./App.css";

function App() {
  const [noteText, setNoteText] = useState("");
  const [noteColour, setNoteColour] = useState("white");
  const [errorMessage, setErrorMessage] = useState({});

  const handleAddNote = (e) => {
    e.preventDefault();
    console.log("Test");
  };

  return (
    <div className="App">
      <AddNoteForm handleSubmit={handleAddNote} />
    </div>
  );
}

export default App;

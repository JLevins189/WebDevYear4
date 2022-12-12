import AddNoteForm from "./AddNoteForm";
import "./App.css";

function App() {
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

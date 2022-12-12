function AddNoteForm(props) {
  const { noteText, setNoteText } = props.noteText;
  const { noteColour, setNoteColour } = props.noteColour;

  return (
    <form id="addNoteForm" onSubmit={props.handleSubmit}>
      <label htmlFor="note">Note Text:</label>
      <br />
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        required
      />
      <br />

      <label htmlFor="colours">Note Colour:</label>
      <br />
      <select
        name="colours"
        id="colour-selctor"
        value={noteColour}
        onChange={(e) => setNoteColour(e.target.value)}
      >
        <option value="white">White</option>
        <option value="aqua">Aqua</option>
        <option value="yellowgreen">Green</option>
        <option value="pink">Pink</option>
        <option value="yellow">Yellow</option>
        <option value="darkgray">Grey</option>
      </select>
      <br />

      <input type="submit" value="Add Note" />
    </form>
  );
}

export default AddNoteForm;

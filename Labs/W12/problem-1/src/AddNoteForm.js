function AddNoteForm(props) {
  console.log(props);
  const { noteText, setNoteText } = props.noteText;
  const { noteColour, setNoteColour } = props.noteColour;

  return (
    <form id="addNoteForm" onSubmit={props.handleSubmit}>
      <label for="note">Note Text:</label>
      <br />
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <br />

      <label for="colours">Note Colour:</label>
      <br />
      <select name="colours" id="colour-selctor">
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

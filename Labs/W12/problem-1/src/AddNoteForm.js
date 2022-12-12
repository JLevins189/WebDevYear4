function AddNoteForm() {
  return (
    <form id="addNoteForm">
      <label for="note">Note Text:</label>
      <br />
      <input type="text" id="note" name="note" />
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

      <input type="submit" id="addNoteButton" value="Add Note" />
    </form>
  );
}

export default AddNoteForm;

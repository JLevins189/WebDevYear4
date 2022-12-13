# Lecture Review

## Q1.

---

## Props

Props are shorthand for properties. In React, these are properties that are passed into a component through React's unidirectional data flow.

Example of prop usage:

- Component rendering props:

```jsx
function EmptyList(props) {
  const { heading, text } = props;
  return (
    <>
      <h4>{heading || "No Data Yet.."}</h4>
```

- Props being passed to the component

```jsx
<EmptyList
  heading="No Notes yet"
  text="Notes will be available when they are added"
/>
```

## State

State in React tracks a component's state, this is used for tracking and managing their data which could be things like an array of objects to be displayed.

Example of state usage in a component:

- State being updated

```jsx
setNotes((prev) => [...prev, { id: noteCounter, noteText, noteColour }]);
```

- State being used to render components derived from the state

```jsx
notes.map((note) => (
  <NoteListElement
    noteText={note.noteText}
    noteColour={note.noteColour}
    key={note.id}
    id={note.id}
    handleDeleteNote={handleDeleteNote}
    notes={{ notes, setNotes }}
  />
));
```

---

## Q2.

---

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

A functor is a data object that can hold elements of any data type which implements the map operation (a function)
Mapping over said data object will always produce a functor of the same size.

- Example:

```javascript
["test", "test123", "test1"].map((str) => str.length).map((num) => num / 10); // -> [0.4, 0.7, 0.5]
```

---

## Q3.

---

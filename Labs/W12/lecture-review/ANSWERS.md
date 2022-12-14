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

### Promises

- #### Advantages:

  - 1

- #### Disadvantages:

  - 1

### Callbacks

- #### Advantages:

  - 1

- #### Disadvantages:

  - 1

### Streams

- #### Advantages:

  - 1

- #### Disadvantages:

  - 1

---

## Q4.

---

Box Model:

1. **Content** - The content of the box, where text and images appear
2. **Padding** - Clears an area around the content. The padding is transparent
3. **Border** - A border that goes around the padding and content
4. **Margin** - Clears an area outside the border. The margin is transparent

Code Example:

```html
<style>
  div {
    display: inline-block;
    width: 60px;
    border: 10px solid blue;
    padding: 10px;
    margin: 10px;
  }
</style>
<div>
  <p>Content</p>
</div>
<div>
  <p>Content</p>
</div>
<!-- This displays 2 boxes with content, padding, border and margin in a box showing the space between them -->
```

---

![Diagram of CSS Box Model being used for spacing](https://ishadeed.com/assets/spacing-css/spacing-1.png)
Diagram showing padding and margin being used to space elements.

To space elements, we can use margins between elements to space them apart by specific values. To create inner space within an element inside its border we can use padding, this can be useful for things like search boxes to enlarge the element by creating space within its own border.
Borders can be used to create a buffer between the element's inner and outer space to create more space between elements.
In the diagram above, we see how padding "inner space" is used to create a bigger element causing more space between the content of both elements. We also see margin "outer space" is used to create white-space between the 2 elements.

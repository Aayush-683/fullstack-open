import { useState } from "react";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ i, name, ex }) => {
  return (
    <p>
      {i + 1}. {name} - {ex}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={part.name} i={index} name={part.name} ex={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ total }) => {
  return <p>Total Number of exercises {total}</p>;
};

const Counter = () => {
  let [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);

  return (
    <>
      <button onClick={increaseByOne}>
        This button has been clicked {counter} times!
      </button>
      {'\u00A0'.repeat(3)} 
      <button onClick={setToZero}>Reset</button>
    </>
  );
};

const Letters = () => {
  let [text, setText] = useState([]);

  const handleText = (event) => {
    if (event.key === "Backspace") {
      setText(text.slice(0, text.length - 1));
      return;
    }
    if (event.key.length > 1) return;
    setText(text.concat(event.key));
  }

  const clearTXT = () => {
    setText([]);
    document.getElementById("inputBox").value = "";
  }

  return (
    <>
      <p>Press any key to see the key pressed</p>
      <input type="text" id="inputBox" onKeyDown={handleText} />
      {'\u00A0'.repeat(2)}
      <button onClick={clearTXT}>Clear</button>
      <p>Length of the text: {text.length}</p>
      <p>Text: {text.length > 0 ? text.join("") : "No text entered"}</p>
    </>
  );
}

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  const total = parts.reduce((x, y) => x + y.exercises, 0);

  return (
    <>
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total total={total} />
        <Counter />
        <Letters />
      </div>
    </>
  );
};

export default App;

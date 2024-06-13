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
        <Part key={part.id} i={index} name={part.name} ex={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ total }) => {
  return (
    <p>
      <strong>Total Number of exercises {total}</strong>
    </p>
  );
};

const Course = ({ course }) => {
  const parts = course.parts;

  const total = parts.reduce((x, y) => x + y.exercises, 0);

  return (
    <>
      <div>
        <Header course={course.name} />
        <Content parts={parts} />
        <Total total={total} />
      </div>
    </>
  );
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      id: 2,
      name: "Node.js",
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;

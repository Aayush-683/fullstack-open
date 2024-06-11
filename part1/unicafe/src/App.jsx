import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const avg = (good - bad) / all / 100 || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={positive} />
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const ButtonHandler = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [avg, setAvg] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAvg(avg + 1);
  };
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => {
    setBad(bad + 1);
    setAvg(avg - 1);
  };

  if (good + neutral + bad === 0) {
    return (
      <>
        <h1>Give Feedback</h1>
        <ButtonHandler text="good" onClick={handleGood} />
        <ButtonHandler text="neutral" onClick={handleNeutral} />
        <ButtonHandler text="bad" onClick={handleBad} />
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Give Feedback</h1>
        <ButtonHandler text="good" onClick={handleGood} />
        <ButtonHandler text="neutral" onClick={handleNeutral} />
        <ButtonHandler text="bad" onClick={handleBad} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </>
    );
  }
};

export default App;

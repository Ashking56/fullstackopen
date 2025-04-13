import { useState } from 'react'

const Button = ({ handle, text }) => (
  <button onClick={handle}>
    {text}
  </button>
)

const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

);



const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = ((good - bad) / total).toFixed(1);
  const positive = `${((good * 100) / total).toFixed(1)} %`;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}



const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalFeedback = good + neutral + bad

  return (
    <>
      <h1>give feedback</h1>
      <Button handle={() => setGood(good + 1)} text='good' />
      <Button handle={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handle={() => setBad(bad + 1)} text='bad' />
      <h1>Statistics</h1>
      {totalFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </>
  )
}

export default App
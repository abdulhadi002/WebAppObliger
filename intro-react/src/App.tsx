import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Streaks from './Streaks'

/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

function App() {
  console.log('Console log i App')

  const name = "Hadi";
  const age = 21;
  const hobby = "Gaming";

  return (
    <main>
      <h1>Welcome to my project!</h1>
      <h2>Your name is {name}. Your age are {age} and your hobby is {hobby}</h2>
      <Streaks streak={100}/>
    </main>
  );
}

export default App;*/
import Header from './Header';

function App() {
  const student = 'Abdulhadi Abdo'
  const degree = 'Bachelor IT'
  const points = 180
  const experienceOne = 'Web develeper'
  const experienceTwo = 'Website for customer Y'
  const email = 'student@hiof.no'

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experienceOne={experienceOne} experienceTwo={experienceTwo} />
      <Contact email={email} />
    </div>
  )
}

export default App
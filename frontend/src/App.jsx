import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <p className={"underline text-3xl"}>react installed</p>
      </div>
    </>
  )
}

export default App

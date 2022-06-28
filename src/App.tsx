import { useState } from 'react'
import { Encrypt } from './components/Encrypt'
import logo from './logo.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '3.5rem', color: '#444' }}>
          Caeser Cipher
        </h1>
        <p style={{ textAlign: 'center',marginTop:"-1rem",marginBottom:"5rem"}}>Made By Sankalpa Fernando</p>
      </div>
      <Encrypt />
    </div>
  );
}

export default App

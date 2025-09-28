import './App.css'
import { Routes, Route } from 'react-router'

function App() {
  return(
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  )
}

export default App

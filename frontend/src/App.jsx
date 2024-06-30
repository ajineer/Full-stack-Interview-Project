import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import HomePage from './homePage'
import GamePage from './GamePage/GamePage'
import { beginGame } from './routes'


function App() {

  const navigate = useNavigate()

  const handleGameStart = async () => {
    beginGame()
    navigate('/gamePage')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage handleGameStart={handleGameStart}/>}/>
        <Route path="/gamePage" element={<GamePage/>}/>
      </Routes>
    </>
  )
}

export default App

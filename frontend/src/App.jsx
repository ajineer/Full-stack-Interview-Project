import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import HomePage from './homePage'
import GamePage from './GamePage/GamePage'
import { useEffect, useState } from 'react'
import { usePlayerContext } from './useGameContext'


function App() {
  // const [game, setGame] = useState({})
  const navigate = useNavigate()
  const {players, dispatch} = usePlayerContext()
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:5555/game/1")
      const json = await response.json()
      if (response.ok){
        dispatch({type: "SET_PLAYERS", payload: json})
        localStorage.setItem('game', JSON.stringify(json))
        // setGame({...json})
        // navigate('/gamePage')

      }
      else{
        console.log(response.status, "could not retrieve game")
      }
    }
    fetchData()
  },[])

  return (
    <>
      {/* <span>{console.log({game})}</span> */}
      <nav>
        <NavLink to={'/gamePage'}>
          go to game
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/gamePage" element={<GamePage/>}/>
      </Routes>
    </>
  )
}

export default App

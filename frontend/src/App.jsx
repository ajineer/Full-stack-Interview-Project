import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import HomePage from './homePage'
import GamePage from './GamePage/GamePage'
import { useEffect, useState } from 'react'
import { useCardContext, useGameContext, usePlayerContext } from './useContext'


function App() {
  const navigate = useNavigate()
  const {game, dispatch} = useGameContext()
  const {dispatch: playerDispatch} = usePlayerContext()
  const {dispatch: cardDispatch} = useCardContext()

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5555/game/1")
      if (response.ok){
        const json = await response.json()
        dispatch({type: "SET_GAME", payload: json})
        playerDispatch({type: "SET_PLAYERS", payload: json})
        cardDispatch({type: "SET_CARDS", payload: json})
        
        // localStorage.setItem('game', JSON.stringify(json))
        navigate('/gamePage')

      }
      else{
        console.log(response, "could not retrieve game")
      }
    }
    fetchData()
  },[])

  return (
    <div className='app-container'>
      {/* <span>{console.log({game})}</span> */}
      {/* <nav>
        <NavLink to={'/gamePage'}>
          go to game
        </NavLink>
      </nav> */}
      <Routes>
        <Route path="/" element={!game || Object.keys(game).length === 0 ? <HomePage/> : <div>Not allowed</div>}/>
        <Route path="/gamePage" element={<GamePage/>}/>
      </Routes>
    </div>
  )
}

export default App

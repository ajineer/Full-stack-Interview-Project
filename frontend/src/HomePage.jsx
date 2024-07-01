import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCardContext, useGameContext, usePlayerContext } from './useContext'

const HomePage = ({setGame}) => {

    const navigate = useNavigate()
    const {game, dispatch} = useGameContext()
    const {cards, dispatch: cardDispatch} = useCardContext()
    const {players, dispatch: playerDispatch} = usePlayerContext()

    const handleGameStart = async () => {
        if (Object.keys(game).length > 0){
            navigate('/gamePage')
        }else{
            const response = await fetch('http://localhost:5555/game',{
                method:"POST"
            })
            if(response.ok){
                const json = await response.json()
                dispatch({type: "SET_GAME", payload: json})
                cardDispatch({type: "SET_CARDS", payload: json})
                playerDispatch({type: "SET_PLAYERS", payload: json})
                navigate('/gamePage')
            }
            else{
                console.log("error: ", response.status)
            }
        }
    }
    
    return (
    <>
        <button onClick={() => handleGameStart()}>Start New Game</button>
    </>
  )
}

export default HomePage
import React from 'react'
import { beginGame } from './routes'
import { useNavigate } from 'react-router-dom'

const HomePage = ({setGame}) => {

    const navigate = useNavigate()

    const handleGameStart = async () => {
        const response = await beginGame()
        const json = await response.json()
        setGame({...json})
        navigate('/gamePage')
    }
    
    return (
    <>
        <button onClick={() => handleGameStart()}>Start New Game</button>
    </>
  )
}

export default HomePage
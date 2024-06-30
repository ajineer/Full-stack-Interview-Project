import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { beginGame } from './routes'

const HomePage = ({handleGameStart}) => {
    
    return (
    <>
        <button onClick={() => handleGameStart()}>Start New Game</button>
    </>
  )
}

export default HomePage
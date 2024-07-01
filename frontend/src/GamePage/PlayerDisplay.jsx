import React, { useEffect } from 'react'
import { useGameContext, usePlayerContext } from '../useContext'

const PlayerDisplay = () => {

  const {players} = usePlayerContext()
  const {game, dispatch} = useGameContext()

  // useEffect(() => {
  //   dispatch({type: 'GET_GAME', payload: null})
  // },[players])
  
  return (
    <div style={{ display: 'grid', gridTemplateRows: "1fr 1fr", border: '2px solid purple' }}>
    <div style={{ display: "flex", border: '2px solid blue' }}>
      <span>player {players[0]?.id}: &nbsp;&nbsp;</span>
      <span>score: {players[0]?.score}</span>
    </div>
    <div style={{ display: "flex", border: '2px solid blue' }}>
      <span>player {players[1]?.id}: &nbsp;&nbsp;</span>
      <span>score: {players[1]?.score}</span>
    </div>
    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', gridRow: "1 / -1", border: '2px solid red', width: '100%' }}>
      <span>Player {game?.current_player}'s turn</span>
    </div>
  </div>
  )
}

export default PlayerDisplay
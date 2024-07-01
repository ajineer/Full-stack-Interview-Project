import React, { useEffect } from 'react'
import { useGameContext, usePlayerContext } from '../useContext'

const PlayerDisplay = () => {

  const {players} = usePlayerContext()
  const {game, dispatch} = useGameContext()

  // useEffect(() => {
  //   dispatch({type: 'GET_GAME', payload: null})
  // },[players])
  
  return (
    <div>
      {console.log(game.current_player)}
        <div>
            <span>player {players[0]?.id}</span>
            <span>score: {players[0]?.score}</span>
        </div>
        <div>
            <span>player {players[1]?.id}</span>
            <span>score: {players[1]?.score}</span>
        </div>
        <div>Player {game?.current_player}'s turn</div>
    </div>
  )
}

export default PlayerDisplay
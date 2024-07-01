import React, { useEffect } from 'react'
import { usePlayerContext } from '../useGameContext'

const PlayerDisplay = () => {

  const {players} = usePlayerContext()
  
  return (
    <div>
        <div>
            <span>player {players[0]?.id}</span>
            <span>score: {players[0]?.score}</span>
        </div>
        <div>
            <span>player {players[1]?.id}</span>
            <span>score: {players[1]?.score}</span>
        </div>
        {/* <div>Player {game?.current_player}'s turn</div> */}
    </div>
  )
}

export default PlayerDisplay
import React, { useEffect } from 'react'

const PlayerDisplay = ({game}) => {

  console.log(game)
  
  return (
    <div>
        <div>
            <span>player {game?.players[0]?.id}</span>
            <span>score: {game?.players[0]?.score}</span>
        </div>
        <div>
            <span>player {game?.players[1]?.id}</span>
            <span>score: {game?.players[1]?.score}</span>
        </div>
        <div>Player {game?.current_player}'s turn</div>
    </div>
  )
}

export default PlayerDisplay
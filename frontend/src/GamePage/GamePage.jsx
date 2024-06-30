import React, { useEffect, useState } from 'react'
import PlayerDisplay from './PlayerDisplay'
import CardGrid from './CardGrid'
import { fetchGame } from '../routes'

const GamePage = () => {
  
  const [game, setGame] = useState({})

  useEffect(() => {
    setGame(fetchGame())
  },[])


  return (

    //diplay players and their scores
    //display current player
    //diplay non-matched cards in 
    <>
        {console.log(fetchGame())}
        {console.log("game: ", game)}
        <PlayerDisplay game={game}/>
        <CardGrid/>
    </>
  )
}

export default GamePage
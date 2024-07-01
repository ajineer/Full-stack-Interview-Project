import React, { useCallback, useEffect, useState } from 'react'
import PlayerDisplay from './PlayerDisplay'
import CardGrid from './CardGrid'
import { fetchGame } from '../routes'
import { usePlayerContext } from '../useGameContext'

const GamePage = () => {

  return (

    //diplay players and their scores
    //display current player
    //diplay non-matched cards in 
    <>
        <PlayerDisplay/>
        <CardGrid/>
    </>
  )
}

export default GamePage
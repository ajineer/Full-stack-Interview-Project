import React, { useEffect, useMemo, useState } from 'react'
import { useCardContext, useGameContext, usePlayerContext } from '../useContext'
import Card from './Card'
import './cardGrid.css'
import PlayerDisplay from './PlayerDisplay'
import { useNavigate } from 'react-router-dom'

const CardGrid = () => {

  const {game, dispatch} = useGameContext()
  const {cards, dispatch:cardDispatch} = useCardContext()
  const {players, dispatch:playerDispatch} = usePlayerContext()
  const [submittedCards, setSubmittedCards] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleGameEnd = async () => {
      const response = await fetch('http://localhost:5555/game/1', {
        method: "DELETE"
      })
      if(response.ok){
        dispatch({type:"DELETE_GAME"})
        playerDispatch({type:"DELETE_PLAYERS"})
        cardDispatch({type:"DELETE_CARDS"})
        navigate('/')
      }
    }
    if(players[0].score + players[1].score === 10){
      handleGameEnd()
    }else{

      const handleCardsSubmit = async () => {
        const response = await fetch('http://localhost:5555/game/1', {
          method: "PATCH",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({card_1: submittedCards[0], card_2: submittedCards[1]})
        })
        if(response.ok){
          const json = await response.json()
          playerDispatch({type: "PATCH_PLAYERS", payload: json})
          cardDispatch({type: "PATCH_CARDS", payload: json})
          dispatch({type: "PATCH_GAME", payload: json})
          // setSubmittedCards([])
        }
      }
      if(submittedCards.length == 2){
        handleCardsSubmit()
      }
    }
  },[submittedCards])

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: "100%", pointerEvents: `${submittedCards.length > 1 ? 'none' : 'auto' }`}}>
      <PlayerDisplay/>
      <div className='cardGrid'>
        {cards?.map(card => {
          return <Card key={card.id} game={game} card={card} submittedCards={submittedCards} setSubmittedCards={setSubmittedCards}/>
        })}
      </div>
    </div>
  )
}

export default CardGrid
import React, { useEffect, useState } from 'react'
import './Card.css'
import { useGameContext } from '../useContext'
const Card = ({card, submittedCards, setSubmittedCards}) => {

  const {game} = useGameContext()
  const [flipped, setFlipped] = useState(false)
  const [flipTimeout, setFlipTimeout] = useState(null)
  const handleCardClick = (card) => {
      if(!submittedCards.some((c) => c.id === card.id)){
          setSubmittedCards(prev => [card, ...prev])
          setFlipped(true)
      }
  }
  useEffect(() => {
    if(submittedCards.length===2){
        if (flipTimeout) {
            clearTimeout(flipTimeout); // Clear previous timeout if it exists
        }
        const timeout = setTimeout(() => {
            setSubmittedCards([])
            setFlipped(false);
        }, 1000);
        
        // Set the timeout ID to state for cleanup
        setFlipTimeout(timeout);
        
        // Cleanup function to clear timeout on unmount or when game.current_player changes
        return () => {
            if (flipTimeout) {
                clearTimeout(flipTimeout);
            }
        };
    }
  },[game.current_player, submittedCards.length])
  //visibility: `${flipped || card.matched ? "visible" : "hidden"}`
  return (
    <div className='card' onClick={() => handleCardClick(card)} style={{gridColumnStart: card.position[3], gridRowStart: card.position[1], pointerEvents: flipped || submittedCards.length === 2 ? 'none': "auto"}}>
        <span style={{color: `${card.matched? "red" : "green"}`}}>
            {card.value}
        </span>    
    </div>
  )
}

export default Card
import PlayerDisplay from './PlayerDisplay'
import CardGrid from './CardGrid'
import './GamePage.css'
import { useGameContext } from '../useContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const GamePage = () => {
  const {game} = useGameContext()
  const navigate = useNavigate()
  useEffect(() => {
    if(!game){
      navigate('/')
    }
  },[game])
  return (


    //diplay players and their scores
    //display current player
    //diplay non-matched cards in 
    (game && 
        <div className='gamePage'>
          <CardGrid/>
      </div>
    )
  )
}

export default GamePage
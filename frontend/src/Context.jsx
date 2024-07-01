import { createContext, useReducer } from "react";

export const CardContext = createContext()
export const PlayerContext = createContext()
export const GameContext = createContext()


export const GameReducer = (state, action) => {
    switch(action.type){
      case "GET_GAME": 
        return {
          game: state.current_player
        }
      case "SET_GAME":
        return {
          game: {id: action.payload.id, current_player: action.payload.current_player}
        }
      case "PATCH_GAME":
        return {
          game: state = action.payload
        }
      case "DELETE_GAME":
        return {
          game: {}
        }
    }
}

export const CardReducer = (state, action) => {
    switch(action.type){
        case "SET_CARDS":
          return {
            cards: action.payload.cards
          }
        case "PATCH_CARDS":
          return {
            cards: action.payload.cards
          }
        case "DELETE_CARDS":
          return {
            cards: []
          }
      }
    }

export const PlayerReducer = (state, action) => {
    switch(action.type){
        case "SET_PLAYERS":
          return {
            players: action.payload.players
          }
        case "PATCH_PLAYERS":   
          return {
            players: action.payload.players
          }
        case "DELETE_PLAYERS":
          return {
            playerss: []
          }
    }
}
export const CardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CardReducer, {
    cards: [],
  })
  return (
    <CardContext.Provider value={{...state, dispatch}}>
      { children }
    </CardContext.Provider>
  )
}
export const PlayersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PlayerReducer, {
    players: [],
  })
  return (
    <PlayerContext.Provider value={{...state, dispatch}}>
      { children }
    </PlayerContext.Provider>
  )
}
export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, {
    game: new Object(),
  })
  return (
    <GameContext.Provider value={{...state, dispatch}}>
      { children }
    </GameContext.Provider>
  )
}
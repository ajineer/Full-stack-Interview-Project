import { createContext, useReducer } from "react";

export const CardContext = createContext()
export const PlayerContext = createContext()

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
        }
    }

export const PlayerReducer = (state, action) => {
    switch(action.type){
        case "PATCH_PLAYERS":   
            return {
                players: action.payload.players
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
  const [state, dispatch] = useReducer(PlayerContext, {
    players: [],
  })
  return (
    <PlayerContext.Provider> value={{...state, dispatch}}
      { children }
    </PlayerContext.Provider>
  )
}
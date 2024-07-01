import { PlayerContext, CardContext, GameContext} from './Context'
import { useContext } from "react";

export const usePlayerContext = () => {
    const context = useContext(PlayerContext)
    if(!context){
        throw Error('usePlayerContext must be used inside PlayerContextProvider')
    }

    return context
}

export const useCardContext = () => {
    const context = useContext(CardContext)
    if(!context){
        throw Error("useCardContext must be used inside CardContextProvider")
    }
    return context
}

export const useGameContext = () => {
    const context = useContext(GameContext)
    if(!context){
        throw Error("useGameContext must be used inside GameContextProvider")
    }
    return context
}
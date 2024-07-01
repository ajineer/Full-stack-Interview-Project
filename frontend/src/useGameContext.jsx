import { PlayerContext, CardContext} from './gameContext'
import { useContext } from "react";

export const usePlayerContext = () => {
    const context = useContext(PlayerContext)
    if(!context){
        throw Error('usePlayerContext must be used inside PlayerContextProvider')
    }

    return context
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CardsContextProvider, GameContextProvider, PlayersContextProvider } from './Context.jsx'
import { BrowserRouter as Router} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameContextProvider>  
      <CardsContextProvider>
        <PlayersContextProvider>
          <Router>
            <App />
          </Router>
        </PlayersContextProvider>
      </CardsContextProvider>
    </GameContextProvider>
  </React.StrictMode>,
)

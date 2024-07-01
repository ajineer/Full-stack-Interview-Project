import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CardsContextProvider, PlayersContextProvider } from './gameContext.jsx'
import { BrowserRouter as Router} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CardsContextProvider>
      <PlayersContextProvider>
        <Router>
          <App />
        </Router>
      </PlayersContextProvider>
    </CardsContextProvider>
  </React.StrictMode>,
)

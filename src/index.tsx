import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
import './styles/main.css'

hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

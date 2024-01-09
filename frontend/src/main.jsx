import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { DataContextProvider } from './context/DataContext'
import { LoadingContextProvider } from './context/LoadingContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
)

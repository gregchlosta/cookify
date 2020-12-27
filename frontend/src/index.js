import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import store from './store'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import './index.css'
import App from './App'

ReactDOM.render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
)

import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as StoreProvider } from 'react-redux'
import theme from './theme'
import configureStore from './stores'
import MainNavigation from './navigation'

const store = configureStore()

function App() {
  return (
    <StoreProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <MainNavigation />
      </MuiThemeProvider>
    </StoreProvider>
  )
}

export default App

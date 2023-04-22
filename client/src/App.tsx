import { useEffect, useState } from 'react'
import { useStockStore } from './stores/useStockStore'
import { ProvideController } from './controllers/Controller'
import { Route, Routes } from 'react-router-dom'
import { userService } from './services/userService'
import { createTheme, useTheme } from '@mui/material/styles'

import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import StockPage from './pages/StockPage'
import NavBar from './components/NavBar'

import { ThemeOptions, ThemeProvider } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#eaeaea',
    },
  },
}

function App() {
  const theme = createTheme(themeOptions)
  const { getAllStocks } = useStockStore()
  const [user, setUser] = useState(userService.getUser())

  useEffect(() => {
    if (user) getAllStocks(user._id)
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ProvideController>
          {user ? (
            <>
              <NavBar setUser={setUser} />
              <Routes>
                <Route path="/" element={<LandingPage user={user} />} />
                <Route path="/:id" element={<StockPage user={user} />} />
              </Routes>
            </>
          ) : (
            <AuthPage setUser={setUser} />
          )}
        </ProvideController>
      </ThemeProvider>
    </div>
  )
}

export default App

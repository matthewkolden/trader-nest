import { useEffect, useState } from 'react'
import { useStockStore } from './stores/useStockStore'
import { ProvideController } from './controllers/Controller'
import { Route, Routes } from 'react-router-dom'
import { userService } from './services/userService'

import AuthPage from './pages/AuthPage'
import LandingPage from './pages/LandingPage'
import StockPage from './pages/StockPage'

function App() {
  const { getAllStocks } = useStockStore()
  const [user, setUser] = useState(userService.getUser())

  useEffect(() => {
    getAllStocks()
  }, [])

  return (
    <div className="App">
      <ProvideController>
        {user ? (
          <>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:id" element={<StockPage />} />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </ProvideController>
    </div>
  )
}

export default App

import { useEffect } from 'react'
import { useStockStore } from './stores/useStockStore'
import { ProvideController } from './controllers/Controller'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import StockPage from './pages/StockPage'

function App() {
  const { getAllStocks } = useStockStore()

  useEffect(() => {
    getAllStocks()
  }, [])

  return (
    <div className="App">
      <ProvideController>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id" element={<StockPage />} />
        </Routes>
      </ProvideController>
    </div>
  )
}

export default App

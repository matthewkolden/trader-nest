import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useStockStore } from '../stores/useStockStore'
import { finnhubService } from '../services/finnhubService'

const ControllerContext = createContext({})

type Props = {
  children: ReactNode
}

type Prices = {
  [key: string]: number
}

export function ProvideController({ children }: Props) {
  const provider = useHook()
  return (
    <ControllerContext.Provider value={provider}>
      {children}
    </ControllerContext.Provider>
  )
}

export const useController = () => {
  return useContext(ControllerContext)
}

function useHook() {
  const { stocks } = useStockStore()
  const [prices, setPrices] = useState<Prices>({})
  const [prevPrices, setPrevPrices] = useState<Prices>({})
  const [totalValue, setTotalValue] = useState<number | null>(null)
  const [totalPrevValue, setTotalPrevValue] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  function getTotalValue() {
    if (Object.keys(prices).length > 0) {
      let sum = 0
      for (const stock in prices) {
        sum += prices[stock]
      }
      setTotalValue(sum)
    }

    if (Object.keys(prevPrices).length > 0) {
      let sum = 0
      for (const stock in prevPrices) {
        sum += prevPrices[stock]
      }
      setTotalPrevValue(sum)
    }
  }

  async function fetchPrice() {
    setLoading(true)
    const newPrices: Prices = {}
    // Yesterday's closing price
    const newPrevPrices: Prices = {}
    for (const stock of stocks) {
      const { current, close } = await finnhubService.getQuote(stock.ticker)
      newPrices[stock.ticker] = current
      newPrevPrices[stock.ticker] = close
    }
    setPrices(newPrices)
    setPrevPrices(newPrevPrices)
    setLoading(false)
  }

  useEffect(() => {
    fetchPrice()
  }, [stocks])

  useEffect(() => {
    getTotalValue()
  }, [prices])

  return { prices, prevPrices, fetchPrice, totalValue, totalPrevValue, loading }
}

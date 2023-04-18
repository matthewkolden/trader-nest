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

type HistoricalPrices = {
  [key: number]: {
    [key: string]: number
  }
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

  const [weekData, setWeekData] = useState<HistoricalPrices>({})
  const [monthData, setMonthData] = useState<HistoricalPrices>({})
  const [yearData, setYearData] = useState<HistoricalPrices>({})

  // const [weekTotals, setWeekTotals] = useState<Prices>({})
  // const [monthData, setMonthData] = useState<HistoricalPrices>({})
  // const [yearData, setYearData] = useState<HistoricalPrices>({})

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

  async function fetchWeekData() {
    setLoading(true)
    const newWeekData: HistoricalPrices = {}

    for (const stock of stocks) {
      const { prices, dates } = await finnhubService.getCandleWeek(stock.ticker)
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        const price = prices[i]
        if (!newWeekData[date]) {
          newWeekData[date] = {}
        }
        newWeekData[date][stock.ticker] = price
        if (!newWeekData[date]['total']) {
          newWeekData[date]['total'] = price * stock.quantity
        } else {
          newWeekData[date]['total'] += price * stock.quantity
        }
      }
    }

    setWeekData(newWeekData)
    setLoading(false)
  }

  async function fetchMonthData() {
    setLoading(true)
    const newMonthData: HistoricalPrices = {}

    for (const stock of stocks) {
      const { prices, dates } = await finnhubService.getCandleMonth(
        stock.ticker
      )
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        const price = prices[i]
        if (!newMonthData[date]) {
          newMonthData[date] = {}
        }
        newMonthData[date][stock.ticker] = price
        if (!newMonthData[date]['total']) {
          newMonthData[date]['total'] = price * stock.quantity
        } else {
          newMonthData[date]['total'] += price * stock.quantity
        }
      }
    }

    setMonthData(newMonthData)
    setLoading(false)
  }

  async function fetchYearData() {
    setLoading(true)
    const newYearData: HistoricalPrices = {}

    for (const stock of stocks) {
      const { prices, dates } = await finnhubService.getCandleYear(stock.ticker)
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i]
        const price = prices[i]
        if (!newYearData[date]) {
          newYearData[date] = {}
        }
        newYearData[date][stock.ticker] = price
        if (!newYearData[date]['total']) {
          newYearData[date]['total'] = price * stock.quantity
        } else {
          newYearData[date]['total'] += price * stock.quantity
        }
      }
    }

    setYearData(newYearData)
    setLoading(false)
  }

  function getTotalValue() {
    if (Object.keys(prices).length > 0) {
      let sum = 0
      for (const stock of stocks) {
        sum += prices[stock.ticker] * stock.quantity
      }
      setTotalValue(sum)
    }

    if (Object.keys(prevPrices).length > 0) {
      let sum = 0
      for (const stock of stocks) {
        sum += prevPrices[stock.ticker] * stock.quantity
      }
      setTotalPrevValue(sum)
    }
  }

  useEffect(() => {
    fetchWeekData()
    fetchMonthData()
    fetchYearData()
    fetchPrice()
  }, [stocks])

  useEffect(() => {
    getTotalValue()
  }, [prices])

  return {
    prices,
    prevPrices,
    fetchPrice,
    weekData,
    monthData,
    yearData,
    totalValue,
    totalPrevValue,
    loading,
  }
}

import React, { createContext, useContext, useState, ReactNode } from 'react'
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

  async function fetchPrice() {
    const newPrices: Prices = {}

    for (const stock of stocks) {
      const price = await finnhubService.getQuote(stock.ticker)
      newPrices[stock.ticker] = price
    }
    setPrices(newPrices)
  }

  return { prices, fetchPrice }
}

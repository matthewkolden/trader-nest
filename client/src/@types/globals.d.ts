interface Stock {
  _id?: string
  ticker: string
  quantity?: number
  user?: string
}

interface Credentials {
  email: string
  password: string
}

interface User {
  _id?: string
  email: string
  password: string
  stocks: Stock[]
}

interface Price {
  // Stock name
  ticker: string
  // Current price
  c: Number
}

type Prices = {
  [key: string]: number
}

type HistoricalPrices = {
  [key: number]: {
    [key: string]: number
  }
}

interface ControllerState {
  prices: Prices
  prevPrices: Prices
  fetchPrice: () => Promise<void>
  weekData: HistoricalPrices
  monthData: HistoricalPrices
  yearData: HistoricalPrices
  totalValue: number | null
  totalPrevValue: number | null
  loading: boolean
  reset: () => void
}

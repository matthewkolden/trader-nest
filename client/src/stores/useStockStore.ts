import { create } from 'zustand'
import { stockService } from '../services/stockService'
import { finnhubService } from '../services/finnhubService'

interface StockStore {
  stocks: Stock[]
  getAllStocks: () => Promise<void>
  createNewStock: (stock: Stock) => Promise<void>
  updateStock: (stock: Stock) => Promise<void>
  deleteStock: (id: number) => Promise<void>
}

export const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],

  getAllStocks: async () => {
    try {
      const data = await stockService.getAll()
      // @ts-ignore
      set((state) => ({
        stocks: data,
      }))
    } catch (error) {
      console.error(error)
    }
  },

  createNewStock: async (stock) => {
    try {
      const { getAllStocks } = get()

      await stockService.create(stock)
      await getAllStocks()
    } catch (error) {
      console.error(error)
    }
  },

  updateStock: async (stock) => {
    const { getAllStocks } = get()
    try {
      await stockService.update(stock)
      await getAllStocks()
    } catch (error) {
      console.error(error)
    }
  },

  deleteStock: async (id) => {
    const { getAllStocks } = get()
    try {
      await stockService.delete(String(id))
      await getAllStocks()
    } catch (error) {
      console.error(error)
    }
  },
}))

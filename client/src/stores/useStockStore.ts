import { create } from 'zustand'
import { stockService } from '../services/stockService'

interface StockStore {
  stocks: Stock[]
  stock: Stock
  getAllStocks: (user?: string) => Promise<void>
  createNewStock: (stock: Stock) => Promise<void>
  getOneStock: (id?: string) => Promise<void>
  updateStock: (stock: Stock) => Promise<void>
  deleteStock: (stock: Stock) => Promise<void>
}

const defaultStock: Stock = {
  user: '0',
  ticker: '',
  quantity: 0,
  _id: '0',
}

export const useStockStore = create<StockStore>((set, get) => ({
  stocks: [],
  stock: defaultStock,

  getAllStocks: async (user) => {
    try {
      const data = await stockService.getAll(user)
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
      await stockService.create(stock)
      await get().getAllStocks(stock.user)
    } catch (error) {
      console.error(error)
    }
  },

  getOneStock: async (id) => {
    try {
      const data = await stockService.getOne(String(id))
      set((state) => ({
        stock: {
          ticker: data.ticker,
          quantity: data.quantity,
          _id: data._id,
        },
      }))
    } catch (error) {
      console.error(error)
    }
  },

  updateStock: async (stock) => {
    try {
      await stockService.update(stock)
      await get().getAllStocks(stock.user)
    } catch (error) {
      console.error(error)
    }
  },

  deleteStock: async (stock) => {
    try {
      await stockService.delete(stock._id)
      await get().getAllStocks(stock.user)
    } catch (error) {
      console.error(error)
    }
  },
}))

import axios, { AxiosInstance } from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

// One day ago from 9 pm UTC today
const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
oneDayAgo.setUTCHours(21, 0, 0, 0)
const unixTimestampOneDayAgo = Math.floor(oneDayAgo.getTime() / 1000)

// One week ago from 9 pm UTC today
const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
oneWeekAgo.setUTCHours(21, 0, 0, 0)
const unixTimestampOneWeekAgo = Math.floor(oneWeekAgo.getTime() / 1000) //

// One month ago from 9 pm UTC today
const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
oneMonthAgo.setUTCHours(21, 0, 0, 0)
const unixTimestampOneMonthAgo = Math.floor(oneMonthAgo.getTime() / 1000)

// One year ago from 9 pm UTC today
const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
oneYearAgo.setUTCHours(21, 0, 0, 0)
const unixTimestampOneYearAgo = Math.floor(oneYearAgo.getTime() / 1000)

class FinnhubService {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://finnhub.io/api/v1',
    })
  }

  async getQuote(ticker: string) {
    const response = await this.instance.get(
      `/quote?symbol=${ticker}&token=${API_KEY}`
    )
    const current = response.data.c
    const close = response.data.pc
    // Current price
    return { current, close }
  }

  async getCandleWeek(ticker: string) {
    // Every day for a week
    const response = await this.instance.get(
      `stock/candle?symbol=${ticker}&resolution=D&from=${unixTimestampOneWeekAgo}&to=${unixTimestampOneDayAgo}&token=${API_KEY}`
    )
    // List of close prices for returned candles
    return response.data.c
  }

  async getCandleMonth(ticker: string) {
    // Every 5 days for a month
    const response = await this.instance.get(
      `stock/candle?symbol=${ticker}&resolution=5&from=${unixTimestampOneMonthAgo}&to=${unixTimestampOneDayAgo}&token=${API_KEY}`
    )
    // List of close prices for returned candles.
    return response.data.c
  }

  async getCandleYear(ticker: string) {
    // Every month for a year
    const response = await this.instance.get(
      `stock/candle?symbol=${ticker}&resolution=M&from=${unixTimestampOneYearAgo}&to=${unixTimestampOneDayAgo}&token=${API_KEY}`
    )
    // List of close prices for returned candles.
    return response.data.c
  }
}

export const finnhubService = new FinnhubService()

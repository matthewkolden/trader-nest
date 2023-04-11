import axios, { AxiosInstance, AxiosResponse } from 'axios'

class StockService {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api',
    })
    this.instance.interceptors.response.use(this.responseInterceptor)
  }

  private responseInterceptor({ data }: AxiosResponse<any, any>) {
    return data
  }

  async getAll() {
    return await this.instance.get('/stocks/')
  }
  async getOne(id: string) {
    return await this.instance.get(`/stocks/${id}`)
  }
  async create(stock: Stock): Promise<Stock> {
    return await this.instance.post('/stocks/', { ...stock })
  }
  async update(stock: Stock) {
    return await this.instance.put(`/stocks/${stock.id}`, { ...stock })
  }
  async delete(id: string) {
    return await this.instance.delete(`/stocks/${id}`)
  }
}

export const stockService = new StockService()

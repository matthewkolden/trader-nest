import axios, { AxiosInstance, AxiosResponse } from 'axios'

class StockService {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api/stocks',
    })
    this.instance.interceptors.response.use(this.responseInterceptor)
  }

  private responseInterceptor({ data }: AxiosResponse<any, any>) {
    return data
  }

  async getAll(user?: string): Promise<User> {
    return await this.instance.get('/', { params: { user: user } })
  }
  async getOne(id: string) {
    return await this.instance.get(`/${id}`)
  }
  async create(stock: Stock): Promise<Stock> {
    return await this.instance.post('/', { ...stock })
  }
  async update(stock: Stock) {
    return await this.instance.put(`/${stock._id}`, { ...stock })
  }
  async delete(id?: string) {
    return await this.instance.delete(`/${id}`)
  }
}

export const stockService = new StockService()

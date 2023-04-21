import axios, { AxiosInstance, AxiosResponse } from 'axios'

class UserService {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api/users',
    })
  }

  async signUp(credentials: Credentials) {
    const response = await this.instance.post('/signup', credentials)
    const token = response.data
    localStorage.setItem('token', token)
    return this.getUser()
  }

  async login(credentials: Credentials) {
    const response = await this.instance.post('/login', credentials)
    const token = response.data
    localStorage.setItem('token', token)
    return this.getUser()
  }

  getToken() {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      return null
    }
    return token
  }

  getUser() {
    const token = this.getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
  }

  logOut() {
    localStorage.removeItem('token')
  }
}

export const userService = new UserService()

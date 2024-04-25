import axios, { AxiosInstance } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;

class TwelveDataService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://api.twelvedata.com",
    });
  }

  async getQuote(ticker: string) {
    const responseClose = await this.instance.get(
      `/eod?symbol=${ticker}&apikey=${API_KEY}`
    );

    const responseCurrent = await this.instance.get(
      `/price?symbol=${ticker}&apikey=${API_KEY}`
    );
    const current = Number(responseCurrent.data.price).toFixed(2);
    const close = Number(responseClose.data.close).toFixed(2);
    // Current price
    return { current, close };
  }

  async getDailyHistoricalData(ticker: string) {
    const response = await this.instance.get(
      `/time_series?symbol=${ticker}&interval=1day&outputsize=365&apikey=${API_KEY}`
    );
    const data = response.data.values;
    const dates: string[] = data.map(
      (item: any) => item.datetime.split(" ")[0]
    );
    const prices: number[] = data.map((item: any) =>
      Number(item.close).toFixed(2)
    );
    return { prices, dates };
  }
}

export const twelveDataService = new TwelveDataService();

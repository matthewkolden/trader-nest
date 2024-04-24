import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useStockStore } from "../stores/useStockStore";
import { twelveDataService } from "../services/twelveDataService";

const ControllerContext = createContext({});

type Props = {
  children: ReactNode;
};

export function ProvideController({ children }: Props) {
  const provider = useHook();
  return (
    <ControllerContext.Provider value={provider}>
      {children}
    </ControllerContext.Provider>
  );
}

export const useController = () => {
  return useContext(ControllerContext);
};

function useHook(): ControllerState {
  const { stocks } = useStockStore();
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState(false);
  const [prevPrices, setPrevPrices] = useState<Prices>({});
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [totalPrevValue, setTotalPrevValue] = useState<number | null>(null);

  const [weekData, setWeekData] = useState<HistoricalPrices>({});
  const [monthData, setMonthData] = useState<HistoricalPrices>({});
  const [yearData, setYearData] = useState<HistoricalPrices>({});

  async function fetchPrice() {
    setLoading(true);
    const newPrices: Prices = {};
    // Yesterday's closing price
    const newPrevPrices: Prices = {};
    for (const stock of stocks) {
      const { current, close } = await twelveDataService.getQuote(stock.ticker);
      newPrices[stock.ticker] = parseFloat(current);
      newPrevPrices[stock.ticker] = parseFloat(close);
    }
    setPrices(newPrices);
    setPrevPrices(newPrevPrices);
    setLoading(false);
  }

  async function fetchData() {
    setLoading(true);
    const newWeekData: HistoricalPrices = {};
    const newMonthData: HistoricalPrices = {};
    const newYearData: HistoricalPrices = {};

    for (const stock of stocks) {
      const { prices, dates } = await twelveDataService.getDailyHistoricalData(
        stock.ticker
      );
      const last7Days = dates.slice(-7);
      const last30Days = dates.slice(-30);
      const last365Days = dates;

      for (let i = 0; i < last7Days.length; i++) {
        const date = last7Days[i];
        const price = prices[i];
        if (!newWeekData[date]) {
          newWeekData[date] = {};
        }
        newWeekData[date][stock.ticker] = price;
        newWeekData[date]["total"] =
          (newWeekData[date]["total"] || 0) +
          (stock.quantity ? price * stock.quantity : 0);
      }

      for (let i = 0; i < last30Days.length; i++) {
        const date = last30Days[i];
        const price = prices[i];
        if (!newMonthData[date]) {
          newMonthData[date] = {};
        }
        newMonthData[date][stock.ticker] = price;
        newMonthData[date]["total"] =
          (newMonthData[date]["total"] || 0) +
          (stock.quantity ? price * stock.quantity : 0);
      }

      for (let i = 0; i < last365Days.length; i++) {
        const date = last365Days[i];
        const price = prices[i];
        if (!newYearData[date]) {
          newYearData[date] = {};
        }
        newYearData[date][stock.ticker] = price;
        newYearData[date]["total"] =
          (newYearData[date]["total"] || 0) +
          (stock.quantity ? price * stock.quantity : 0);
      }
    }

    setWeekData(newWeekData);
    setMonthData(newMonthData);
    setYearData(newYearData);
    setLoading(false);
  }

  function getTotalValue() {
    if (Object.keys(prices).length > 0) {
      let sum = 0;
      for (const stock of stocks) {
        sum += stock.quantity ? prices[stock.ticker] * stock.quantity : 0;
      }
      setTotalValue(sum);
    }

    if (Object.keys(prevPrices).length > 0) {
      let sum = 0;
      for (const stock of stocks) {
        sum += stock.quantity ? prevPrices[stock.ticker] * stock.quantity : 0;
      }
      setTotalPrevValue(sum);
    }
  }

  function reset() {
    setPrices({});
    setLoading(false);
    setPrevPrices({});
    setTotalValue(null);
    setTotalPrevValue(null);
    setWeekData({});
    setMonthData({});
    setYearData({});
  }

  useEffect(() => {
    fetchPrice();
    fetchData();
  }, [stocks]);

  useEffect(() => {
    getTotalValue();
  }, [prices]);

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
    reset, 
  };
}

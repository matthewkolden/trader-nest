interface Stock {
  _id?: string
  ticker: string
  quantity: number
}

interface Quote {
  // Current price
  c: Number
  // Change
  d: Number
  // Percent change
  dp: Number
  // High price of the day
  h: Number
  // Low price of the day
  l: Number
  // Open price of the day
  o: Number
  // Previous close price
  pc: Number
}

interface Candle {
  // List of close prices for returned candles
  c: Array
  // List of high prices for returned candles.
  h: Array
  // List of low prices for returned candles.
  l: Array
  // List of open prices for returned candles.
  o: Array
  // Status of the response. This field can either be ok or no_data.
  s: string
  // List of timestamp for returned candles.
  t: Array
  // List of volume data for returned candles.
  v: Array
}

interface Price {
  // Stock name
  ticker: string
  // Current price
  c: Number
}

import { useController } from '../controllers/Controller'

import { Typography, Link, Paper, CircularProgress } from '@mui/material'

import Title from './Title'

interface StockPerformanceProps {
  stock: Stock
}

export default function StockValue(props: StockPerformanceProps) {
  const { loading } = useController()
  const { stock } = props

  if (!loading && stock) {
    return <Loaded stock={stock} />
  } else {
    return <Loading />
  }
}

function Loaded(props: StockPerformanceProps) {
  const { prices, prevPrices } = useController()
  const { stock } = props
  const value = stock.quantity * prices[stock.ticker]
  const prevValue = stock.quantity * prevPrices[stock.ticker]
  const now = Date.now() // get the current timestamp
  const date = new Date(now) // create a Date object from the timestamp

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const percentageChange = (((value - prevValue) / value) * 100).toFixed(2)

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Title>{stock.ticker} Value</Title>
      <Typography component="p" variant="h4">
        ${prices[stock.ticker]}
      </Typography>
      <Typography component="p" variant="h4">
        ${value.toFixed(2)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {formattedDate} ({percentageChange}%)
      </Typography>
      <Typography color="text.secondary">{stock.quantity} shares</Typography>
    </Paper>
  )
}

function Loading() {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 240,
      }}
    >
      <CircularProgress />
    </Paper>
  )
}

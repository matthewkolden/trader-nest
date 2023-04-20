import { useController } from '../controllers/Controller'
import { useStockStore } from '../stores/useStockStore'

import {
  Paper,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

import Title from './Title'
import Mover from './Mover'

export default function Movers() {
  const { loading } = useController()

  if (!loading) {
    return <Loaded />
  } else {
    return <Loading />
  }
}

function Loaded() {
  const { stocks } = useStockStore()
  const { prices, prevPrices } = useController()

  const sortedStocks = [...stocks].sort((a, b) => {
    const aChange = Math.abs(
      (prices[a.ticker] - prevPrices[a.ticker]) / prevPrices[a.ticker]
    )
    const bChange = Math.abs(
      (prices[b.ticker] - prevPrices[b.ticker]) / prevPrices[b.ticker]
    )
    return bChange - aChange
  })

  const topStocks = sortedStocks.slice(0, 3)

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title>Top Movers</Title>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topStocks.map((stock, index) => (
              <Mover
                name={stock.ticker}
                price={prices[stock.ticker]}
                prevPrice={prevPrices[stock.ticker]}
                key={index}
                id={stock._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      }}
    >
      <CircularProgress />
    </Paper>
  )
}

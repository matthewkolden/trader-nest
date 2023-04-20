import { useStockStore } from '../stores/useStockStore'
import { useController } from '../controllers/Controller'

import Row from './Row'
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'

import Title from './Title'

interface StockPerformanceProps {
  stock: Stock
}

export default function StockTableForm(props: StockPerformanceProps) {
  const { prices } = useController()
  const { stock } = props

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Your {stock.ticker}</Title>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {stock.ticker}
              </TableCell>
              <TableCell align="right">{stock.quantity}</TableCell>
              <TableCell align="right">{prices[stock.ticker]}</TableCell>
              <TableCell align="right">
                {stock.quantity * prices[stock.ticker]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

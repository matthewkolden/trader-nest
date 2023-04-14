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

export default function StockTable() {
  const { stocks, getAllStocks } = useStockStore()
  const { prices } = useController()

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Your Portfolio</Title>

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
            {stocks.map((stock, index) => (
              <Row
                name={stock.ticker}
                qty={stock.quantity}
                price={prices[stock.ticker]}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

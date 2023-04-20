import { TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'

interface RowProps {
  name: string
  qty: number
  price: number
  id?: number
}

export default function Row(props: RowProps) {
  const { name, qty, price, id } = props
  const value = (qty * price).toFixed(2)

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Link to={`/${id}`}>{name}</Link>
      </TableCell>
      <TableCell align="right">{qty}</TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
}

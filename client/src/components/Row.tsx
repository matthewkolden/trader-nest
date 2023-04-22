import { TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  name: string
  qty?: number
  price: number
  id?: String
}

export default function Row(props: Props) {
  const { name, qty, price, id } = props
  const value = qty ? (qty * price).toFixed(2) : 0

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
          {name}
        </Link>
      </TableCell>
      <TableCell align="right">{qty}</TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
}

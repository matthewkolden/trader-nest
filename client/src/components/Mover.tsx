import { TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  name: string
  price: number
  prevPrice: number
  id?: string
}

export default function Mover(props: Props) {
  const { name, price, prevPrice, id } = props
  const change = (((price - prevPrice) / price) * 100).toFixed(2)

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
      <TableCell align="right">({change}%)</TableCell>
      <TableCell align="right">{price}</TableCell>
    </TableRow>
  )
}

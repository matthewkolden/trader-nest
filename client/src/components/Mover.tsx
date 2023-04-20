import { TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'

interface MoverProps {
  name: string
  price: number
  prevPrice: number
  id?: number
}

export default function Mover(props: MoverProps) {
  const { name, price, prevPrice, id } = props
  const change = (((price - prevPrice) / price) * 100).toFixed(2)

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Link to={`/${id}`}>{name}</Link>
      </TableCell>
      <TableCell align="right">({change}%)</TableCell>
      <TableCell align="right">{price}</TableCell>
    </TableRow>
  )
}

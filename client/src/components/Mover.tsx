import { TableRow, TableCell } from '@mui/material'

interface MoverProps {
  name: string
  price: number
  prevPrice: number
}

export default function Mover(props: MoverProps) {
  const { name, price, prevPrice } = props
  const change = (((price - prevPrice) / price) * 100).toFixed(2)

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">({change}%)</TableCell>
      <TableCell align="right">{price}</TableCell>
    </TableRow>
  )
}

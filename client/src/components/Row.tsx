import { TableRow, TableCell } from '@mui/material'

interface RowProps {
  name: string
  qty: number
  price: number
}

export default function Row(props: RowProps) {
  const { name, qty, price } = props
  const value = (qty * price).toFixed(2)

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{qty}</TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
}

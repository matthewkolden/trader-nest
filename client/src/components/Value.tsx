import { useController } from '../controllers/Controller'
import { useStockStore } from '../stores/useStockStore'

import { Typography, Paper, CircularProgress } from '@mui/material'

import Title from './Title'

interface Props {
  totalValue: number | null
  totalPrevValue: number | null
}

export default function Value() {
  const { loading, totalValue, totalPrevValue } =
    useController() as ControllerState
  const { stocks } = useStockStore()

  if (!loading) {
    return <Loaded totalValue={totalValue} totalPrevValue={totalPrevValue} />
  } else {
    return <Loading />
  }
}

function Loaded(props: Props) {
  const { totalValue, totalPrevValue } = props

  const now = Date.now() // get the current timestamp
  const date = new Date(now) // create a Date object from the timestamp

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const value = totalValue ? totalValue.toFixed(2) : 0

  const percentageChange =
    totalValue && totalPrevValue
      ? (((totalValue - totalPrevValue) / totalPrevValue) * 100).toFixed(2)
      : 0

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Title>Value</Title>
      <Typography component="p" variant="h4">
        ${value}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {formattedDate} ({percentageChange}%)
      </Typography>
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
      <Title>Value</Title>
      <CircularProgress />
    </Paper>
  )
}

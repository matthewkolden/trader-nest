import { useController } from '../controllers/Controller'

import { Typography, Link, Paper, CircularProgress } from '@mui/material'

import Title from './Title'

export default function Value() {
  const { loading, totalValue } = useController()

  if (!loading && totalValue) {
    return <Loaded />
  } else {
    return <Loading />
  }
}

function Loaded() {
  const { totalValue, totalPrevValue } = useController()

  const now = Date.now() // get the current timestamp
  const date = new Date(now) // create a Date object from the timestamp

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const percentageChange = (
    ((totalValue - totalPrevValue) / totalPrevValue) *
    100
  ).toFixed(2)

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
        ${totalValue.toFixed(2)}
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

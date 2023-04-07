import { ButtonGroup, Button, Paper } from '@mui/material'

import Title from './Title'

export default function Performance() {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Title>Performance</Title>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ alignSelf: 'center' }}
      >
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
        <Button>Year</Button>
      </ButtonGroup>
    </Paper>
  )
}

import { ButtonGroup, Button, Paper } from '@mui/material'
import { VictoryLine, VictoryChart } from 'victory'

import Title from './Title'

export default function Performance() {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title>Performance</Title>
      <VictoryChart>
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
        />
      </VictoryChart>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ alignSelf: 'center' }}
      >
        <Button>Week</Button>
        <Button>Month</Button>
        <Button>Year</Button>
      </ButtonGroup>
    </Paper>
  )
}

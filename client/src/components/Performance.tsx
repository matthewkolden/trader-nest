import React, { useState } from 'react'

import { ButtonGroup, Button, Paper, CircularProgress } from '@mui/material'
import {
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory'

import Title from './Title'
import { useController } from '../controllers/Controller'

export default function Performance() {
  const { loading, weekData } = useController()

  if (!loading && weekData) {
    return <Loaded />
  } else {
    return <Loading />
  }
}

function Loaded() {
  const { weekData, monthData, yearData } = useController()

  const [lineData, setLineData] = useState(weekData)

  const data = Object.entries(lineData).map(([date, values]) => {
    return { x: new Date(date * 1000), y: values.total }
  })

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title>Performance</Title>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ alignSelf: 'center' }}
      >
        <Button
          onClick={() => {
            setLineData(weekData)
          }}
        >
          Week
        </Button>
        <Button
          onClick={() => {
            setLineData(monthData)
          }}
        >
          Month
        </Button>
        <Button
          onClick={() => {
            setLineData(yearData)
          }}
        >
          Year
        </Button>
      </ButtonGroup>
      <VictoryChart containerComponent={<VictoryVoronoiContainer />}>
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          data={data}
          labels={({ datum }) => datum.x + '\n' + datum.y.toFixed(2)}
          style={{
            data: {
              stroke: '#02B875',
            },
          }}
        />
      </VictoryChart>
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
      <CircularProgress />
    </Paper>
  )
}

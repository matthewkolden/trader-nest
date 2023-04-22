import React, { useState } from 'react'

import { ButtonGroup, Button, Paper, CircularProgress } from '@mui/material'
import {
  VictoryLine,
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryTheme,
  VictoryAxis,
} from 'victory'

import Title from './Title'
import { useController } from '../controllers/Controller'

interface StockPerformanceProps {
  stock: Stock
}

interface Props {
  stock: Stock
  weekData: HistoricalPrices
  monthData: HistoricalPrices
  yearData: HistoricalPrices
}

export default function StockPerformance(props: StockPerformanceProps) {
  const { loading, weekData, monthData, yearData } =
    useController() as ControllerState
  const { stock } = props
  if (!loading && stock && weekData && monthData && yearData) {
    return (
      <Loaded
        stock={stock}
        weekData={weekData}
        monthData={monthData}
        yearData={yearData}
      />
    )
  } else {
    return <Loading />
  }
}

function Loaded(props: Props) {
  const { ticker } = props.stock
  const { weekData, monthData, yearData } = props

  const [lineData, setLineData] = useState(weekData)

  const data = Object.entries(lineData).map(([date, values]) => {
    return { x: new Date(Number(date) * 1000), y: values[ticker] }
  })

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title>{ticker} Performance</Title>
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
      <VictoryChart
        containerComponent={<VictoryVoronoiContainer />}
        theme={VictoryTheme.material}
      >
        <VictoryAxis tickFormat={(tick) => ''} label="Time" />
        <VictoryAxis dependentAxis />
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

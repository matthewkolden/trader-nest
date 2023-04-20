import { useStockStore } from '../stores/useStockStore'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import StockPerformance from '../components/StockPerformance'
import StockValue from '../components/StockValue'
import StockTableForm from '../components/StockTableForm'
import Movers from '../components/Movers'

import { Container, Box, Grid } from '@mui/material'

export default function StockPage() {
  const params = useParams()
  const id = params.id
  const { getOneStock, stock } = useStockStore()

  useEffect(() => {
    getOneStock(id)
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <StockPerformance stock={stock} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <StockValue stock={stock} />
              <Movers />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <StockTableForm stock={stock} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

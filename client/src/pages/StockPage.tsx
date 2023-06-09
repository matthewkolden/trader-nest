import { useStockStore } from '../stores/useStockStore'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import StockPerformance from '../components/StockPerformance'
import StockValue from '../components/StockValue'
import StockTotalValue from '../components/StockTotalValue'
import Movers from '../components/Movers'

interface Props {
  user: User
}

import { Container, Box, Grid } from '@mui/material'

export default function StockPage(props: Props) {
  const params = useParams()
  const id = params.id
  const { getOneStock, stock } = useStockStore()

  useEffect(() => {
    getOneStock(id)
  }, [id])

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            {stock && <StockPerformance stock={stock} />}
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: 3,
                justifyContent: 'space-between',
              }}
            >
              {stock && (
                <>
                  <StockValue stock={stock} />
                  <StockTotalValue stock={stock} />
                </>
              )}
              <Movers />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

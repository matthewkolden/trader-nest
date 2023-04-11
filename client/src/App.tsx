import { useEffect } from 'react'
import { useStockStore } from './stores/useStockStore'

import Performance from './components/Performance'
import Value from './components/Value'
import StockTable from './components/StockTable'

import { Container, Typography, Box, Grid, Paper } from '@mui/material'

function App() {
  const { stocks, getAllStocks } = useStockStore()

  useEffect(() => {
    getAllStocks()
  }, [])

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 8,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Keep track of everything in one place
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Performance />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Value />
            </Grid>
            <Grid item xs={12}>
              <StockTable />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default App

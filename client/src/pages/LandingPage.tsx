import Performance from '../components/Performance'
import Value from '../components/Value'
import StockTable from '../components/StockTable'
import Movers from '../components/Movers'
import StockForm from '../components/StockForm'

interface Props {
  user: User
}

import { Container, Box, Grid } from '@mui/material'

export default function LandingPage(props: Props) {
  const { user } = props
  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Performance />
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
              <Value />
              <StockForm user={user} />
              <Movers />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <StockTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

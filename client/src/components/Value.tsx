import { Typography, Link, Paper } from '@mui/material'

import Title from './Title'

export default function Value() {
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
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 5 April, 2022 (+1.2%)
      </Typography>
      <div>
        <Link color="primary" href="#">
          <Typography component="p" color="primary">
            Update Portfolio
          </Typography>
        </Link>
      </div>
    </Paper>
  )
}

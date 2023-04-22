import { useState } from 'react'
import { useStockStore } from '../stores/useStockStore'
import { TextField, Box, Button, Paper } from '@mui/material'
import Title from './Title'

interface Props {
  user: User
}

export default function StockForm(props: Props) {
  const { user } = props
  const { createNewStock } = useStockStore()
  const [formData, setFormData] = useState({
    ticker: '',
    quantity: 0,
  })

  const [error, setError] = useState('')

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    try {
      await createNewStock({
        ticker: formData.ticker,
        quantity: formData.quantity,
        user: user._id,
      })
      setFormData({
        ticker: '',
        quantity: 0,
      })
    } catch {
      setError('Creation Failed - Try Again')
    }
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title>Add a Stock</Title>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="ticker"
          label="Stock Ticker"
          name="ticker"
          value={formData.ticker}
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="quantity"
          value={formData.quantity}
          label="Quantity"
          id="quantity"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Stock
        </Button>
        <p>{error}</p>
      </Box>
    </Paper>
  )
}

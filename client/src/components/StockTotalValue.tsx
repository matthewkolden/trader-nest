import { useController } from '../controllers/Controller'
import { useState } from 'react'
import { useStockStore } from '../stores/useStockStore'
import { useNavigate } from 'react-router-dom'

import {
  Typography,
  TextField,
  Box,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material'

import Title from './Title'

interface Props {
  stock: Stock
}

export default function StockTotalValue(props: Props) {
  const { loading } = useController() as ControllerState
  const { stock } = props

  if (!loading && stock) {
    return <Loaded stock={stock} />
  } else {
    return <Loading />
  }
}

function Loaded(props: Props) {
  const { prices } = useController() as ControllerState
  const { stock } = props
  const navigate = useNavigate()
  const value = stock.quantity ? stock.quantity * prices[stock.ticker] : 0
  const { updateStock, deleteStock } = useStockStore()
  const [formData, setFormData] = useState({
    quantity: 0,
  })

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const [error, setError] = useState('')

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    try {
      await updateStock({
        ticker: stock.ticker,
        quantity: formData.quantity,
        _id: stock._id,
        user: stock.user,
      })
      setFormData({
        quantity: formData.quantity,
      })
    } catch {
      setError('Edit Failed - Try Again')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteStock(stock)
      navigate('/')
    } catch {
      setError('Delete Failed - Try Again')
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
      <Title>Your {stock.ticker}</Title>
      <Typography component="p" variant="h4">
        ${value.toFixed(2)}
      </Typography>
      <Typography color="text.secondary">{stock.quantity} shares</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="quantity"
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          autoFocus
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Update Quantity
        </Button>
      </Box>
      <Button
        onClick={() => {
          handleDelete()
        }}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Delete
      </Button>
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

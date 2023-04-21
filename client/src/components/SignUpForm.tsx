import { useState } from 'react'
import {
  Typography,
  Box,
  Grid,
  Paper,
  Link,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from '@mui/material'

import { userService } from '../services/userService'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export default function SignUpForm(props) {
  const { setUser, setShowLogin } = props

  const [credentials, setCredentials] = useState<{
    email: string
    password: string
    confirm?: string
  }>({
    email: '',
    password: '',
    confirm: '',
  })

  const [error, setError] = useState('')

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    setError('')
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    try {
      const user = await userService.signUp({
        email: credentials.email,
        password: credentials.password,
      })
      setUser(user)
    } catch {
      setError('Sign Up Failed - Try Again')
    }
  }

  const disable = credentials.password !== credentials.confirm

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(auth.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={credentials.email}
              onChange={handleChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={credentials.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm"
              value={credentials.confirm}
              onChange={handleChange}
              label="Confirm"
              type="password"
              id="confirm"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              disabled={disable}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Button
            onClick={() => {
              setShowLogin(true)
            }}
          >
            {'Already have an account? Sign In'}
          </Button>
          <p>{error}</p>
        </Box>
      </Grid>
    </Grid>
  )
}

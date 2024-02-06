import {
  Button,
  // FormControl,
  InputAdornment,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
} from '@mui/material'
import './login.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { Form, Formik } from 'formik'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const handleChange = () => {}
  return (
    <div className="formWrapper">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {' '}
            <h1>Login</h1>
            <TextField
              label="Email"
              varient="outlined"
              name="email"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Password"
              varient="outlined"
              fullWidth
              name="password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={handleTogglePasswordVisibility}
                      // edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </InputAdornment>
                ),
              }}
            />
            {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Intitution
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <a href="forget-password">
        <p>Forget Password</p>
      </a>
    </div>
  )
}

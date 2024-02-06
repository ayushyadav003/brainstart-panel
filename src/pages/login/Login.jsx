import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./login.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = () => {};
  return (
    <div className="loginContainer">
      <div className="inner"></div>
      <div className="inner2">
        <form>
          <h1>Login</h1>
          <TextField
            label="Email"
            varient="outlined"
            name="email"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            varient="outlined"
            name="password"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Intitution</InputLabel>
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
          </FormControl>
        </form>
      </div>
    </div>
  );
}

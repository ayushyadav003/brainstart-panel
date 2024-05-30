import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./login.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiConfig } from "../../services/ApiConfig";
import { ApiWithOutToken } from "../../services/ApiWithoutToken";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentOption, setCurrentOption] = useState("Teacher");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiOptions = {
      url: apiConfig.login,
      method: "POST",
      data: {
        ...user,
        role: currentOption,
      },
    };
    const response = await ApiWithOutToken(apiOptions);
    if (response?.data?.statusCode === 200) {
      const obj = response.data?.data;
      console.log(response.data?.data);
      delete obj.password;
      delete obj._V;
      const jsonString = JSON.stringify(obj);
      localStorage.setItem("dashboard-currentUser", jsonString);
      toast.success(response.data.Message);
      navigate("/analytics");
    } else {
      toast.error(response?.data.message);
    }

    setLoading(false);
  };

  const handleRole = (role) => {
    localStorage.setItem("userRole", role);
    setCurrentOption(role);
  };

  useEffect(() => {
    setCurrentOption(localStorage.getItem("userRole") || "Teacher");
  }, []);

  return (
    <div className="loginForm">
      <h2>Welcome to Brainstar!</h2>
      {/* <div className="switchRole">
        <span
          style={{
            background: currentOption === 'Teacher' ? '#7433ff' : '#fff',
            color: currentOption !== 'Teacher' ? '#000' : '#fff',
          }}
          onClick={() => handleRole('Teacher')}
        >
          Teacher
        </span>
        <span
          style={{
            background: currentOption === 'Student' ? '#7433ff' : '#fff',
            color: currentOption !== 'Student' ? '#000' : '#fff',
          }}
          onClick={() => handleRole('Student')}
        >
          Student
        </span>
      </div> */}
      <form onSubmit={handleSubmitForm}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          required
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          name="password"
          required
          margin="normal"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                  // edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </span>
              </InputAdornment>
            ),
          }}
        />
        <div className="remember">
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMe}
                sx={{ fontSize: "1px" }}
              />
            }
            label={<span style={{ fontSize: "14px" }}>Remember me</span>}
          />
          <span
            style={{ cursor: "pointer", color: "blue" }}
            // onClick={() => setLoginStatus("forget")}
          >
            Forgot Password?
          </span>
        </div>
        <Button
          variant="contained"
          style={{ marginTop: "1rem" }}
          className="loginBtn"
          type="submit"
          disabled={loading}
        >
          Sign in
          {loading && (
            <CircularProgress size={30} style={{ marginLeft: "1rem" }} />
          )}
        </Button>
      </form>
    </div>
  );
}

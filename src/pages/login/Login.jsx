import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/auth/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      console.log("Login response", response.data);
      navigate("/home");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred";
      setErr(errorMessage);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'rgb(158 158 158 / 17%)', backdropFilter: 'blur(5px)' }}>
      <Typography variant="h2" sx={{ color: 'rebeccapurple', mb: 4 }}>Immigrate AI</Typography>

      <Paper className="glass-card" sx={{ display: 'flex', width: '50%', marginTop: 10, backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)', borderRadius: 2, overflow: 'hidden', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
        <Box className="left" sx={{ flex: 1, background: 'linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url("https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600") center', backgroundSize: 'cover', padding: 4, color: 'white' }}>
          <Typography variant="h1" sx={{ fontSize: '2.5rem', lineHeight: '2.5rem' }}>Hello World.</Typography>
          <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum, alias totam numquam ipsa exercitationem dignissimos, error nam, consequatur.</Typography>
          <Typography variant="body2">Don't you have an account?</Typography>
          <Link to="/register">
            <Button variant="contained" sx={{ backgroundColor: 'white', color: 'rebeccapurple', fontWeight: 'bold', mt: 2 }}>Register</Button>
          </Link>
        </Box>
        <Box className="right" sx={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ color: '#555', mb: 3 }}>Login</Typography>
          <form>
            <TextField fullWidth label="Username" name="username" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} sx={{ mb: 3 }} />
            {err && <Typography color="error">{err}</Typography>}
            <Button variant="contained" onClick={handleLogin} sx={{ backgroundColor: '#15106f', color: 'white', fontWeight: 'bold' }}>Login</Button>
          </form>
        </Box>
      </Paper>
      <Typography variant="body2" sx={{ color: 'rebeccapurple', mt: 7, p: 2, textAlign: 'center',  }}>
        When a user logs in, the server verifies their credentials.
        If valid, the server creates a JWT with the user's information in the payload and signs it.
        The JWT is sent back to the client (e.g., in the response body or as a cookie).
        The client stores the token as a secure cookie in the browser. 
        For subsequent requests to protected resources, the client includes the JWT in the Authorization header.
        If the token is valid, the server processes the request.
        If the token is invalid or expired, the server rejects the request with a 401 Unauthorized status and is Redireected to Login Page. 
      </Typography>
    </Box>
  );
};

export default Login;

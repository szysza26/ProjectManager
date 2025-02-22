import { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { TextField, Button, Container, Paper, Typography } from "@mui/material";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .catch(() => setError("Invalid credentials"));
    };

    return (
      <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper elevation={3} style={{ padding: 20, borderRadius: 10, width: '100%' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 16 }}
            >
              Submit
            </Button>
          </form>
          {error && 
            <Typography
              color="error"
              style={{ marginTop: 16 }}
            >
              {error}
            </Typography>}
        </Paper>
      </Container>
    );
  };

  export default LoginPage;

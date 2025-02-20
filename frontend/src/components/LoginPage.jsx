import { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider';

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
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    );
  };

  export default LoginPage;

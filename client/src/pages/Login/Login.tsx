import { useState } from 'react';
import "./Login.css"
import { Link } from 'react-router-dom';
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Submitted credentials:', credentials);
    // Add authentication logic here
  };

  return (
    <div className="hero-section">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control"
            type="text"
            id="username"
            name="username"
            placeholder="johnsmith1"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password1"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn button-submit">Login</button>
      </form>
      <h5>Don't already have an account? Click <Link to="/signup">here</Link> to sign up.</h5>
    </div>
  );
};

export default Login;

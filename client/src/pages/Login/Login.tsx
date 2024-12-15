import { useState } from 'react';
import "./Login.css"
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [LoginUser] = useMutation(LOGIN_USER);
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
      try {
      const response = await LoginUser({
        variables: { ...credentials },
      });

      const token = response.data.loginUser.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", response.data.loginUser.user.username);
      localStorage.setItem("id", response.data.loginUser.user.id);
      alert(`${response.data.loginUser.user.username}, you are sucessfully logged in!!`);

      setCredentials({
        username: '',
        password: '',
      });

      navigate('/my-journal');
    } catch (err) {
      console.error('Error Logging user in:', err);
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="hero-section">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control login-form-control"
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
          <input className="form-control login-form-control"
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

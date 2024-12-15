import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { REGISTER_USER } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [registerUser] = useMutation(REGISTER_USER);
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        variables: { ...formData },
      });

      const token = response.data.registerUser.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", response.data.registerUser.user.username);
      localStorage.setItem("id", response.data.registerUser.user.id);

      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

      alert(`${response.data.registerUser.user.username}, you have created your new account and have  sucessfully logged in!!`);

      navigate('/my-journal');
    } catch (err) {
      console.error('Error registering user:', err);
      alert('Failed to create account. Please try again.');
    }
  };


  return (
    <div className="hero-section">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input className="signup-form-control form-control"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input className="signup-form-control form-control"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Smith"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Username</label>
          <input className="signup-form-control form-control"
            type="username"
            id="username"
            name="username"
            placeholder="johnsmith1"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="signup-form-control form-control"
            type="email"
            id="email"
            name="email"
            placeholder="johnsmith1@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="signup-form-control form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password1"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <h5>By signing up, you are agreeing to our terms of service. If you have any questions, please reach out to us at <a href="mailto:zenvibe@gmail.com">zenvibe@gmail.com</a></h5>
      <p className="lead">Already have an account? Sign in <Link to="/login">here</Link></p>
    </div>
  );
};

export default Signup;

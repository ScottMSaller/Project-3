import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
  };

  return (
    <div className="hero-section">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input className="form-control"
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
          <input className="form-control"
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
          <input className="form-control"
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
          <input className="form-control"
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
          <input className="form-control"
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

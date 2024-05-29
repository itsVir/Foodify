import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from "axios";
// Importing toastify module
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    const isValid = validateForm();
  
    if (isValid) {
      // Perform registration logic here
      axios
        .post("http://127.0.0.1:8000/api/user/login/", {
          email: formData.email,
          password: formData.password
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Login Successful!");
          console.log(response.data.access_token);
          localStorage.setItem("access_token", response.data.access_token);
          // Reload the page after successful login
          // window.location.reload();

          navigate("/"); // Navigate to the next page
          window.location.reload(); // Reload the page
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          toast.error("Email or Password Incorrect!");
        });
    } else {
      console.log("Form has errors");
      toast.error("Fill valid details!");
    }
  };
  
  return (
    <>
      <div className='login_bg'>
        <div className='login'>
          <h1>LOGIN</h1>

          <div className='login_input'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className='error'>{errors.email}</span>}

            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span className='error'>{errors.password}</span>}
          </div>

          <button onClick={handleLogin}>Login</button>
          <p>
            if you do not have an account <Link to='/register'>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
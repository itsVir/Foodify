import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    const isValid = validateForm();

    if (isValid) {
      axios
        .post("http://127.0.0.1:8000/api/user/register/", {
          name: formData.firstName + " " + formData.lastName,
          phone_number: formData.mobile,
          email: formData.email,
          password: formData.password,
          password2: formData.confirmPassword,
          role: "user"
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Registration Successfully!");
          navigate("/login"); // Redirect to login page after successful registration
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          toast.error("Email Already Exists!");
        });
    } else {
      console.log("Form has errors");
      toast.error("Fill valid details!");
    }
  };

  return (
    <>
      <div className="register_bg">
        <div className="register">
          <h1>REGISTER</h1>
          <div className="register_inputs">
            <div className="register_input">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}

              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            <div className="register_input">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>

            <div className="register_input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <button onClick={handleRegister}>Register</button>
          <p>
            if you have already account so <Link to="/login">Login</Link> ?
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios  from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
          email,
          password,
        });

        // Clear previous errors
        setServerError("");
        
        // Proceed with success
        if (response.status===200) {
          localStorage.setItem("access_token", response.data.tokens.access);
          localStorage.setItem("refresh_token", response.data.tokens.refresh);
          window.location.href = "/";
        } else {
          setServerError(response.data.message);
        }
        console.log(response.status);
      //  
      } catch (error) {
        // Handle server-side errors
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setServerError(message);
        } else {
          setServerError("Invalid email or password");
        }
      }
    }
  };

  return (
    <div className="center">
      <Form onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!emailError || !!serverError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError || serverError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!passwordError || !!serverError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError || serverError}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;

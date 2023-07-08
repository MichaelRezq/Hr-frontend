import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverErrors, setServerErrors] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate username
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
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

 

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/signup/",
          {
            email: email,
            username: username,
            password: password,
          }
        );
        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.tokens.access);
          localStorage.setItem("refresh_token", response.data.tokens.refresh);
          window.location.href = "/";
        } else {
          setServerErrors(response.data.message);
        }
        console.log(response);
        if (response.status===201) {
          try {
          const res = 
              await axios
                .post("http://127.0.0.1:8000/auth/login/", {
                  email: email,
                  password: password,
                })
                .then(function (res) {
                  console.log(res);
                  // Clear form inputs
                  setEmail("");
                  setUsername("");
                  setPassword("");
                  setServerErrors([]);
                  if (res.status === 200) {
                    localStorage.setItem("access_token", res.data.tokens.access);
                    localStorage.setItem(
                      "refresh_token",
                      res.data.tokens.refresh
                    );
                    window.location.href = "/";
                  } else {
                    setServerErrors(res.data.message);
                  }
                });
          } catch (error) {
            
          }
        }
      } catch (error) {
        // Handle server-side errors
        if (error.response && error.response.data) {
          console.log(error.response.data.errors[0]);
          setServerErrors(error.response.data.errors[0]);
          console.log(serverErrors)
        } else {
          setServerErrors("Invalid email or password");
        }
      }
    }
  };
  if (localStorage.getItem("access_token")) {
    return (window.location.href = "/");
  }
  return (
    <div className="center">
      <Form onSubmit={submitRegistration}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!emailError || serverErrors}
          />
          <Form.Control.Feedback type="invalid">
            {emailError || serverErrors}
          </Form.Control.Feedback>
          {serverErrors}
        
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!usernameError || serverErrors}
          />
          <Form.Control.Feedback type="invalid">
            {usernameError || serverErrors}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!passwordError || serverErrors}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError || serverErrors}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;

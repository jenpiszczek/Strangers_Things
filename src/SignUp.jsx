import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const COHORT_NAME = "2302-acc-pt-web-pt-b";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Handle successful registration here, such as storing the token
        setToken(result.data.token);
        sessionStorage.setItem("token", result.data.token);
        navigate("/home");
      } else {
        // Handle registration error, e.g., display an error message to the user
        console.error("Registration failed");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    // Log the token when it changes
    console.log("Token:", token);
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission (e.g., send data to the server).
    console.log("Form data submitted:", formData);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Sign Up</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

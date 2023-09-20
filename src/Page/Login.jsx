// Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      // alert("Please enter both email and password.");
      return;
    }

    const loginSuccessful = await login(email, password);

    if (loginSuccessful) {
      navigate("/gallery");
    } else {
      setError("Invalid email or password.");
      // alert("Invalid email or password.");
    }
  };

  return (
    <div className="aa__card-cont login-cont">
      <h2> Hello! Login</h2>
      {error && <p className="error">{error}</p>}
      <div className="aa__card">
        <form action="" className="aa__signup-form">
          <div className="aa__input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="aa__input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

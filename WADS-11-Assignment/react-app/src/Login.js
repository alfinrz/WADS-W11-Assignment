import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";  //ogInWithEmailAndPassword
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCookies } from 'react-cookie';
import "../styles/Login.css";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  async function JWTLogIn(email, password) {
    const reqBody = {
      method: 'POST',
      url: 'https://localhost:8000/api/token',
      // params: { 'api-version': '3.0' },
      headers: {
          'content-type': 'application/json',
      },
      data: [
          {
              "email": email,
              "hashed_password": password
          }
      ],
  };
    // const url = 'http://localhost:8000/create_session/' + name;
    axios.request(reqBody).then(res => {
      const result = JSON.stringify(JSON.parse(res.data[0]["body"]).raw_headers[0][1]);
      // const cookie = result.substr(8,81);
      // const age = parseInt(result.substr(109,7));
      // setCookie('cookie', cookie, { path: '/' , maxAge: age});
    });
     // then( response => console.log(response) )
     // const test = response.json();
    //  console.log(response);
    };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, error, navigate]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => JWTLogIn(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
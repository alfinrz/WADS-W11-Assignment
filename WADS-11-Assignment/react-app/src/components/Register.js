import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  // registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "../styles/Register.css";
import axios from "axios";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth); // there's an error variable
  const navigate = useNavigate();
  // const register = () => {
  //   if (!name) alert("Please enter name");
  //   registerWithEmailAndPassword(name, email, password);
  // };

  async function JWTSignUp(email, password) {
    const reqBody = {
      method: 'POST',
      url: 'https://localhost:8000/api/users',
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
      // const result = JSON.stringify(JSON.parse(res.data[0]["body"]).raw_headers[0][1]);
      console.log(res);
      // const cookie = result.substr(8,81);
      // const age = parseInt(result.substr(109,7));
      // setCookie('cookie', cookie, { path: '/' , maxAge: age});
    });
     // then( response => console.log(response) )
     // const test = response.json();
    //  console.log(response);
    };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard",{ replace: true });
  }, [user, loading, navigate]);
      return (
    <div className="register">
      <div className="register__container">
        {/* <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        /> */}
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={(email, password) => JWTSignUp(email, password)}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;
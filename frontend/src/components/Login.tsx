import React, { useState } from 'react';
import 'babel-polyfill';
import { encode } from "base-64";

interface LoginObj {
  token: string
}

async function loginUser(creds: {
  password: string;
}) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: "Basic " + encode(":" + creds.password)
    },
  };

  // TODO: Replace this url with the real backend url for production
  console.log("Basic " + encode(creds.password));
  const res = await fetch('https://acm-one-click-event-publishing.herokuapp.com/authenticate', requestOptions);
  if (res.status >= 400) {
    console.log("Error signing in!");
    alert("Invalid password");
    return "";
  }
  const resData: LoginObj = await res.json();
  return resData.token;

}

interface LoginProps {
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function Login({
  setToken,
}: LoginProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await loginUser({
      password,
    });
    //console.log(token);
    setToken(token);
    localStorage.setItem('auth-token', token)
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
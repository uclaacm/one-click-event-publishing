import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'babel-polyfill';

async function loginUser(creds: {
  username: string;
  password: string;
}): Promise<{ access: string; refresh: string }> {
  const formdata = new FormData();
  formdata.append('username', creds.username);
  formdata.append('password', creds.password);

  const requestOptions: RequestInit = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  // TODO: Replace this url with the real backend url for production
  return fetch('http://127.0.0.1:8000/api/token', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);
      return result;
    })
    .catch((_error) => {
      //console.log(_error);
      return { access: 'error', refresh: 'error' };
    });
}

export default function Login({
  setToken,
}: {
  setToken: React.Dispatch<
    React.SetStateAction<{ access: string; refresh: string }>
  >;
}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    //console.log(token);
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username:</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password:</p>
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

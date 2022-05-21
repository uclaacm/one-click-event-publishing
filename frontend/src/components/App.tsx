import React, { useEffect, useState } from 'react';
import Login from './Login';
import AppWrapper from './shared/AppWrapper';

import '../assets/WestwoodSans-Regular.ttf';

function NameForm(props: { token: string }): JSX.Element {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send information to backend here!
    /*
    console.log('Title is ' + title);
    console.log('Starting at ' + startDate + ', ' + startTime);
    console.log('Ending at ' + endDate + ', ' + endTime);
    console.log('Description is ' + description);
    console.log(props.token);
    */
    alert('Title is ' + title);
    alert('Starting at ' + startDate + ', ' + startTime);
    alert('Ending at ' + endDate + ', ' + endTime);
    alert('Description is ' + description);
    alert(props.token);
  };

  return (
    <div className="event-wrapper">
      <h1>Enter Event Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Title:</p>
          <input
            type="text"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <p>Start Date:</p>
          <input
            type="date"
            name="sDate"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          <p>Start Time:</p>
          <input
            type="time"
            name="sTime"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          <p>End Date:</p>
          <input
            type="date"
            name="eDate"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          <p>End Time:</p>
          <input
            type="time"
            name="eTime"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          <p>Event Description:</p>
          <textarea
            name="Description"
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function App(): JSX.Element {
  const [token, setToken] = useState('');
  useEffect(() => {
    async function attemptLocalLogin() {
      const localToken = localStorage.getItem('auth-token');
      if (!localToken) return;
      if (!(await authorizeToken(localToken))) {
        setToken('');
        return;
      } else setToken(localToken);
    }
    attemptLocalLogin().catch(() => alert('broken'));
  }, []);

  // /authorize-token

  async function authorizeToken(atoken: string) {
    //console.log(token);
    if (!atoken) return false;
    const res = await fetch(
      'https://acm-one-click-event-publishing.herokuapp.com/authorize-token',
      {
        method: 'POST',
        headers: {
          'auth-token': atoken,
        },
      }
    );
    if (res.status >= 400) {
      //console.log('Not authorized!');
      alert('Not authorized!');
      localStorage.removeItem('auth-token');
      return false;
    }
    if (res.status == 200) {
      //console.log('token okay!');
      return true;
    }
    return false;
  }

  // Event description page
  return (
    <div>
      <AppWrapper>
        {token ? <NameForm token={token} /> : <Login setToken={setToken} />}
      </AppWrapper>
    </div>
  );
}

export default App;

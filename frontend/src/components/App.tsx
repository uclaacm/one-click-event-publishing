import React, { useEffect, useState } from 'react';
import Login from './Login';
import AppWrapper from './shared/AppWrapper';
import { HeaderSections } from './shared/globalTypes';

import '../assets/WestwoodSans-Regular.ttf';


function NameForm(props: {
  token: string;
}): JSX.Element {
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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Start Date:
        <input
          type="date"
          name="sDate"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        Start Time:
        <input
          type="time"
          name="sTime"
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="eDate"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label>
        End Time:
        <input
          type="time"
          name="eTime"
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Event Description:
        <input
          type="text"
          name="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

function App(): JSX.Element {
  const [token, setToken] = useState("");
  useEffect(() => {
    async function attemptLocalLogin() {
      const localToken = localStorage.getItem('auth-token');
      if (!localToken)
        return
      if (!(await authorizeToken(localToken))) {
        setToken("");
        return;
      }
      else
        setToken(localToken);
    }
    attemptLocalLogin();
  }, [])

  // /authorize-token

  async function authorizeToken(token: string) {
    console.log(token);
    if (!token)
      return false;
    const res = await fetch('https://acm-one-click-event-publishing.herokuapp.com/authorize-token', {
      method: "POST",
      headers: {
        'auth-token': token
      }
    })
    if (res.status >= 400) {
      console.log('Not authorized!');
      alert('Not authorized!');
      localStorage.removeItem('auth-token')
      return false;
    }
    if (res.status == 200) {
      console.log('token okay!')
      return true;
    }
    return false;
  }

  // Event description page
  return (
    <div>
      <AppWrapper section={HeaderSections.DEFAULT_SECTION}>
        {
          token ? <NameForm token={token} /> : <Login setToken={setToken} />
        }
      </AppWrapper>
    </div>
  );
}

export default App;

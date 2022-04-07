import React, { useState } from 'react';
import Login from './Login';
import AppWrapper from './shared/AppWrapper';
import { HeaderSections } from './shared/globalTypes';

import '../assets/WestwoodSans-Regular.ttf';

function NameForm(props: {
  token: { access: string; refresh: string };
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
  const [token, setToken] = useState<{ access: string; refresh: string }>({
    access: '',
    refresh: '',
  });

  // Quick and dirty check to see if the user has a valid token
  // More secure check should be done at the backend endpoints
  if (
    token == null ||
    !('access' in token) ||
    !('refresh' in token) ||
    token.access == '' ||
    token.refresh == '' ||
    token.access == 'error' ||
    token.refresh == 'error'
  ) {
    // Login page
    return <Login setToken={setToken} />;
  }

  // Event description page
  return (
    <div>
      <AppWrapper section={HeaderSections.DEFAULT_SECTION}>
        <NameForm token={token} />
      </AppWrapper>
    </div>
  );
}

export default App;

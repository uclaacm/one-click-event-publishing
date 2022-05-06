import React, { useState } from 'react';
import Login from './Login';
import AppWrapper from './shared/AppWrapper';
import '../styles/App.scss';

import '../assets/WestwoodSans-Regular.ttf';
import { HeaderSections } from './shared/globalTypes';

function NameForm(props: {
  token: { access: string; refresh: string };
}): JSX.Element {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
//  const [dataUri, setDataURI] = useState('');

const [location,setLocation]= useState('');
const [image,setImage]=useState('');

  // function onFileSelected(event: React.ChangeEvent<HTMLInputElement>): void {
  //   const selectedFile = event.target.files![0];
  //   const reader = new FileReader();

  //   const imgtag = document.getElementById('myFile') as HTMLImageElement;
  //   imgtag.title = selectedFile.name;
  //   reader.onload = function (e) {
  //     imgtag.src = e.target!.result! as string;
  //   };
  //   reader.readAsDataURL(selectedFile);
  //   setDataURI(imgtag.src);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send information to backend here!

    console.log('Title is ' + title);
    console.log('Starting at ' + startDate + ', ' + startTime);
    console.log('Ending at ' + endDate + ', ' + endTime);
    console.log('Description is ' + description);
    console.log('Location is' + location);
    console.log('Image is'+ image);
    console.log(props.token);
  };

  return (
    <div className="event-wrapper">
      <h1>Enter Event Details</h1>


      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>
              <label htmlFor="Title">
                <p>Title:</p>
              </label>
            </td>
            <td>
              <input
                type="text"
                name="Title"
                id="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="sDate">
                <p>Start Date:</p>
              </label>
            </td>
            <td>
              <input
                type="date"
                name="sDate"
                id="sDate"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="sTime">
                <p>Start Time:</p>
              </label>
            </td>
            <td>
              <input
                type="time"
                name="sTime"
                id="sTime"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="eDate">
                <p>End Date:</p>
              </label>
            </td>
            <td>
              <input
                type="date"
                name="eDate"
                id="eDate"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="eTime">
                <p>End Time:</p>
              </label>
            </td>
            <td>
              <input
                type="time"
                name="eTime"
                id="eTime"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Description">
                <p>Event Description:</p>
              </label>
            </td>
            <td>
              <textarea
                name="Description"
                id="Description"
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Location">
                <p>Location:</p>
              </label>
            </td>
            <td>
              <input
                type="text"
                name="Location"
                id="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Image">
                <p>Revelant Image:</p>
              </label>
            </td>
            <td>
              <input
                type="file"
                name="Image"
                id="Image"
                onChange={(e) => setImage(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <input type="submit" value="Submit" />
            </td>
          </tr>
        </table>
      </form>
    </div>
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
    // return (
    //   <div>
    //     <AppWrapper section={HeaderSections.DEFAULT_SECTION} >
    //       <Login setToken={setToken} />
    //     </AppWrapper>
    //   </div>
    // );
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

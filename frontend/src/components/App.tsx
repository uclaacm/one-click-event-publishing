import AppWrapper from './shared/AppWrapper';
import { HeaderSections } from './shared/globalTypes';
import React from "react";

import '../assets/WestwoodSans-Regular.ttf';
class NameForm extends React.Component<{}, { Title: string, sDate: string ,Description:string, sTime:string,eDate:string, eTime:string }>  {
  constructor(props: any) {
    super(props);
    this.state = { Title: '', sDate: '' , Description:'',sTime:'',eDate:'',eTime:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {

    const name = event.target.name;
  //very hacky way, idk how to use ES6 computed property name syntax to update the state key with typescript
    if (name == "sDate") {
      this.setState({ sDate: event.target.value });
    }else if(name=="Title"){
      this.setState({Title: event.target.value});
    }else if (name=="Description"){
      this.setState({Description: event.target.value});
    }else if (name=="sTime"){
      this.setState({sTime: event.target.value});
    }else if(name=="eDate"){
      this.setState({eDate: event.target.value});
    }else if(name=="eTime"){
      this.setState({eTime: event.target.value});
    }

  }

  handleSubmit(event: any) {
    alert('Title is ' + this.state.Title);
    alert('Starting At ' + this.state.sDate+ ' '+this.state.sTime);
    alert('Description is ' + this.state.Description);

    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="Title" onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Start Date:
          <input type="date" name="sDate" onChange={this.handleChange} ></input>
        </label>
        <label>
          Start Time:
          <input type="time" name="sTime" onChange={this.handleChange} ></input>
        </label>
        <label>
          End Date:
          <input type="date" name="eDate" onChange={this.handleChange} ></input>
        </label>
        <label>
          End Time:
          <input type="time" name="eTime" onChange={this.handleChange} ></input>
        </label>

        <br></br>
        <label>
          Event Description:
          <input type="text" name="Description" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
function App(): JSX.Element {
  return (
    <div>
      <AppWrapper section={HeaderSections.DEFAULT_SECTION}>
        <NameForm />
      </AppWrapper>
    </div>
  );
}

export default App;

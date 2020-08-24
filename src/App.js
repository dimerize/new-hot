import React from 'react';
import axios from 'axios';
import './App.css';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

import "handsontable/dist/handsontable.min.css";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.id = 'hot';
    this.hotSettings = {
      data: Handsontable.helper.createSpreadsheetData(14, 3),
    };
    this.hotTableComponent = React.createRef();

    this.state = {
      time: 8,
      name: "",
      chemistry: 3,
      schedule: [[]]
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/books/5f2af5a83f9391fbfaf79e89')
    .then(response => {
      console.log(response.data.schedule);
      this.setState({ schedule: response.data.schedule });
    })
    .catch(error => {
      console.log(error); 
    });
  }

  componentDidUpdate() {
    const res = axios.put('http://localhost:4000/api/books/5f2af5a83f9391fbfaf79e89', {
        schedule: this.state.schedule,
        title: 'prop title',
        author: 'prop author',
        genre: 'prop genre',
        read: false
      })
      .then(response => {
        console.log(response.data.schedule);
        this.setState({ schedule: response.data.schedule });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const handleChange = (event) => {
      this.setState({ time: event.target.value });
    };

    const handleName = (event) => {
      this.setState({ name: event.target.value });
    }

    const handleChemistry = (event) => {
      this.setState({ chemistry: event.target.value });
    }

    const handleSubmit = (event) => {
      let tableData = this.state.schedule;

      if (tableData[this.state.time - 7][1] !== "free" || tableData[this.state.time - 5][1] !== "free") {
        if (tableData[this.state.time - 7][2] !== "free" || tableData[this.state.time - 5][2] !== "free") {
          alert("This time slot is not available for scheduling.");

        } else {
          for (let i = 7; i >= 5; i--) {
            tableData[this.state.time - i][2] = this.state.name;
          }
  
          this.hotTableComponent.current.hotInstance.loadData(tableData);

          this.setState({ schedule: tableData });
        }
      } else {
        for (let i = 7; i >= 5; i--) {
          tableData[this.state.time - i][1] = this.state.name;
        }

        this.hotTableComponent.current.hotInstance.loadData(tableData);

        this.setState({ schedule: tableData });
      }
    }

    

    return (
      <div id="app-wrapper">
        <div id="hot-table-component">
        <HotTable 
          licenseKey="non-commercial-and-evaluation"
          id={this.id}
          settings={this.hotSettings}
          data={this.state.schedule} 
          ref={this.hotTableComponent}
          colHeaders={false} 
          rowHeaders={false}
          width="600"
        />
        </div>
        <div class="input-form">
        <FormControl>
        <form autoComplete="off">
          <TextField label="Name" value={this.state.name} onChange={handleName} />
        </form>
        </FormControl>
        <FormControl>
        <InputLabel>Time</InputLabel>
        <Select
          value={this.state.time}
          onChange={handleChange}
        >
          <MenuItem value={8}>8 AM to 11 AM</MenuItem>
          <MenuItem value={9}>9 AM to 12 PM</MenuItem>
          <MenuItem value={10}>10 AM to 1 PM</MenuItem>
          <MenuItem value={11}>11 AM to 2 PM</MenuItem>
          <MenuItem value={12}>12 PM to 3 PM</MenuItem>
          <MenuItem value={13}>1 PM to 4 PM</MenuItem>
          <MenuItem value={14}>2 PM to 5 PM</MenuItem>
          <MenuItem value={15}>3 PM to 6 PM</MenuItem>
          <MenuItem value={16}>4 PM to 7 PM</MenuItem>
          <MenuItem value={17}>5 PM to 8 PM</MenuItem>
          <MenuItem value={18}>6 PM to 9 PM</MenuItem>
        </Select>
        </FormControl>  
        <FormControl>
        <InputLabel>Chemistry</InputLabel>
        <Select
          label="3 Prime"
          value={this.state.chemistry}
          onChange={handleChemistry}
        >
          <MenuItem value={3}>3 Prime</MenuItem>
          <MenuItem value={5}>5 Prime</MenuItem>
        </Select>
        </FormControl>
        <FormControl>
          <Button variant="contained" onClick={handleSubmit}>Submit Experiment</Button>
        </FormControl>
        </div>
      </div>  
    );
  }
}

export default App;

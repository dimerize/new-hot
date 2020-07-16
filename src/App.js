import React from 'react';
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
      section: 1,
      name: ""
    };
  }

  render() {
    const handleChange = (event) => {
      this.setState({ time: event.target.value });
    };

    const handleSection = (event) => {
      this.setState({ section: event.target.value });
    }

    const handleName = (event) => {
      this.setState({ name: event.target.value });
    }

    const handleSubmit = (event) => {
      let tableData = getTableData();

      if (tableData[this.state.time - 7][this.state.section] !== "free" || tableData[this.state.time - 5][this.state.section] !== "free") {
        alert("This time slot is not available for scheduling.");
      } else {
        for (let i = 7; i >= 5; i--) {
          tableData[this.state.time - i][this.state.section] = this.state.name;
        }

        this.hotTableComponent.current.hotInstance.loadData(tableData);

        // export tableData to backend here
      }
    }

    let getTableData = function() {
      return ([
        ["", "Schedule One", "Schedule Two"],
        ["8 AM", "free", "free"],
        ["9 AM", "free", "free"],
        ["10 AM", "free", "free"],
        ["11 AM", "free", "free"],
        ["12 PM", "free", "free"],
        ["1 PM", "Scheduled", "free"],
        ["2 PM", "Scheduled", "free"],
        ["3 PM", "Scheduled", "free"],
        ["4 PM", "free", "free"],
        ["5 PM", "free", "free"],
        ["6 PM", "free", "free"],
        ["7 PM", "free", "free"],
        ["8 PM", "free", "free"]
      ]);
    };

    return (
      <div id="app-wrapper">
        <div id="hot-table-component">
        <HotTable 
          licenseKey="non-commercial-and-evaluation"
          id={this.id}
          settings={this.hotSettings}
          data={getTableData()} 
          ref={this.hotTableComponent}
          colHeaders={false} 
          rowHeaders={false}
          width="600"
        />
        </div>
        <div class="input-form">
        <FormControl>
        <InputLabel>Section</InputLabel>
        <Select
          value={this.state.section}
          onChange={handleSection}
        >
          <MenuItem value={1}>Section One</MenuItem>
          <MenuItem value={2}>Section Two</MenuItem>
        </Select>
        </FormControl>
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
          <Button variant="contained" onClick={handleSubmit}>Submit Experiment</Button>
        </FormControl>
        </div>
      </div>  
    );
  }
}

export default App;

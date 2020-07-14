import React from 'react';
import './App.css';
import { HotTable } from '@handsontable/react';

// import Handsontable from 'handsontable';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      ["", "Scheduling One", "Scheduling Two"],
      ["8 AM", "free", "free"],
      ["9 AM", "free", "free"],
      ["10 AM", "free", "free"],
      ["11 AM", "free", "free"],
      ["12 PM", "free", "free"],
      ["1 PM", "free", "free"],
      ["2 PM", "free", "free"],
      ["3 PM", "free", "free"],
      ["4 PM", "free", "free"],
      ["5 PM", "free", "free"],
      ["6 PM", "free", "free"],
      ["7 PM", "free", "free"],
      ["8 PM", "free", "free"]
    ];
    this.state = {
      time: 8
    }
  }

  render() {
    const handleChange = (event) => {
      this.setState({ time: event.target.value });
    };

    return (
      <div>
        <div>
        <HotTable 
          licenseKey="non-commercial-and-evaluation"
          id="hot"
          data={this.data} 
          colHeaders={false} 
          rowHeaders={false}
          width="600"
        />
        </div>
        <div>
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
        </div>
      </div>  
    );
  }
}

export default App;

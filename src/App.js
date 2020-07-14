import React from 'react';
import './App.css';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

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
  }

  render() {
    return (
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
    );
  }
}

export default App;

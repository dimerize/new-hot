import React from 'react';
import './App.css';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handsontableData = Handsontable.helper.createSpreadsheetData(13, 2); 
  }

  render() {
    return (
      <div>
        <HotTable 
          id="hot"
          data={this.handsontableData} 
          colHeaders={true} 
          rowHeaders={true}
          />
      </div>
    );
  }
}

export default App;

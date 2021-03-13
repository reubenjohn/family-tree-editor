import React, {Component} from 'react';
import '../App.css';
import FamilyTree from "./FamilyTree";
// Data data
import data from './../data/data.json';
import configurations from './../data/configurations.json';

class Viewer extends Component {
  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <div className="column-right">
            <FamilyTree data={data} configurations={configurations}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;

import React, {Component} from 'react';
import '../App.css';
import FamilyTree from "./FamilyTree";
// Data data
import data from './../data/data.json';

class Viewer extends Component {
  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <div className="column-right">
            <FamilyTree data={data.tree} configurations={data.configurations}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;

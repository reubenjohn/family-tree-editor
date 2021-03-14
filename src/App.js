import React, {Component} from 'react';
import Editor from "./components/Editor";
// Data
import data from './data/data.json';
import Viewer from "./components/Viewer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      data
    }
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <button title={'Edit'}
                  onClick={this.toggleEditMode}/>
          {this.state.editMode &&
          <Editor data={this.state.data}
                  onDataChange={newData => this.setState({data: newData})}/>}
          <div className="column-right">
            <Viewer configurations={this.state.data.configurations} tree={this.state.data.tree}/>
          </div>
        </div>
      </div>
    );
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode})
  }
}

export default App;

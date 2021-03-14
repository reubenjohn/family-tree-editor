import React, {Component} from 'react';
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <button title={'Edit'}
                  onClick={() => this.toggleEditMode()}/>
          {this.state.editMode ? <Editor/> : <Viewer/>}
        </div>
      </div>
    );
  }

  toggleEditMode() {
    if (this.state.editMode) {
      if (window.confirm(`Leaving edit mode without saving your changes first will result in you loosing your changes!
Are you sure you want to proceed?`))
        this.setState({...this.state, editMode: false})
    } else {
      this.setState({...this.state, editMode: true})
    }
  }
}

export default App;

import React, {Component} from 'react';
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
  }

  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <button title={'Edit'}
                  onClick={() => this.setState({...this.state, editMode: !this.state.editMode})}/>
          {this.state.editMode ? <Editor/> : <Viewer/>}
        </div>
      </div>
    );
  }
}

export default App;

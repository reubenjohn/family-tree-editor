import React, {Component} from 'react';
import {version} from '../../package.json';
import Switch from './Switch';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElement from './PureSvgNodeElement';
import '../App.css';
import {parseAncestryNotation, printAncestryNotation} from '../utils/TreeConverter';

const customNodeFnMapping = {
  svg: {
    description: 'Default - Pure SVG node & label (IE11 compatible)',
    fn: (rd3tProps, appState) => (
      <PureSvgNodeElement
        nodeDatum={rd3tProps.nodeDatum}
        toggleNode={rd3tProps.toggleNode}
        orientation={appState.orientation}
      />
    ),
  },
  mixed: {
    description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
    fn: ({nodeDatum, toggleNode}, appState) => (
      <MixedNodeElement
        nodeData={nodeDatum}
        triggerNodeToggle={toggleNode}
        foreignObjectProps={{
          width: appState.nodeSize.x,
          height: appState.nodeSize.y,
          x: -50,
          y: 50,
        }}
      />
    ),
  },
};

function getEditDataFileLink() {
  const matches = window.location.href.match(/https:\/\/(.*)\.github.io\/(.*)\//);
  if (!matches || matches.length < 3) {
    return 'https://github.com/reubenjohn/family-tree-editor/edit/master/src/data/data.json';
  }
  const owner = matches[1];
  const projectPath = matches[2];
  return `https://github.com/${owner}/${projectPath}/edit/master/src/data/data.json`;
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposedAncestry: printAncestryNotation(props.data.tree),
      ancestryParsingError: null,
    };

    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
    this.setPathFunc = this.setPathFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStringChange = this.handleStringChange.bind(this);
    this.handleFloatChange = this.handleFloatChange.bind(this);
    this.toggleCollapsible = this.toggleCollapsible.bind(this);
    this.toggleZoomable = this.toggleZoomable.bind(this);
    this.setScaleExtent = this.setScaleExtent.bind(this);
    this.setSeparation = this.setSeparation.bind(this);
    this.setNodeSize = this.setNodeSize.bind(this);
    this.toggleLegacyTransitions = this.toggleLegacyTransitions.bind(this);
  }

  handleConfigChange(state) {
    if (!this.props.onDataChange)
      return;
    if (typeof state === 'function') {
      state = state(this.props.data.configurations);
    }
    this.props.onDataChange({
      tree: this.props.data.tree,
      configurations: {...this.props.data.configurations, ...state}
    });
  }

  tryUpdateAncestry(notation) {
    this.setState({proposedAncestry: notation});
    try {
      this.setState({
        ancestryParsingError: null
      });
      this.props.onDataChange({
        tree: parseAncestryNotation(notation),
        configurations: this.props.data.configurations
      });
    } catch (e) {
      this.setState({ancestryParsingError: e.message});
    }
  }

  setTitle(title) {
    this.handleConfigChange({title});
  }

  setOrientation(orientation) {
    this.handleConfigChange({orientation});
  }

  setPathFunc(pathFunc) {
    this.handleConfigChange({pathFunc});
  }

  handleChange(evt) {
    const target = evt.target;
    const parsedIntValue = parseInt(target.value, 10);
    if (target.value === '') {
      this.handleConfigChange({
        [target.name]: undefined,
      });
    } else if (!isNaN(parsedIntValue)) {
      this.handleConfigChange({
        [target.name]: parsedIntValue,
      });
    }
  }

  handleStringChange(evt) {
    const {name, value} = evt.target;
    if (value === '') {
      this.handleConfigChange({
        [name]: undefined,
      });
    } else {
      this.handleConfigChange({
        [name]: value,
      });
    }
  }

  handleFloatChange(evt) {
    const target = evt.target;
    const parsedFloatValue = parseFloat(target.value);
    if (target.value === '') {
      this.handleConfigChange({
        [target.name]: undefined,
      });
    } else if (!isNaN(parsedFloatValue)) {
      this.handleConfigChange({
        [target.name]: parsedFloatValue,
      });
    }
  }

  toggleCollapsible() {
    this.handleConfigChange(prevState => ({collapsible: !prevState.collapsible}));
  }

  toggleCollapseNeighborNodes = () => {
    this.handleConfigChange(prevState => ({
      shouldCollapseNeighborNodes: !prevState.shouldCollapseNeighborNodes,
    }));
  };

  toggleZoomable() {
    this.handleConfigChange(prevState => ({zoomable: !prevState.zoomable}));
  }

  setScaleExtent(scaleExtent) {
    this.handleConfigChange({scaleExtent});
  }

  setSeparation(separation) {
    if (!isNaN(separation.siblings) && !isNaN(separation.nonSiblings)) {
      this.handleConfigChange({separation});
    }
  }

  setNodeSize(nodeSize) {
    if (!isNaN(nodeSize.x) && !isNaN(nodeSize.y)) {
      this.handleConfigChange({nodeSize});
    }
  }

  toggleLegacyTransitions() {
    this.handleConfigChange(prevState => ({
      enableLegacyTransitions: !prevState.enableLegacyTransitions,
    }));
  }

  render() {
    return (
      <div className="column-left">
        <div className="controls-container">
          <div className="prop-container">
            <h2 className="title">Family Tree Editor</h2>
            <h3 className="title">v{version}</h3>

            <div className="prop-container">
              <h3 className="prop">Save</h3>
              Save your changes to avoid loosing your data.<br/>
              <h5>Steps to save your changes</h5>
              <ol>
                <li>Copy all your changes using the 'Copy Tree & Configurations' button below</li>
                <li>Open your <a
                  href={getEditDataFileLink()}
                  target='_blank'
                  rel='noopener noreferrer'>data file</a> and
                  paste your changes there.<br/>
                  Finally, hit the 'Commit changes' button at the bottom.
                </li>
                <li>If all goes well, your changes should reflect in a few minutes once you refresh the page.</li>
              </ol>

              <button
                type="button"
                className="btn btn-block"
                onClick={() => navigator.clipboard.writeText(JSON.stringify(this.props.data, null, 2))}
              >
                {'Copy Tree & Configurations'}
              </button>
            </div>

            <h4 className="prop">Ancestry</h4>
            <div style={{marginBottom: '5px'}}>
                  <textarea style={{width: '100%', color: this.state.ancestryParsingError ? 'red' : 'black'}}
                            rows={12}
                            value={this.state.proposedAncestry}
                            onChange={(event) => this.tryUpdateAncestry(event.target.value)}/>
              {this.state.ancestryParsingError &&
              <pre style={{color: 'red'}}>{this.state.ancestryParsingError}</pre>}
            </div>
          </div>

          <div className="prop-container">
            <h3 className="prop">Configurations</h3>
            <h4 className="prop">Title</h4>
            <input
              type="text"
              value={this.props.data.configurations.title}
              onChange={(event) => this.setTitle(event.target.value)}
            />
          </div>

          <div className="prop-container">
            <h4 className="prop">Orientation</h4>
            <button
              type="button"
              className="btn btn-controls btn-block"
              onClick={() => this.setOrientation('horizontal')}
            >
              {'Horizontal'}
            </button>
            <button
              type="button"
              className="btn btn-controls btn-block"
              onClick={() => this.setOrientation('vertical')}
            >
              {'Vertical'}
            </button>
          </div>

          <div className="prop-container">
            <h4 className="prop">Path Function</h4>
            <button
              type="button"
              className="btn btn-controls btn-block"
              onClick={() => this.setPathFunc('diagonal')}
            >
              {'Diagonal'}
            </button>
            <button
              type="button"
              className="btn btn-controls btn-block"
              onClick={() => this.setPathFunc('elbow')}
            >
              {'Elbow'}
            </button>
            <button
              type="button"
              className="btn btn-controls btn-block"
              onClick={() => this.setPathFunc('straight')}
            >
              {'Straight'}
            </button>
            <button
              type="button"
              className="btn btn-controls btn-block"
              onClick={() => this.setPathFunc('step')}
            >
              {'Step'}
            </button>
          </div>

          <div className="prop-container">
            <label className="prop" htmlFor="customNodeElement">
              Custom Node Element
            </label>
            <select className="form-control" name="renderCustomNodeElement" onChange={this.handleStringChange}>
              {Object.entries(customNodeFnMapping).map(([key, {description}]) => (
                <option key={key} value={key}>
                  {description}
                </option>
              ))}
            </select>
          </div>

          <div className="prop-container">
            <h4 className="prop">Collapsible</h4>
            <Switch
              name="collapsibleBtn"
              checked={this.props.data.configurations.collapsible}
              onChange={this.toggleCollapsible}
            />
          </div>

          <div className="prop-container">
            <h4 className="prop">Collapse neighbor nodes</h4>
            <Switch
              name="collapseNeighborsBtn"
              checked={this.props.data.configurations.shouldCollapseNeighborNodes}
              onChange={this.toggleCollapseNeighborNodes}
            />
          </div>

          <div className="prop-container">
            <h4 className="prop">Enable Legacy Transitions</h4>
            <Switch
              name="enableLegacyTransitionsBtn"
              checked={this.props.data.configurations.enableLegacyTransitions}
              onChange={this.toggleLegacyTransitions}
            />
          </div>

          <div className="prop-container">
            <div>
              <label className="prop" htmlFor="translateX">
                Translate X
              </label>
              <input
                className="form-control"
                name="translateX"
                type="number"
                value={this.props.data.configurations.translateX}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label className="prop" htmlFor="translateY">
                Translate Y
              </label>
              <input
                className="form-control"
                name="translateY"
                type="number"
                value={this.props.data.configurations.translateY}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="prop-container">
            <label className="prop" htmlFor="initialDepth">
              Initial Depth
            </label>
            <input
              className="form-control"
              style={{color: 'grey'}}
              name="initialDepth"
              type="text"
              value={this.props.data.configurations.initialDepth}
              onChange={this.handleChange}
            />
          </div>

          <div className="prop-container">
            <label className="prop" htmlFor="depthFactor">
              Depth Factor
            </label>
            <input
              className="form-control"
              name="depthFactor"
              type="number"
              defaultValue={this.props.data.configurations.depthFactor}
              onChange={this.handleChange}
            />
          </div>

          {/* <div className="prop-container prop">{`Zoomable: ${this.state.zoomable}`}</div> */}

          <div className="prop-container">
            <label className="prop" htmlFor="zoom">
              Zoom
            </label>
            <input
              className="form-control"
              name="zoom"
              type="number"
              defaultValue={this.props.data.configurations.zoom}
              onChange={this.handleFloatChange}
            />
          </div>

          <div className="prop-container">
            <span className="prop prop-large">Scale Extent</span>
            <label className="sub-prop" htmlFor="scaleExtentMin">
              Min
            </label>
            <input
              className="form-control"
              name="scaleExtentMin"
              type="number"
              defaultValue={this.props.data.configurations.scaleExtent.min}
              onChange={evt =>
                this.setScaleExtent({
                  min: parseFloat(evt.target.value),
                  max: this.props.data.configurations.scaleExtent.max,
                })
              }
            />
            <label className="sub-prop" htmlFor="scaleExtentMax">
              Max
            </label>
            <input
              className="form-control"
              name="scaleExtentMax"
              type="number"
              defaultValue={this.props.data.configurations.scaleExtent.max}
              onChange={evt =>
                this.setScaleExtent({
                  min: this.props.data.configurations.scaleExtent.min,
                  max: parseFloat(evt.target.value),
                })
              }
            />
          </div>

          <div className="prop-container">
            <span className="prop prop-large">Node separation</span>
            <label className="sub-prop" htmlFor="separationSiblings">
              Siblings
            </label>
            <input
              className="form-control"
              name="separationSiblings"
              type="number"
              defaultValue={this.props.data.configurations.separation.siblings}
              onChange={evt =>
                this.setSeparation({
                  siblings: parseFloat(evt.target.value),
                  nonSiblings: this.props.data.configurations.separation.nonSiblings,
                })
              }
            />
            <label className="sub-prop" htmlFor="separationNonSiblings">
              Non-Siblings
            </label>
            <input
              className="form-control"
              name="separationNonSiblings"
              type="number"
              defaultValue={this.props.data.configurations.separation.nonSiblings}
              onChange={evt =>
                this.setSeparation({
                  siblings: this.props.data.configurations.separation.siblings,
                  nonSiblings: parseFloat(evt.target.value),
                })
              }
            />
          </div>

          <div className="prop-container">
            <span className="prop prop-large">Node size</span>
            <label className="sub-prop" htmlFor="nodeSizeX">
              X
            </label>
            <input
              className="form-control"
              name="nodeSizeX"
              type="number"
              defaultValue={this.props.data.configurations.nodeSize.x}
              onChange={evt =>
                this.setNodeSize({x: parseFloat(evt.target.value), y: this.props.data.configurations.nodeSize.y})
              }
            />
            <label className="sub-prop" htmlFor="nodeSizeY">
              Y
            </label>
            <input
              className="form-control"
              name="nodeSizeY"
              type="number"
              defaultValue={this.props.data.configurations.nodeSize.y}
              onChange={evt =>
                this.setNodeSize({x: this.props.data.configurations.nodeSize.x, y: parseFloat(evt.target.value)})
              }
            />
          </div>

          <div className="prop-container">
            <label className="prop" htmlFor="transitionDuration">
              Transition Duration
            </label>
            <input
              className="form-control"
              name="transitionDuration"
              type="number"
              value={this.props.data.configurations.transitionDuration}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;

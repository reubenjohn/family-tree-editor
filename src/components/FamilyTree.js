import React, {Component} from 'react';
import Tree from 'react-d3-tree';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElement from './PureSvgNodeElement';
import '../App.css';

const customNodeFnMapping = {
  svg: {
    description: 'Default - Pure SVG node & label (IE11 compatible)',
    fn: (rd3tProps, configs) => (
      <PureSvgNodeElement
        nodeDatum={rd3tProps.nodeDatum}
        toggleNode={rd3tProps.toggleNode}
        orientation={configs.orientation}
      />
    ),
  },
  mixed: {
    description: 'MixedNodeElement - SVG `circle` + `foreignObject` label',
    fn: ({nodeDatum, toggleNode}, configs) => (
      <MixedNodeElement
        nodeData={nodeDatum}
        triggerNodeToggle={toggleNode}
        foreignObjectProps={{
          width: configs.nodeSize.x,
          height: configs.nodeSize.y,
          x: -50,
          y: 50,
        }}
      />
    ),
  },
};

class FamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 128,
      translateY: 128,
    };
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translateX: dimensions.width / 2.5,
      translateY: dimensions.height / 2,
    });
  }

  render() {
    const {data, configurations} = this.props;
    return (
      <div className="App">
        <div className="demo-container">
          <div className="column-right">
            <div className="tree-stats-container">
              <h2>{configurations.title}</h2>
            </div>
            <div ref={tc => (this.treeContainer = tc)} className="tree-container">
              <Tree
                data={data}
                renderCustomNodeElement={
                  configurations.renderCustomNodeElement
                    ? rd3tProps => customNodeFnMapping[configurations.renderCustomNodeElement].fn(rd3tProps, configurations)
                    : undefined
                }
                rootNodeClassName="demo-node"
                branchNodeClassName="demo-node"
                orientation={configurations.orientation}
                translate={{x: this.state.translateX, y: this.state.translateY}}
                pathFunc={configurations.pathFunc}
                collapsible={configurations.collapsible}
                initialDepth={configurations.initialDepth}
                zoomable={configurations.zoomable}
                zoom={configurations.zoom}
                scaleExtent={configurations.scaleExtent}
                nodeSize={configurations.nodeSize}
                separation={configurations.separation}
                enableLegacyTransitions={configurations.enableLegacyTransitions}
                transitionDuration={configurations.transitionDuration}
                depthFactor={configurations.depthFactor}
                styles={configurations.styles}
                shouldCollapseNeighborNodes={configurations.shouldCollapseNeighborNodes}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FamilyTree;

import React, {Component} from 'react';
import Tree from 'react-d3-tree';
import MixedNodeElement from './MixedNodeElement';
import PureSvgNodeElement from './PureSvgNodeElement';
import '../App.css';

const countNodes = (count = 0, n) => {
  // Count the current node
  count += 1;

  // Base case: reached a leaf node.
  if (!n.children) {
    return count;
  }

  // Keep traversing children while updating `count` until we reach the base case.
  return n.children.reduce((sum, child) => countNodes(sum, child), count);
};

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

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: props.configurations.translateX,
      translateY: props.configurations.translateY,
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
    const {tree, configurations} = this.props;
    return (
      <div className="column-right">
        <div className="tree-stats-container">
          <h2>{configurations.title}</h2>
          {countNodes(0, Array.isArray(tree) ? tree[0] : tree)} family members.<br/>
          <span style={{color: 'gray'}}>Click a member to expand descendants. Click and drag to navigate.</span>
        </div>
        <div ref={tc => (this.treeContainer = tc)} className="tree-container">
          <Tree
            data={tree}
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
    );
  }
}

export default Viewer;

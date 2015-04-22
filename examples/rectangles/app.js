import React, {Component} from 'react';
import ReactKonva from 'react-konva';

let {Stage, Layer, Rect, Star, Circle} = ReactKonva;

class TestingComponent extends Component {

  displayName = 'TestingComponent';

  constructor(props) {
    super(props);

    this.state = {
      colors: ['red', 'yellow', 'green'],
      circles: [1, 2, 3, 4]
    };
  }

  changeColors = () => {
    let colors = this.state.colors;
    colors = colors.slice(1).concat([colors[0]]);
    this.setState({colors});
  };

  addCircle = () => {
    this.setState({
      circles: this.state.circles.slice(0, -1) //concat(this.state.circles.slice(-1)[0] + 1)
    });
  };

  render() {
    const rectangles = this.state.colors.map((color, i) => (
      <Rect key={i}
            x={i * 20 + 5}
            y={i * 20 + 5}
            fill={color}
            width="50"
            height="50"
            stroke="black"
            onClick={this.changeColors} />
    ));

    const circles = this.state.circles.map((pos, i) => (
      <Circle key={3 + i}
              x={pos * 10 + 5}
              y="100"
              radius="5"
              fill="black"
              onClick={this.addCircle} />
    ));

    return (
      <Layer>
        {rectangles}
        {circles}
      </Layer>
    );
  }
}

React.render(
  <Stage height={1000} width={800}>
    <TestingComponent />
    <Layer>
      <Star x="150" y="150"
            numPoints="5"
            innerRadius="20"
            outerRadius="50"
            fill="red"
            stroke="black" />
      <Circle x="300" y="100"
              radius="50"
              stroke="red" />
    </Layer>
  </Stage>,
  document.getElementById('canvas')
);

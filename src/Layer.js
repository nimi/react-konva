import ContainerComponent from './abstract/ContainerComponent';

class Layer extends ContainerComponent {

  displayName = 'Layer';

  componentDidUpdate() {
    if (this.props.useBatchDraw) {
      this.node.batchDraw();
    } else {
      this.node.draw();
    }
  }

}

export default Layer;

"use strict";

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var RK = require('../react-konva');
var Stage = React.createFactory(RK.Stage);
var Layer = React.createFactory(RK.Layer);
var Circle = React.createFactory(RK.Circle);
var Text = React.createFactory(RK.Text);
var TextPath = React.createFactory(RK.TextPath);

describe('Stage', function () {
  it('can render empty Stage', function () {
    var stage = TestUtils.renderIntoDocument(Stage(null));
    expect(stage.getDOMNode().textContent).toEqual('');
  });
});

function renderIntoStage(component) {
    return TestUtils.renderIntoDocument(
      Stage(null,
          Layer(null, component)));
}

describe('Circle', function () {
  it('can render Circle', function () {
    var stageInstance = TestUtils.renderIntoDocument(
      Stage(null,
        Layer(null, Circle({
            id: 1, x: 10, y: 20,
            radius: 5, stroke: 'red'
        }))));
    var circleInstance = TestUtils.findRenderedComponentWithType(
      stageInstance,
      Circle
    );
    var konvaCircle = circleInstance.getKonvaNode();
    expect(konvaCircle.x()).toBe(10);
    expect(konvaCircle.y()).toBe(20);
    expect(konvaCircle.radius()).toBe(5);
    expect(konvaCircle.stroke()).toBe('red');
    expect(konvaCircle.id()).toBe(1);
  });
});

describe('Text', function () {

  it('can render Text with no size', function () {
    var stageInstance = renderIntoStage(Text({text: 'Hello, world'}));
    var renderedText = TestUtils.findRenderedComponentWithType(
      stageInstance,
      Text
    );
    var konvaInstance = renderedText.getKonvaNode();
    expect(konvaInstance.text()).toEqual('Hello, world');
    expect(konvaInstance.getText()).toEqual('Hello, world');
  });

  it('can render Text with size', function () {
    var stageInstance = renderIntoStage(Text({
      x: 10,
      y: 15,
      text: 'Hello, world',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'green'
    }));
    var renderedText = TestUtils.findRenderedComponentWithType(
      stageInstance,
      Text
    );
    var konvaInstance = renderedText.getKonvaNode();
    expect(konvaInstance.text()).toEqual('Hello, world');
  });
});

describe('Text2', function () {

});

describe('TextPath', function () {
  it('can render TextPath', function () {
    var txt = (
      'All the world\'s a stage, and all the men and women merely players.'
    );
    var stageInstance = renderIntoStage(TextPath({
      x: 100,
      y: 50,
      fill: '#333',
      fontSize: '24',
      fontFamily: 'Arial',
      text: txt,
      data: 'M10,10 C0,0 10,150 100,100 S300,150 400,50'
    }));
    var renderedTextPath = TestUtils.findRenderedComponentWithType(
      stageInstance,
      TextPath
    );
    expect(renderedTextPath).not.toBeNull();
    var konvaInstance = renderedTextPath.getKonvaNode();
    expect(konvaInstance.getText()).toEqual(txt);
  });
});

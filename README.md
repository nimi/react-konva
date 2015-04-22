react-konva
=============

Konva canvas library using React components based on [react-kinetic](https://github.com/freiksenet/react-kinetic).

An attempt to make [React](http://facebook.github.io/react/) work with the
[Konva](https://github.com/konvajs/konva) HTML5 canvas library. The goal is to have
similar declarative markup as normal React and to have similar data-flow model.

Currently you can use all Konva components as React components and all Konva
events are supported on them in same way as normal browser events are supported.

You can even inspect the components in React dev tools.

Installation
------------

If you use browserify or webpack

```
npm install react konva react-konva
```

Then just require it

```js
require('react-konva');
```

If you use require.js or want to use it standalone, then standalone version is
available in [Releases](https://github.com/olimsaidov/react-konva/releases).

If you want to build from source

```
git clone https://github.com/olimsaidov/react-konva.git
cd react-konva
npm run build
```

User guide
----------

Minimal example:

```js
var React = require('react');
var ReactKonva = require('react-konva');

var Demo = React.createClass({
  render: function () {
    return (
      <ReactKonva.Stage height={300} width={300}>
        <ReactKonva.Layer>
          <ReactKonva.Rect x={100} y={100} width={50} height={50} fill="black" />
        </ReactKonva.Layer>
      </ReactKonva.Stage>
    );
  }
});

React.render(<Demo />, document.body);
```

All react-konva components correspond to Konva components of the same
name. All the parameters available for Konva objects are valid props for
corresponding react-konva components, unless otherwise noted.

Every react-konva component (or components that use react-konva components)
must be wrappe in `Stage`. `Stage` is the only react-konva element that has
actual DOM representation. Unlike `Konva.Stage`, `Stage` will ignore
`container` passed to it, because it constructs container by itself.

`Stage`'s only valid children are `Layer` components. `Layer`s are currently
only components that handle redrawing and currently they redraw on all changes
of props or children.

`Layer`s can have all the other react-konva components inside. The supported
elements are: `Container`, `Layer`, `Group`, `Label`, `Shape`, `Rect`, `Circle`,
`Ellipse`, `Ring`, `Wedge`, `Arc`, `Image`, `Text`, `Line`, `Sprite`, `Path`,
`TextPath`, `RegularPolygon`, `Star` and `Tag`. See Konva
[API docs](https://github.com/konvajs/konva) for valid props.

### Events

react-konva supports all Konva events. The names are done 'react-style',
so `onCamelCased`. Full mapping:

```js
var KonvaEvents = {
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onMouseMove: "mousemove",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onClick: "click",
  onDblClick: "dblclick",
  onDragStar: "dragstart",
  onDragEnd: "dragend",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend",
  onTap: "tap",
  onDblTap: "dbltap",
  onDragMove: "dragmove"
};
```

Events work in similar way as they work in normal React. See
[demo/rectangles.js](examples/rectangles/app.js) for examples.

Internally, events use the `.react` namespace for Konva events,
so this namespace shouldn't be used if you manually bind events,
e.g. in `componentDidMount`.

### Some internals

To get raw Konva node object, use the `node` property which all
react-konva components have.

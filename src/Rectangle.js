import _ from "lodash";

import {
  default as React,
  PropTypes,
} from "react";

import {
  MAP,
} from "./withGoogleMap";

import {
  addDefaultPrefixToPropTypes,
  collectUncontrolledAndControlledProps,
  default as enhanceElement,
} from "./enhanceElement";

export const RECTANGLE = `__SECRET_RECTANGLE_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`;

const controlledPropTypes = {
  // NOTICE!!!!!!
  //
  // Only expose those with getters & setters in the table as controlled props.
  //
  // [].map.call($0.querySelectorAll("tr>td>code", function(it){ return it.textContent; })
  //    .filter(function(it){ return it.match(/^set/) && !it.match(/^setMap/); })
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
  bounds: PropTypes.any,
  draggable: PropTypes.bool,
  editable: PropTypes.bool,
  options: PropTypes.object,
  visible: PropTypes.bool,
};

const defaultUncontrolledPropTypes = addDefaultPrefixToPropTypes(controlledPropTypes);

const eventMap = {
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
  // `bounds_changed`,
  onClick: `click`,
  // `dblclick`,
  // `drag`,
  // `dragend`,
  // `dragstart`,
  // `mousedown`,
  // `mousemove`,
  // `mouseout`,
  // `mouseover`,
  // `mouseup`,
  // `rightclick`,
};

const publicMethodMap = {
  // Public APIs
  //
  // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
  //
  // [].map.call($0.querySelectorAll("tr>td>code"), function(it){ return it.textContent; })
  //    .filter(function(it){ return it.match(/^get/) && !it.match(/Map$/); })
  getBounds(rectangle) { return rectangle.getBounds(); },

  getDraggable(rectangle) { return rectangle.getDraggable(); },

  getEditable(rectangle) { return rectangle.getEditable(); },

  getVisible(rectangle) { return rectangle.getVisible(); },
  // END - Public APIs
};

const controlledPropUpdaterMap = {
  bounds(rectangle, bounds) { rectangle.setBounds(bounds); },
  draggable(rectangle, draggable) { rectangle.setDraggable(draggable); },
  editable(rectangle, editable) { rectangle.setEditable(editable); },
  options(rectangle, options) { rectangle.setOptions(options); },
  visible(rectangle, visible) { rectangle.setVisible(visible); },
};

function getInstanceFromComponent(component) {
  return component.state[RECTANGLE];
}

export default _.flowRight(
  React.createClass,
  enhanceElement(getInstanceFromComponent, publicMethodMap, eventMap, controlledPropUpdaterMap),
)({
  displayName: `Rectangle`,

  propTypes: {
    ...controlledPropTypes,
    ...defaultUncontrolledPropTypes,
  },

  contextTypes: {
    [MAP]: PropTypes.object,
  },

  getInitialState() {
    // https://developers.google.com/maps/documentation/javascript/3.exp/reference#Rectangle
    const rectangle = new google.maps.Rectangle({
      map: this.context[MAP],
      ...collectUncontrolledAndControlledProps(
        defaultUncontrolledPropTypes,
        controlledPropTypes,
        this.props
      ),
    });
    return {
      [RECTANGLE]: rectangle,
    };
  },

  componentWillUnmount() {
    const rectangle = this.state[RECTANGLE];
    if (rectangle) {
      rectangle.setMap(null);
    }
  },

  render() {
    return false;
  },
});

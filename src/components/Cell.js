/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.data["data-status"] !== this.props.data["data-status"];
  }

  render() {
    let classes = ["cell dead", "cell alive"];
    return (
      <div
        className={classes[this.props.data["data-status"]]}
        {...this.props.data}
      />
    );
  }
}

export default Cell;

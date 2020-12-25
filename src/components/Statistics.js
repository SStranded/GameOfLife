/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const liveCells = (
      <div className="stat">Live Cells: {this.props.liveCells}</div>
    );
    const generation = (
      <div className="stat">Generation: {this.props.generation}</div>
    );
    return (
      <div className="statistics">
        {liveCells}
        {generation}
      </div>
    );
  }
}

export default Statistics;

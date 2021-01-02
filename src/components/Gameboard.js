/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Cell from "./Cell";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameboard: [],
    };
  }

  renderCell(row, col, cell) {
    // let dataAttrs = {
    //   "data-row": row,
    //   "data-col": col,
    //   "data-status": cell,
    //   onClick: this.props.onClick,
    // };
    let rowCol = String(row) + "_" + String(col);
    let classes = ["cell dead", "cell alive"];
    let newCell = (
      <div
        className={classes[cell]}
        onClick={this.props.onClick}
        key={rowCol}
        id={rowCol}
      />
    );
    // return <Cell key={"row" + row + "cell" + col} data={dataAttrs} />;
    return newCell;
  }

  renderBoard() {
    let gameboard = [];
    for (let row = 0; row < this.props.rows; row++) {
      let rowOfCells = [];
      for (let col = 0; col < this.props.cols; col++) {
        let position = { row: row, col: col };
        if (this.props.life.isCellAlive(position)) {
          rowOfCells.push(
            <div
              className={"cell alive"}
              key={[row, col]}
              onClick={() => this.props.swapCell(position)}
            ></div>
          );
        } else {
          rowOfCells.push(
            <div
              className={"cell dead"}
              key={[row, col]}
              onClick={() => this.props.swapCell(position)}
            ></div>
          );
        }
      }
      gameboard.push(
        <div key={row} className="game-row">
          {rowOfCells}
        </div>
      );
    }
    this.setState({
      gameboard: gameboard,
    });
  }

  componentDidMount() {
    this.renderBoard();
  }

  render() {
    return <div className="gameboard">{this.state.gameboard}</div>;
  }
}

export default Gameboard;

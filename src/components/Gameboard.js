/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Cell from "./Cell";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   gameboard: [],
    // };
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

  render() {
    let gameboardArray = this.props.gameboard;

    // still created entire gameboard every step? Wasteful if so.
    let gameboardHTML = [];
    for (let i = 0; i < this.props.rows; i++) {
      let cells = [];
      let check = gameboardArray[i];
      for (let j = 0; j < this.props.cols; j++) {
        let cell;
        if (!check) {
          cell = this.renderCell(i, j, 0);
        } else {
          cell = this.renderCell(i, j, gameboardArray[i][j]);
        }
        cells.push(cell);
      }
      gameboardHTML.push(
        <div key={i} className="game-row">
          {cells}
        </div>
      );
    }

    return <div className="gameboard">{gameboardHTML}</div>;
  }
}

export default Gameboard;

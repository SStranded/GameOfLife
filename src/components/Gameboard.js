import React from "react";
import PropTypes from "prop-types";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCell(row, col, cell) {
    // cell is 1 (alive) or 0 (dead)
    let rowCol = row + "_" + col;
    let classes = ["bg-black dead", "bg-primary"];
    let newCell = (
      <div
        className={classes[cell] + " w-2.5 h-2.5 "}
        onClick={this.props.onClick}
        key={rowCol}
        id={rowCol}
      />
    );
    return newCell;
  }

  render() {
    let gameboardArray = this.props.gameboard;
    let gameboardHTML = [];
    for (let i = 0; i < this.props.rows; i++) {
      let cells = [];
      for (let j = 0; j < this.props.cols; j++) {
        cells.push(this.renderCell(i, j, gameboardArray[i][j]));
      }
      gameboardHTML.push(
        <div key={i} className="flex">
          {cells}
        </div>
      );
    }

    return <div className="border border-primary">{gameboardHTML}</div>;
  }
}

Gameboard.propTypes = {
  onClick: PropTypes.func,
  gameboard: PropTypes.array,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

export default Gameboard;

import React from "react";
import PropTypes from "prop-types";

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
  }

  // An individual cell
  renderCell(row, col, cell) {
    // cell is 1 (alive) or 0 (dead)
    let rowCol = row + "_" + col;
    let classes = ["cell dead", "cell alive"];
    let newCell = (
      <div
        className={classes[cell]}
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
        <div key={i} className="game-row">
          {cells}
        </div>
      );
    }

    return <div className="gameboard">{gameboardHTML}</div>;
  }
}

Gameboard.propTypes = {
  onClick: PropTypes.func,
  gameboard: PropTypes.array,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

export default Gameboard;

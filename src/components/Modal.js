import React from "react";
import PropTypes from "prop-types";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let clearButton = (
      <div onClick={this.props.onClick} className="close">
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
    );

    return (
      <div id="modal">
        <div className="modal-content">
          {clearButton}
          <p>
            The Game of Life is a cellular automaton devised by the British
            mathematician John Horton Conway in 1970. It is a zero-player game,
            meaning that its evolution is determined by its initial state,
            requiring no further input. One interacts with the Game of Life by
            creating an initial configuration and observing how it evolves.
          </p>
          <p>
            The universe of the Game of Life is an infinite, two-dimensional
            orthogonal grid of square cells, each of which is in one of two
            possible states, live or dead. Every cell interacts with its eight
            neighbours, which are the cells that are horizontally, vertically,
            or diagonally adjacent.
          </p>
          <p>At each step in time, the following transitions occur:</p>
          <div>
            <ol>
              <li>
                Any live cell with fewer than two live neighbours dies, as if by
                underpopulation.
              </li>
              <li>
                Any live cell with two or three live neighbours lives on to the
                next generation.
              </li>
              <li>
                Any live cell with more than three live neighbours dies, as if
                by overpopulation.
              </li>
              <li>
                Any dead cell with exactly three live neighbours becomes a live
                cell, as if by reproduction.
              </li>
            </ol>
          </div>
          <p>
            Source:{" "}
            <a
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
              target={"_blank"}
              rel="noreferrer"
            >
              Wikipedia
            </a>
          </p>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func,
  gameboard: PropTypes.array,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

export default Modal;

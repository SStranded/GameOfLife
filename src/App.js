import React from "react";
import Gameboard from "./components/Gameboard";
import Statistics from "./components/Statistics";
import Controls from "./components/Controls";
import Modal from "./components/Modal";
import "./App.scss";

class GOL extends React.Component {
  constructor() {
    super();
    this.handleCellClick = this.handleCellClick.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.gamePause = this.gamePause.bind(this);
    this.gameClear = this.gameClear.bind(this);
    this.gameStep = this.gameStep.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      rows: 50,
      cols: 50,
      gameboard: [],
      newGame: true,
      generation: 1,
      liveCells: 0,
      inPlay: null,
      interval: 100,
      showModal: false,
    };
  }

  // Sets up the game array of cells
  createGameArray(rows, cols, clear = false) {
    let gameboard = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let cell;
        clear ? (cell = 0) : (cell = Math.round(Math.random()));
        row.push(cell);
      }
      gameboard.push(row);
    }
    this.getLiveCellCount(gameboard);
    return gameboard;
  }

  // Gets number of 'live' cells
  getLiveCellCount(gameboard) {
    let liveCellCount = gameboard.reduce((liveCells, row) => {
      row.forEach((cell) => {
        liveCells += cell ? 1 : 0;
      });
      return liveCells;
    }, 0);
    this.setState({
      liveCells: liveCellCount,
    });
  }

  // Gets the number of 'live' cells that neighbor a cell
  checkNeighbors(cell, row, col) {
    let neighbors = 0;
    // check each cell in 3x3 grid around cell and count live cells
    for (let i = row - 1; i <= row + 1; i++) {
      if (i < 0 || i > this.state.rows - 1) {
        continue;
      }
      for (let j = col - 1; j <= col + 1; j++) {
        if (j < 0 || j > this.state.cols - 1) {
          continue;
        }
        // cell being checked; don't count it for its update
        if (i === row && j === col) {
          continue;
        }

        if (this.state.gameboard[i] && this.state.gameboard[i][j]) {
          neighbors++;
        }
      }
    }
    return neighbors;
  }

  // Processes a single generation
  lifeCycle() {
    let liveCells = 0;
    let newGameBoard = this.state.gameboard.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        let liveNeighbors = this.checkNeighbors(cell, rowIndex, cellIndex);
        // TODO replace following with switch for easier readability
        if (cell) {
          liveNeighbors <= 1
            ? (cell = 0)
            : liveNeighbors === 2 || liveNeighbors === 3
            ? (cell = 1)
            : (cell = 0);
        } else if (!cell) {
          liveNeighbors === 3 ? (cell = 1) : (cell = 0);
        }

        if (cell) {
          liveCells++;
        }
        return cell;
      })
    );

    this.setState({
      newGame: false,
      generation: this.state.generation + 1,
      liveCells: liveCells,
      gameboard: newGameBoard,
    });
  }

  gameStart() {
    if (this.state.liveCells === 0) {
      this.gameReset();
    }
    this.setState({
      inPlay: setInterval(() => {
        this.lifeCycle();
      }, this.state.interval),
    });
  }

  gamePause() {
    if (this.state.inPlay) {
      clearInterval(this.state.inPlay);
      this.setState({
        inPlay: null,
      });
    }
  }

  // Clears the board and creates new array
  gameClear() {
    this.gamePause();
    let gameboard = this.createGameArray(
      this.state.rows,
      this.state.cols,
      true
    );
    this.setState({
      gameboard: gameboard,
      newGame: true,
      generation: 0,
    });
  }

  gameStep() {
    this.gamePause();
    this.lifeCycle();
  }

  gameReset() {
    this.gamePause();
    let gameboard = this.createGameArray(this.state.rows, this.state.cols);
    this.setState({
      gameboard: gameboard,
      newGame: true,
      generation: 1,
    });
  }

  // Clicking on cell will change it to the opposite of it's state (live > dead; dead > live)
  // Updates live cell count and game board
  handleCellClick(event) {
    let gameboard = this.state.gameboard.slice(0);
    gameboard[event.target.id.split("_")[0]][event.target.id.split("_")[1]] =
      event.target.className == "cell dead" ? 1 : 0;
    this.getLiveCellCount(gameboard);
    this.setState({
      gameboard: gameboard,
      generation: this.state.generation === 0 ? 1 : this.state.generation,
    });
  }

  handleSpeedChange(speed) {
    clearInterval(this.state.inPlay);

    this.setState({
      interval: speed,
      inPlay: null,
    });

    if (this.state.inPlay) {
      this.setState({
        inPlay: setInterval(() => {
          this.lifeCycle();
        }, speed),
      });
    }
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  componentDidMount() {
    this.gameReset();
  }

  componentWillUnmount() {
    clearInterval(this.state.inPlay);
  }

  render() {
    let gameboardRender;
    if (this.state.gameboard[0]) {
      gameboardRender = (
        <Gameboard
          gameboard={this.state.gameboard}
          rows={this.state.rows}
          cols={this.state.cols}
          onClick={this.handleCellClick}
        />
      );
    }

    return (
      <>
        {this.state.showModal ? <Modal onClick={this.handleModal} /> : ""}
        <div id="GOL">
          <div className="game-of-life">
            <div className="title">
              Conway&#39;s Game of Life{" "}
              <i
                className="fa fa-question-circle"
                onClick={this.handleModal}
              ></i>
            </div>
            {gameboardRender}
            <Statistics
              liveCells={this.state.liveCells}
              generation={this.state.generation}
            />
            <Controls
              onPlay={this.gameStart}
              onPause={this.gamePause}
              onClear={this.gameClear}
              onStep={this.gameStep}
              onReset={this.gameReset}
              onSpeed={this.handleSpeedChange}
              gameStatus={!!this.state.inPlay}
              interval={this.state.interval}
            />
          </div>
        </div>
      </>
    );
  }
}

export default GOL;

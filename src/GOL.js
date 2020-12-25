/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Gameboard from "./components/Gameboard";
import Statistics from "./components/Statistics";
import Controls from "./components/Controls";
import "./GOL.scss";

class GOL extends React.Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.gamePause = this.gamePause.bind(this);
    this.gameClear = this.gameClear.bind(this);
    this.gameStep = this.gameStep.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.state = {
      rows: 50,
      cols: 50,
      gameboard: [],
      newGame: true,
      generation: 1,
      liveCells: 0,
      inPlay: null,
      interval: 10,
    };
  }

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

  lifeCycle() {
    let liveCells = 0;
    let newGameBoard = this.state.gameboard.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        let liveNeighbors = this.checkNeighbors(cell, rowIndex, cellIndex);
        // replace following with switch
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

  handleCellClick(event) {
    let gameboard = this.state.gameboard.slice(0);
    gameboard[event.target.id.split("_")[0]][event.target.id.split("_")[1]] =
      event.target.className == "cell dead" ? 1 : 0;
    this.getLiveCellCount(gameboard);
    this.setState({
      gameboard: gameboard,
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

  componentDidMount() {
    this.gameReset();
  }

  componentWillUnmount() {
    clearInterval(this.state.inPlay);
  }

  render() {
    return (
      <div id="GOL">
        <div className="game-of-life">
          <div className="title">Conways Game of Life</div>
          <Gameboard
            gameboard={this.state.gameboard}
            rows={this.state.rows}
            cols={this.state.cols}
            onClick={this.handleCellClick}
          />
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
          />
        </div>
      </div>
    );
  }
}

export default GOL;

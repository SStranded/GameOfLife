/* eslint-disable react/prop-types */
import React from "react";
// import PropTypes from "prop-types";
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
      gameboardHTML: [],
      newGame: true,
      generation: 1,
      liveCells: 0,
      inPlay: null,
      interval: 200,
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

  checkNeighbors(gameboard, cell, row, col) {
    let neighbors = 0;
    // check each cell in 3x3 grid around cell and count live cells
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i === row && j === col) {
          continue;
        } // cell being checked; don't count it for its update
        if (i >= 0 && j >= 0) {
          if (gameboard[i] && gameboard[i][j]) {
            neighbors++;
          }
        }
      }
    }
    // if there are neighbors, return sum of neighbors otherwise return zero
    // return (neighbors.length) ? neighbors.reduce((a, b) => a + b) : 0;
    return neighbors;
  }

  getLiveCellCount(gameboard = this.state.gameboard.slice(0)) {
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

  lifeCycle() {
    let gameboard = this.state.gameboard.slice(0);
    let liveCells = 0;
    let newGameBoard = gameboard.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        let liveNeighbors = this.checkNeighbors(
          gameboard,
          cell,
          rowIndex,
          cellIndex
        );

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
    });
    return newGameBoard;
  }

  gameStart() {
    if (this.state.liveCells === 0) {
      this.gameReset();
    }
    this.setState({
      inPlay: setInterval(() => {
        this.setState({
          gameboard: this.lifeCycle(),
        });
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
    });
  }

  gameStep() {
    this.gamePause();
    this.setState({
      gameboard: this.lifeCycle(),
    });
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
    gameboard[event.target.dataset.row][event.target.dataset.col] =
      event.target.dataset.status === "0" ? 1 : 0;
    this.getLiveCellCount(gameboard);
    this.setState({
      gameboard: gameboard,
    });
  }

  handleSpeedChange(speed) {
    clearInterval(this.state.inPlay);
    if (this.state.inPlay) {
      this.setState({
        interval: speed,
        inPlay: setInterval(() => {
          this.setState({
            gameboard: this.lifeCycle(),
          });
        }, speed),
      });
    } else {
      this.setState({
        interval: speed,
      });
    }
  }

  UNSAFE_componentWillMount() {
    this.gameReset();
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
            newGame={this.state.newGame}
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

function Statistics(props) {
  const liveCells = <div className="stat">Live Cells: {props.liveCells}</div>;
  const generation = <div className="stat">Generation: {props.generation}</div>;
  return (
    <div className="statistics">
      {liveCells}
      {generation}
    </div>
  );
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlowClick = this.handleSlowClick.bind(this);
    this.handleNormalClick = this.handleNormalClick.bind(this);
    this.handleFastClick = this.handleFastClick.bind(this);
  }

  handleSlowClick() {
    this.props.onSpeed(1000);
  }

  handleNormalClick() {
    this.props.onSpeed(500);
  }

  handleFastClick() {
    this.props.onSpeed(100);
  }

  render() {
    let playPauseButton;
    if (!this.props.gameStatus) {
      playPauseButton = (
        <i
          className="fa fa-play"
          aria-hidden="true"
          onClick={this.props.onPlay}
        ></i>
      );
    } else {
      playPauseButton = (
        <i
          className="fa fa-pause"
          aria-hidden="true"
          onClick={this.props.onPause}
        ></i>
      );
    }
    let stepButton = (
      <i
        className="fa fa-step-forward"
        aria-hidden="true"
        onClick={this.props.onStep}
      ></i>
    );
    let resetButton = (
      <i
        className="fa fa-refresh"
        aria-hidden="true"
        onClick={this.props.onReset}
      ></i>
    );
    let clearButton = (
      <i
        className="fa fa-bomb"
        aria-hidden="true"
        onClick={this.props.onClear}
      ></i>
    );

    let slowButton = (
      <div className="speed" onClick={this.handleSlowClick}>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
      </div>
    );
    let normalButton = (
      <div className="speed" onClick={this.handleNormalClick}>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
      </div>
    );
    let fastButton = (
      <div className="speed" onClick={this.handleFastClick}>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
        <i className="fa fa-caret-right" aria-hidden="true"></i>
      </div>
    );

    return (
      <div className="controls">
        <div>
          {playPauseButton}
          {stepButton}
          {resetButton}
          {clearButton}
        </div>
        <div>
          {slowButton}
          {normalButton}
          {fastButton}
        </div>
      </div>
    );
  }
}

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

class Gameboard extends React.Component {
  // constructor (props) {
  //   super(props);
  // }

  renderCell(row, col, cell) {
    let dataAttrs = {
      "data-status": cell,
      "data-row": row,
      "data-col": col,
      onClick: this.props.onClick,
    };
    return <Cell key={"row" + row + "cell" + col} data={dataAttrs} />;
  }

  render() {
    let gameboardArray = this.props.gameboard;

    // still created entire gameboard every step? Wasteful if so.
    let gameboardHTML = [];
    for (let i = 0; i < this.props.rows; i++) {
      let cells = [];
      for (let j = 0; j < this.props.cols; j++) {
        let cell = this.renderCell(i, j, gameboardArray[i][j]);
        cells.push(cell);
      }
      gameboardHTML.push(
        <div key={i} className="game-row" onClick={this.props.onClick}>
          {cells}
        </div>
      );
    }

    return <div className="gameboard">{gameboardHTML}</div>;
  }
}

// GOL.propTypes = {
//   subject: PropTypes.string.isRequired,
// };

export default GOL;

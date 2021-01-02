/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Gameboard from "./components/Gameboard";
import Statistics from "./components/Statistics";
import Controls from "./components/Controls";
import "./GOL.scss";
import Life from "./life";

class GOL extends React.Component {
  constructor() {
    super();
    this.gameStart = this.gameStart.bind(this);
    this.gamePause = this.gamePause.bind(this);
    this.gameClear = this.gameClear.bind(this);
    this.gameStep = this.gameStep.bind(this);
    this.gameReset = this.gameReset.bind(this);
    this.swapCell = this.swapCell.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.state = {
      life: new Life(),
      gameboard: [],
      liveCells: 0,
      inPlay: null,
      interval: 100,
      gameboardDisplay: null,
    };
  }

  swapCell(position) {
    this.setState(
      {
        life: this.state.life.swapCell(position),
        gameboardDisplay: null,
        liveCells: this.state.life.liveCellCount,
      },
      () => {
        this.setState({
          gameboardDisplay: (
            <Gameboard
              rows={this.state.life.rows}
              cols={this.state.life.cols}
              life={this.state.life}
              swapCell={this.swapCell.bind(this)}
            />
          ),
        });
      }
    );
  }

  gameStart() {
    this.setState({
      inPlay: setInterval(() => {
        this.runGame();
      }, this.state.interval),
    });
  }

  runGame() {
    this.setState(
      {
        life: this.state.life.newGeneration(),
        gameboardDisplay: null,
      },
      () => {
        this.setState({
          liveCells: this.state.life.liveCellCount,
          gameboardDisplay: (
            <Gameboard
              rows={this.state.life.rows}
              cols={this.state.life.cols}
              life={this.state.life}
              swapCell={this.swapCell.bind(this)}
            />
          ),
        });
      }
    );
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
    this.setState(
      {
        life: this.state.life.endLife(),
        gameboardDisplay: null,
        liveCells: this.state.life.liveCellCount,
      },
      () => {
        this.setState({
          gameboardDisplay: (
            <Gameboard
              rows={this.state.life.rows}
              cols={this.state.life.cols}
              life={this.state.life}
              swapCell={this.swapCell.bind(this)}
            />
          ),
        });
      }
    );
  }

  gameStep() {
    this.gamePause();
    this.runGame();
  }

  gameReset() {
    this.gamePause();
    this.setState(
      {
        life: this.state.life.generateFirstGeneration(
          this.state.life.rows,
          this.state.life.cols
        ),
        gameboardDisplay: null,
        liveCells: this.state.life.liveCellCount,
      },
      () => {
        this.setState({
          gameboardDisplay: (
            <Gameboard
              rows={this.state.life.rows}
              cols={this.state.life.cols}
              life={this.state.life}
              swapCell={this.swapCell.bind(this)}
            />
          ),
        });
      }
    );
  }

  handleSpeedChange(speed) {
    clearInterval(this.state.inPlay);

    this.setState(
      {
        interval: speed,
      },
      () => {
        if (this.state.inPlay) {
          this.setState({
            inPlay: setInterval(() => {
              this.runGame();
            }, this.state.interval),
          });
        }
      }
    );
  }

  generateFirstGeneration() {
    this.setState({
      life: this.life.generateFirstGeneration(
        this.state.life.rows,
        this.state.life.cols
      ),
    });
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
          {this.state.gameboardDisplay}
          <Statistics
            liveCells={this.state.life.getLiveCellCount()}
            generation={this.state.life.getGeneration()}
          />
          <Controls
            interval={this.state.interval}
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

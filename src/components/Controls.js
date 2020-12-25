/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

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
    this.props.onSpeed(10);
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

export default Controls;

import React from "react";
import PropTypes from "prop-types";

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
          className="fa fa-play mx-2.5 cursor-pointer"
          aria-hidden="true"
          onClick={this.props.onPlay}
        ></i>
      );
    } else {
      playPauseButton = (
        <i
          className="fa fa-pause mx-2.5 cursor-pointer"
          aria-hidden="true"
          onClick={this.props.onPause}
        ></i>
      );
    }

    let stepButton = (
      <i
        className="fa fa-step-forward mx-2.5 cursor-pointer"
        aria-hidden="true"
        onClick={this.props.onStep}
      ></i>
    );
    let resetButton = (
      <i
        className="fa fa-refresh mx-2.5 cursor-pointer"
        aria-hidden="true"
        onClick={this.props.onReset}
      ></i>
    );
    let clearButton = (
      <i
        className="fa fa-bomb mx-2.5 cursor-pointer"
        aria-hidden="true"
        onClick={this.props.onClear}
      ></i>
    );

    let slowButton = (
      <div className="mx-2.5 inline" onClick={this.handleSlowClick}>
        <i
          className={
            this.props.interval === 1000
              ? "fa fa-caret-right activeSpeed p-0 cursor-pointer"
              : "fa fa-caret-right p-0 cursor-pointer"
          }
          aria-hidden="true"
        ></i>
      </div>
    );
    let normalButton = (
      <div className="mx-2.5 inline" onClick={this.handleNormalClick}>
        <i
          className={
            this.props.interval === 500
              ? "fa fa-caret-right activeSpeed p-0 cursor-pointer"
              : "fa fa-caret-right p-0 cursor-pointer"
          }
          aria-hidden="true"
        ></i>
        <i
          className={
            this.props.interval === 500
              ? "fa fa-caret-right activeSpeed p-0 cursor-pointer"
              : "fa fa-caret-right p-0 cursor-pointer"
          }
          aria-hidden="true"
        ></i>
      </div>
    );
    let fastButton = (
      <div className="mx-2.5 inline" onClick={this.handleFastClick}>
        <i
          className={
            this.props.interval === 100
              ? "fa fa-caret-right activeSpeed p-0 cursor-pointer"
              : "fa fa-caret-right"
          }
          aria-hidden="true"
        ></i>
        <i
          className={
            this.props.interval === 100
              ? "fa fa-caret-right activeSpeed p-0 cursor-pointer"
              : "fa fa-caret-right"
          }
          aria-hidden="true"
        ></i>
        <i
          className={
            this.props.interval === 100
              ? "fa fa-caret-right activeSpeed p-0 cursor-pointer"
              : "fa fa-caret-right"
          }
          aria-hidden="true"
        ></i>
      </div>
    );

    return (
      <div className="flex justify-between my-3 mx-auto text-primary">
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

Controls.propTypes = {
  gameStatus: PropTypes.bool,
  interval: PropTypes.number,
  onSpeed: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onStep: PropTypes.func,
  onReset: PropTypes.func,
  onClear: PropTypes.func,
};

export default Controls;

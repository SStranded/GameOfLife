import React from "react";
import PropTypes from "prop-types";

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const liveCells = (
      <div className="flex justify-between text-md font-medium w-36 text-center font-mono">
        <span>Live Cells:</span>
        <span>{this.props.liveCells}</span>
      </div>
    );
    const generation = (
      <div className="flex justify-between text-md font-medium w-36 text-center font-mono">
        <span>Generation:</span>
        <span className="font-mono">{this.props.generation}</span>
      </div>
    );
    return (
      <div className="flex justify-around my-4 text-primary">
        {liveCells}
        {generation}
      </div>
    );
  }
}

Statistics.propTypes = {
  liveCells: PropTypes.number,
  generation: PropTypes.number,
};

export default Statistics;

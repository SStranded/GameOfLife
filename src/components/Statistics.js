import React from "react";
import PropTypes from "prop-types";

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const liveCells = (
      <div className="stat">Live Cells: {this.props.liveCells}</div>
    );
    const generation = (
      <div className="stat">Generation: {this.props.generation}</div>
    );
    return (
      <div className="statistics">
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

import React from "react";
import PropTypes from "prop-types";

class StatsCard extends React.Component {
  render() {
    return (
      <div className="card stats__card">
        <div className="card__text__wrapper">
          <h1>
            {this.props.pzs}{" "}
            {this.props.valueType != "USDT" ? (
              <span>PZS</span>
            ) : (
              <span>USDT</span>
            )}
          </h1>
          <p>{this.props.title}</p>
        </div>

        <div className="card__icon__wrapper">{this.props.children}</div>
      </div>
    );
  }
}

StatsCard.propTypes = {
  pzs: PropTypes.string,
  title: PropTypes.string,
  valueType: PropTypes.string,
};

export default StatsCard;

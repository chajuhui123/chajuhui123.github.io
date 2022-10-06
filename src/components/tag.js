import * as React from "react";
import PropTypes from "prop-types";

const Tag = ({ category }) => {
  return <div className="tag">#{category}</div>;
};

Tag.defaultProps = {
  category: ``,
};

Tag.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Tag;

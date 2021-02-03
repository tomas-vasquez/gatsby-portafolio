import React from "react";
import PropTypes from "prop-types";
import { IconLoader, IconLogo } from "@components/icons";

const Icon = ({ name }) => {
  switch (name) {
    case "Loader":
      return <IconLoader />;
    case "Logo":
      return <IconLogo />;
    default:
      return <IconLogo />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;

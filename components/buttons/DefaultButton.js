import React from "react";
import { PropTypes } from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

export default DefaultButton = ({
  buttonText,
  buttonTextColor,
  buttonColor,
  onPress
}) => {
  return (
    <TouchableOpacity
      style={[{ backgroundColor: buttonColor }, styles.button]}
      onPress={onPress}
    >
      <Text style={[{ color: buttonTextColor }, styles.buttonText]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

DefaultButton.defaultProps = {
  buttonColor: colors.white,
  buttonTextColor: colors.black
};
DefaultButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 2
  },
  buttonText: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
  }
});

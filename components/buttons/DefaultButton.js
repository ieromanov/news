import React from "react";
import { PropTypes } from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

export default DefaultButton = (props) => {
    const {
      buttonText,
      buttonTextColor,
      buttonColor,
      handlerButton
    } = props;

    return (
      <TouchableOpacity
        style={[{ backgroundColor: buttonColor }, styles.button]}
        onPress={handlerButton}
      >
        <Text style={[{ color: buttonTextColor }, styles.buttonText]}>{buttonText}</Text>
      </TouchableOpacity>
    );
}

DefaultButton.defaultProps = {
  buttonColor: colors.white,
  buttonTextColor: colors.black,
}
DefaultButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  handlerButton: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 2
  },
  buttonText: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
  }
});

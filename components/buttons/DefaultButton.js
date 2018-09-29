import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

export default class DefaultButton extends Component {
  render() {
    const {
      buttonText,
      buttonTextColor,
      buttonColor,
      handlerButton
    } = this.props;
    const color = buttonTextColor || colors.white;
    const backgroundColor = buttonColor || colors.black;

    return (
      <TouchableOpacity
        style={[{ backgroundColor }, styles.button]}
        onPress={handlerButton}
      >
        <Text style={[{ color }, styles.buttonText]}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

DefaultButton.protoTypes = {
  textButton: PropTypes.string.isRequired,
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

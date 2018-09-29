import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "../../constants/Colors";

export default class IconButton extends PureComponent {
  render() {
    const {
      iconName,
      buttonColor,
      buttonIconColor,
      handlerButton,
      sizeIcon
    } = this.props;

    // console.log("handlerButton", handlerButton)
    return (
      <TouchableOpacity
        style={[{ backgroundColor: buttonColor }, styles.button]}
        onPress={handlerButton}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={sizeIcon}
          style={[{ color: buttonIconColor }, styles.buttonText]}
        />
      </TouchableOpacity>
    );
  }
}

IconButton.defaultProps = {
  buttonColor: colors.transparent,
  buttonIconColor: colors.black,
  sizeIcon: 24,
};

IconButton.protoTypes = {
  iconName: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
  buttonIconColor: PropTypes.string,
  sizeIcon: PropTypes.num,
  handlerButton: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 2
  },
  buttonText: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
  }
});

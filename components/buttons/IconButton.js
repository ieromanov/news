import React from "react";
import { PropTypes } from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../../constants/Colors";

export default (IconButton = ({
  iconName,
  buttonColor,
  buttonIconColor,
  onPress,
  sizeIcon
}) => {
  return (
    <TouchableOpacity
      style={[{ backgroundColor: buttonColor }, styles.button]}
      onPress={onPress}
    >
      <Entypo
        name={iconName}
        size={sizeIcon}
        style={[{ color: buttonIconColor }, styles.buttonText]}
      />
    </TouchableOpacity>
  );
});

IconButton.defaultProps = {
  buttonColor: colors.transparent,
  buttonIconColor: colors.black,
  sizeIcon: 24
};

IconButton.protoTypes = {
  iconName: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
  buttonIconColor: PropTypes.string,
  sizeIcon: PropTypes.num,
  onPress: PropTypes.func
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

import React from "react";
import { PropTypes } from "prop-types";
import { Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import { TextInput } from "@shoutem/ui";

import colors from "../../constants/Colors";

export default (InputField = ({
  labelText,
  labelTextSize,
  textColor,
  inputType,
  onChange,
  toggleShowPassword,
  showPassword,
  customStyle
}) => {
  state = {
    showPassword: inputType === "password" ? true : false
  };

  handlerChange = text => {
    const value = text;
    const fieldName = inputType;

    onChange(value, fieldName);
  };

  return (
    <View style={[customStyle, styles.wrapper]}>
      <Text
        style={[{ color: textColor, fontSize: labelTextSize }, styles.label]}
      >
        {labelText}
      </Text>
      {inputType === "password" && (
        <Entypo
          name={!showPassword ? "eye" : "eye-with-line"}
          size={labelTextSize}
          color={textColor}
          style={styles.showPasswordButton}
          onPress={toggleShowPassword}
        />
      )}
      <TextInput
        autoCorrect={false}
        underlineColorAndroid="transparent"
        placeholder={labelText}
        onChangeText={this.handlerChange}
        secureTextEntry={!showPassword && inputType === "password"}
      />
    </View>
  );
});

InputField.defaultProps = {
  labelTextSize: 18,
  textColor: colors.white
};
InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  textColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleShowPassword: PropTypes.func,
  showPassword: PropTypes.bool,
  customStyle: PropTypes.object
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex"
  },
  showPasswordButton: {
    position: "absolute",
    right: 0,
    top: 5
  },
  label: {
    marginBottom: 5,
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal"
  },
  inputField: {
    borderBottomWidth: 1
  }
});

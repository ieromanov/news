import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../buttons/IconButton";

import colors from "../../constants/Colors";

export default (RowCard = ({
  text,
  iconName,
  backgroundColor,
  onPress
}) => {
  return (
    <View style={[{ backgroundColor }, styles.container]}>
      <Text style={styles.text}>{text}</Text>
      {iconName && <IconButton iconName={iconName} handlerButton={onPress}/>}
    </View>
  );
});

RowCard.defaultProps = {
  backgroundColor: colors.white,
  showButton: false
};
RowCard.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  backgroundColor: PropTypes.string,
  showButton: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  text: {
    fontSize: 24,
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
  }
});

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import colors from "../../constants/Colors";

export default DefaultLoader = (props) => {
  const { color, size } = props
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating color={color} size={size} />
    </View>
  );
}

DefaultLoader.defaultProps = {
  color: colors.black,
  size: 'large'
};
DefaultLoader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

import React from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView, Text, Dimensions, StyleSheet } from "react-native";
import IconButton from "../buttons/IconButton";

import colors from "../../constants/Colors";

/*
  Icons: expo -> MaterialCommunityIcons
*/

export default HeaderBack = ({ title, navigation }) => {
  const { goBack } = navigation;

  return (
    <View style={styles.header}>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonWrapper}>
          <IconButton
            iconName="chevron-left"
            onPress={() => goBack(null)}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

HeaderBack.propTypes = {
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: Dimensions.get("window").width
  },
  titleWrapper: {
    width: Dimensions.get("window").width * 0.6
  },
  title: {
    textAlign: "center",
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18
  },
  buttonWrapper: {
    width: Dimensions.get("window").width * 0.2
  }
});

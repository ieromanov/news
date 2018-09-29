import React, { PureComponent } from "react";
import PropTypes from 'prop-types'
import { View, SafeAreaView, Text, Dimensions, StyleSheet } from "react-native";
import IconButton from "../buttons/IconButton";

import colors from "../../constants/Colors";

/*
  Icons: expo -> MaterialCommunityIcons
*/

export default class HeaderBack extends PureComponent {
  render() {
    const { goBack } = this.props.navigation;
    const { title } = this.props;
    const button = this.props.showButton || false;

    const followOnJournal = () => {
      console.log("Hi");
    };

    console.log(button)

    return (
      <View style={styles.header}>
        <SafeAreaView style={styles.container}>
          <View style={styles.buttonWrapper}>
            <IconButton
              iconName="arrow-left"
              handlerButton={() => goBack(null)}
            />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {button && (
            <View style={styles.buttonWrapper}>
              <IconButton
                style={styles.button}
                iconName={"star-outline" || "star"}
                handlerButton={followOnJournal}
              />
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

HeaderBack.defaultProps = {
  button: false,
}
HeaderBack.protoTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.bool,
}

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

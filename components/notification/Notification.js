import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { Text, Easing, Animated, StyleSheet } from "react-native";

import colors from "../../constants/Colors";

export default class Notification extends Component {
  constructor() {
    super();
    
    this.positionValue = new Animated.Value(-100)
  }

  animatedNotification = value => {
    Animated.timing(this.positionValue, {
      toValue: value,
      duration: 600,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack,
      useNativeDriver: true
    }).start();
  };

  render() {
    const {
      type,
      errorText,
      typeColor,
      backgroundColor,
      textColor,
      showNotification,
      closeNotification
    } = this.props;

    showNotification ? this.animatedNotification(0) : this.animatedNotification(-100);
    return (
      <Animated.View
        style={[
          { backgroundColor, transform: [{ translateY: this.positionValue }] },
          styles.wrapper
        ]}
      >
        <Ionicons
          name="ios-close"
          size={20}
          color={textColor}
          style={styles.closeButton}
          onPress={closeNotification}
        />
        <Text>
          <Text style={[{ color: typeColor }, styles.notificatoinType]}>
            {`${type}: `}
          </Text>
          <Text style={[{ color: textColor }, styles.notificatoinText]}>
            {errorText}
          </Text>
        </Text>
      </Animated.View>
    );
  }
}

Notification.defaultProps = {
  typeColor: colors.errorColor,
  textColor: colors.black,
  backgroundColor: colors.white
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  typeColor: PropTypes.string,
  backgroundNotificationColor: PropTypes.string,
  showNotification: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 10
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 999
  },
  notificatoinType: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal"
  },
  notificatoinText: {
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    flexWrap: "wrap"
  }
});

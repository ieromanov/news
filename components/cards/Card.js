import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableHighlight,
  Animated,
  Easing,
  StyleSheet
} from "react-native";
import { Title, Image, Text, Caption } from "@shoutem/ui";
import { WebBrowser } from "expo";

import colors from "../../constants/Colors";

export default (Card = ({
  url,
  image,
  title,
  description,
  metaDataLeft,
  metaDataRight,
  animated
}) => {
  this.scaleValue = new Animated.Value(animated ? 0.8 : 1);

  animatedNewsCard = scale => {
    Animated.spring(this.scaleValue, {
      toValue: scale,
      duration: 800,
      easing: Easing.easeOutBack,
      useNativeDriver: true
    }).start();
  };

  getImage = (url) => {
    if (url && url.substr(0, 4) === "http")  {return { uri: url }}
    return require("../../assets/images/stub.png")
  }

  animated && this.animatedNewsCard(1);

  return (
    <TouchableHighlight
      onPress={() => (url ? WebBrowser.openBrowserAsync(url) : null)}
    >
      <Animated.View
        style={[{ transform: [{ scale: this.scaleValue }] }, styles.container]}
      >
        { image && <Image styleName="large-banner" source={{ uri: image }} /> }
        <View style={styles.contentWrapper}>
          <View style={styles.newsMeta}>
            { metaDataLeft && <Caption>{metaDataLeft}</Caption> }
            { metaDataRight && <Caption>{metaDataRight}</Caption> }
          </View>
          <Title>{title}</Title>
          { description && <Text numberOfLines={3}>{description}</Text> }
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
});

Card.defaultProps = {
  animated: false
};
Card.propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  metaDataLeft: PropTypes.string,
  metaDataRight: PropTypes.string,
  animated: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    paddingBottom: 10
  },
  contentWrapper: {
    padding: 15,
    backgroundColor: colors.white
  },
  newsMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10
  }
});

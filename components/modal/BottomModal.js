import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

import DefaultButton from "../buttons/DefaultButton";

import colors from "../../constants/Colors";
import IconButton from "../buttons/IconButton";

export default (BottomModal = ({ isVisible, title, description, onPressClose }) => {
  return (
    <Modal 
      style={styles.modal}
      isVisible={isVisible}
    >
      <View style={styles.modalContentWrapper}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{title}</Text>
          <IconButton 
            iconName='circle-with-cross'
            buttonIconColor={colors.black}
            sizeIcon={24}
            onPress={onPressClose}
            style={styles.closeButton}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Modal>
  );
});

BottomModal.defaultProps = {
  isVisible: true
};
BottomModal.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPressClose: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentWrapper: {
    position: 'relative',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 4,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: colors.black,
    fontFamily: "Rubik-Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10
  },
  description: {
    color: colors.black,
    fontFamily: "Rubik-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    marginBottom: 10
  }
});

import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Ionicons } from '@expo/vector-icons';
import {
    Text,
    Easing,
    Animated,
    StyleSheet
} from 'react-native';

import colors from '../../constants/Colors'

export default class Notification extends Component {
    constructor() {
        super();
        this.state = {
            positionValue: new Animated.Value(-100)
        }
    }

    animatedNotification = (value) => {
        const { positionValue } = this.state
        Animated.timing(
            positionValue,
            {
                toValue: value,
                duration: 600,
                velocity: 3,
                tension: 2,
                friction: 8,
                easing: Easing.easeOutBack
            }
        ).start()
    }

    render(){
        const { type, errorText, typeColor, bgColor, textColor, showError, closeNotification } = this.props
        const { positionValue } = this.state
        const TypeColor = typeColor || colors.errorColor
        const TextColor = textColor || colors.black
        const backgroundColor = bgColor || colors.white

        showError ? this.animatedNotification(0) : this.animatedNotification(-100)
        return (
            <Animated.View style={[{backgroundColor, transform: [{translateY: positionValue}]}, styles.wrapper]}>
                <Ionicons name='ios-close' size={20} color={TextColor} style={styles.closeButton} onPress={closeNotification} />
                <Text>
                    <Text style={[{color: TypeColor}, styles.notificatoinType]}>{type}: </Text>
                    <Text style={[{color: TextColor}, styles.notificatoinText]}>{errorText}</Text>
                </Text>
            </Animated.View>
        );
    }
}

Notification.protoTypes = {
    type: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    typeColor: PropTypes.string,
    backgroundNotificationColor: PropTypes.string,
    showError: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 20,
        paddingRight: 40,
        paddingVertical: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 999,
    },
    notificatoinType: {
        fontFamily: 'Rubik-Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    notificatoinText: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal', 
        flexWrap: 'wrap',
    }
});
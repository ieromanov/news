import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import colors from '../../constants/Colors'

export default class InputField extends Component {
    state = {
        showPassword: this.props.inputType === 'password' ? true : false,
    }

    handlerChange = (text) => {
        const value = text;
        const fieldName = this.props.inputType;
        
        this.props.onChange(value, fieldName);
    } 

    toggleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render(){
        const { labelText, labelTextSize, inputTextSize, textColor, borderColor, inputType, customStyle } = this.props
        const { showPassword } = this.state
        const labelFontSize = labelTextSize || 18;
        const inputFontSize = inputTextSize || 20;
        const color = textColor || colors.white;
        const borderBottomColor = borderColor || 'transparent';
        return (
            <View style={[customStyle, styles.wrapper]}>
                <Text style={[{color, fontSize: labelFontSize}, styles.label]}>{labelText}</Text>
                {
                    this.props.inputType === 'password' ? 
                        <Ionicons 
                            name={showPassword ? 'ios-eye-outline' : 'ios-eye-off-outline'} 
                            size={labelFontSize} 
                            color={color} 
                            style={styles.showPasswordButton} 
                            onPress={this.toggleShowPassword}
                        /> :
                        null
                }
                <TextInput
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    placeholder={labelText}
                    onChangeText={this.handlerChange}
                    style={[{color, borderBottomColor, fontSize: inputFontSize }, styles.inputField]} 
                    secureTextEntry={showPassword}
                />
            </View>
        );
    }
}

InputField.protoTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    inputTextSize: PropTypes.number,
    textColor: PropTypes.string,
    borderColor: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    customStyle: PropTypes.object,
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex'
    },
    showPasswordButton: {
        position: 'absolute',
        right: 0,
        top: 5
    },
    label: {
        fontWeight: '700',
        marginBottom: 5,
    },
    inputField: {
        borderBottomWidth: 1,
    }
});
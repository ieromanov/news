import React from 'react';
import { PropTypes } from 'prop-types'
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,   
    StyleSheet
} from 'react-native';

import { TextInput } from '@shoutem/ui'

import colors from '../../constants/Colors'

export default InputField = ({ labelText, labelTextSize,  textColor,  inputType, customStyle}) => {
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
        return (
            <View style={[customStyle, styles.wrapper]}>
                <Text style={[{color: textColor, fontSize: labelTextSize}, styles.label]}>{labelText}</Text>
                {
                    inputType === 'password' ? 
                        <Ionicons 
                            name={this.state.showPassword ? 'ios-eye-outline' : 'ios-eye-off-outline'} 
                            size={labelTextSize} 
                            color={textColor} 
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
                    secureTextEntry={showPassword}
                />
            </View>
        );
}


InputField.defaultProps = {
    labelTextSize: 18,
    textColor: colors.white,
}
InputField.protoTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    textColor: PropTypes.string,
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
        marginBottom: 5,
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',    
    },
    inputField: {
        borderBottomWidth: 1,
    }
});
import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionCreators from '../redux/actions'

import InputField from '../components/forms/InputField'
import DefaultButton from '../components/buttons/DefaultButton'
import Notification from '../components/notification/Notification'
import colors from '../constants/Colors'

import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAPqxLILZcFCTLRyIOYpQinWqa6g1daWmg",
    authDomain: "auth-project-a886b.firebaseapp.com",
    databaseURL: "https://auth-project-a886b.firebaseio.com",
    projectId: "auth-project-a886b",
    storageBucket: "auth-project-a886b.appspot.com",
    messagingSenderId: "984183015645"
});
firebase.auth().useDeviceLanguage();

class LoginScreen extends Component {
    constructor(props) {
        super();

        this.state = {
            email: '',
            password: '',
            error: '',
            showError: false
        };
    }

    static navigationOptions = {
        header: null
    };


    componentWillReceiveProps (nextProps) {
        const { navigation } = this.props;
        const { navigate } = navigation;
        
        nextProps.loggedInStatus.loggedInState ? navigate('Main') : null
    }
    
       
    closeNotification = () => {
        this.setState({
            showError: false
        })
    }

    validateEmail = (value) => {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailCheckRegex.test(value)) {
            this.setState({error: '', showError: false})
            return true 
        }
        this.setState({error:'That is not a valid email address.', showError: true})
        return false
    }

    validatePassword = (value) => {
        if (value.lenght < 6) {
            this.setState({error:'That is not a valid password.', showError: true})
            return false
        }
        this.setState({error: '', showError: false})
        return true 
    }

    onChangeInput = (value, fieldName) => {
        this.setState({
            [fieldName]: value, 
        })
    }

    onLoginPress = () => {
        this.setState({error: ''});

        const {email, password} = this.state;
        const { logInWithEmail } = this.props;

        this.validateEmail(email) && validatePassword(password)  ? logInWithEmail(email, password) : null

    }

    onSingUpPress = () => {
        this.setState({ error: ''})

        const { email, password } = this.state
        const { navigation } = this.props
        const { navigate } = navigation
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                var user = firebase.auth().currentUser;

                user.sendEmailVerification().then(() => {
                    this.setState({ error: '' });
                    navigate('Main')
                }).catch(function(error) {
                    this.setState({ error: `${error}`, showError: true })
                });
            })
            .catch((error) => {
                this.setState({ error: `${error}`, showError: true })
            });
    }

    render(){
        return (
            <KeyboardAvoidingView
                style={styles.wrapper} 
                behavior='padding'
            >
                <View>
                    <Notification 
                        type='Error'
                        errorText={this.state.error}
                        textColor={colors.black}
                        backgroundNotificationColor={colors.white}
                        showError={this.state.showError}
                        closeNotification={this.closeNotification}
                    />
                </View>
                <View style={styles.contentWrapper}>
                    
                    <InputField 
                        labelText="Email"
                        labelTextSize={20}
                        inputTextSize={18}
                        textColor={colors.white} 
                        borderColor={colors.white}
                        inputType='email'
                        onChange={this.onChangeInput}
                        data-field-name='email'
                    />
                    <InputField 
                        labelText="Password"
                        labelTextSize={20}
                        inputTextSize={16}
                        textColor={colors.white} 
                        borderColor={colors.white}
                        inputType='password'
                        onChange={this.onChangeInput}
                        customStyle={{marginTop: 20}}
                    />
                    <View style={styles.buttonWrapper}>
                        <DefaultButton
                            buttonText='Log In'
                            buttonColor={colors.white}
                            buttonTextColor={colors.black}
                            handlerButton={this.onLoginPress}
                        />
                        <DefaultButton
                            buttonText='Sign Up'
                            buttonColor={colors.white}
                            buttonTextColor={colors.black}
                            handlerButton={this.onSingUpPress}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    wrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.black,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    buttonWrapper: {
        marginTop: 40,
        flexDirection: "row"
    }, 
});

function mapStateToProps(state) {
    return {
        loggedInStatus: state.loggedInStatus
    }
}


const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
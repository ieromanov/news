import React, { PureComponent  } from 'react';
import { View, ImageBackground, Text, StyleSheet, Dimensions } from 'react-native';

import colors from '../constants/Colors'

import * as firebase from 'firebase';

export default class GreetingScreen extends PureComponent {
	static navigationOptions = {
		header: null,
	};

	componentDidMount() {
        setTimeout(this.checkAuthState, 1000)
	}
	
	checkAuthState = () => {
        const { navigation } = this.props;
		const { navigate } = navigation;
		
        firebase.auth().onAuthStateChanged(user => {
            user ? navigate('Main') : navigate('Login') 
        })
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source = {require('../assets/images/welcomeBG.jpg')} 
				>
					<Text style={styles.text}>NEWS</Text>			
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		textAlign: 'center',
		color: colors.white,
        fontFamily: 'Rubik-Bold',
        fontStyle: 'normal',
		fontWeight: 'bold', 
		fontSize: 42,
	}
});

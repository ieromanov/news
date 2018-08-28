import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class HeaderBack extends Component {
    constructor(props) {
        super();

    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <SafeAreaView 
                style={styles.conteiner}
            >
                <TouchableOpacity 
                    style={styles.buttonBack}
                    onPress={() => goBack(null)}>
                    <Ionicons
                                            name='ios-arrow-back'
                                            size={24}
                                            style={styles.iconBack}
                                        />
                </TouchableOpacity>
                <Text style={styles.headerText}> {this.props.title} </Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    buttonBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBack: {
        color: '#246fb3',
    },
    headerText: {
        flex: 5,
        fontSize: 18,
        color: 'rgba(0,0,0,0.7)'
    }
});

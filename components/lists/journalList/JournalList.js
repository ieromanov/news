import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import apiKey from '../../../api/apiKey.json';

import HeaderBack from '../../headers/HeaderBack';

export default class JournalList extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderBack 
                    title={navigation.state.params.name}
                    navigation={navigation}
                />
    });

    state = {
        wallsJSON: {},
        loading: true,
    }

    componentDidMount = () => {
        this.fetchWallsJSON();
    }

    fetchWallsJSON = () => {

        const { navigation } = this.props;

        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/sources?country=${navigation.state.params.country}&apiKey=${apiKey['api']}`;
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {

                this.state.wallsJSON = {};
                this.state.wallsJSON = jsonData.sources;

                this.setState({
                    loading: false,
                    wallsJSON: this.state.wallsJSON
                });
            })
            .catch(error => console.log('JSON Fetch error : ' + error));
    }

    renderLoadingSpinner = () => {
        return (
            <View style={styles.loadingContainer} >
                <ActivityIndicator
                    animating
                    color={'#000000'}
                    size={'large'} />
            </View>
        );
    }


    renderResults = () => {
        const { navigate } = this.props.navigation;
        this.state.languageArr = [];
        return (
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.fetchWallsJSON}
                    />
                }
            >
                {
                    this.state.wallsJSON.map((dataSourceNews, index) => {
                            return (
                                <TouchableHighlight
                                    key={index}
                                    style={styles.touchableComponent}
                                    onPress={() =>
                                        navigate('NewsList',
                                                {   
                                                    name: dataSourceNews.name, 
                                                    country: dataSourceNews.country, 
                                                    sources: dataSourceNews.id,
                                                })
                                    }>
                                    <View style={styles.sourceContainer}>
                                        <Text style={styles.sourceName}>
                                            {dataSourceNews.name}
                                        </Text>
                                        <Ionicons
                                            name='ios-arrow-forward'
                                            size={24}
                                            style={styles.sourceArrow}
                                        />
                                    </View>
                                </TouchableHighlight>
                            );
                    })
                }
            </ScrollView>
        );
    }

    render() {
        return (this.state.loading ? this.renderLoadingSpinner() : this.renderResults());
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
    touchableComponent: {
        backgroundColor: '#ffffff',
        borderRadius: 4,
        borderWidth: 0.5,
        paddingLeft: 15,
        borderColor: '#d6d7da',
        paddingVertical: 20,
    },
    sourceContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    sourceName: {
        flex: 5,
        color: 'rgba(0,0,0,0.5)',
    },
    sourceArrow: {
        marginRight: 20,
        color: 'rgba(0,0,0,0.5)'
    },
    sourseArrow: {
        flex: 1,
    }
});

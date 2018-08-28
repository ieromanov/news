import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableHighlight,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
} from 'react-native';

import { WebBrowser, BlurView } from 'expo';

import apiKey from '../../../../api/apiKey.json';

import HeaderBack from '../../../headers/HeaderBack';

export default class NewsList extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderBack 
                            title={navigation.state.params.name}
                            navigation={navigation}
        
                />
    });

    constructor(props) {
        super();

        this.state = {
            wallsJSON: {},
            loading: true,
        }
    }

    componentDidMount = () => {
        this.fetchWallsJSON();
    }

    fetchWallsJSON = () => {
        
        const { navigation } = this.props;

        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?sources=${navigation.state.params.sources}&pageSize=20&apiKey=${apiKey['api']}`;
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {

                this.state.wallsJSON = {};
                this.state.wallsJSON = jsonData.articles;

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

    parcingDate = (date) => {
        if (typeof (date) == 'string') {
            let result,
                day,
                mounth,
                year,
                hour,
                minute;

            year = date.substr(0, 4);
            mounth = date.substr(5, 2);
            day = date.substr(8, 2);
            hour = date.substr(11, 2);
            minute = date.substr(14, 2);

            return result = `${day}.${mounth}.${year} ${Number(hour)}:${minute}`;
        }
    }

    getUrlImage = (urlImage) => {
        return urlImage.substr(0, 4) === 'http' ? { uri: urlImage } : require('../../../../assets/images/stub.png');
    }

    handleLearnMorePress = (link) => {
        WebBrowser.openBrowserAsync(link);
    }

    renderResults = () => {
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
                    this.state.wallsJSON.map((dataNews, index) => {
                        return (
                            <TouchableHighlight
                                key={index}
                                onPress={() => this.handleLearnMorePress(dataNews.url)}
                                style={styles.newsContainer}>
                                <ImageBackground  
                                    style={styles.backgroundImage}
                                    source={dataNews.urlToImage ? this.getUrlImage(dataNews.urlToImage) : require('../../../../assets/images/stub.png')}
                                >
                                <BlurView 
                                        tint="dark" 
                                        intensity={50}
                                        style={styles.newsBlur}>
                                    <View style={styles.containerSourceAndDate}>
                                        <Text style={styles.newsSourceName}>
                                            {dataNews.source.name}
                                        </Text>
                                        <Text style={styles.newsDate}>
                                            {this.parcingDate(dataNews.publishedAt)}
                                        </Text>
                                    </View>

                                    <View style={styles.containerText}>
                                        <Text style={styles.newsTitle}>{dataNews.title}</Text>
                                        <Text style={styles.newsDescription}>{dataNews.description}</Text>
                                    </View>
                                    </BlurView>
                                </ImageBackground>
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
    newsContainer: {
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 6,
            width: 2
        },
        marginHorizontal: 5,
        marginBottom: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 250,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    newsBlur: {
        flex: 1,
    },
    containerSourceAndDate: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    newsSourceName: {
        color: "#fff",
        fontSize: 12
    },
    newsDate: {
        color: '#fff',
        fontSize: 10
    },
    containerText: {
        flex: 5,
        padding: 10,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    newsDescription: {
        color: '#fff',
        fontSize: 14
    }
});

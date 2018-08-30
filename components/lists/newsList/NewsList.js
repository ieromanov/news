import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { ListView, Divider, Title, Image, Text, Caption} from '@shoutem/ui'
import { WebBrowser } from 'expo';


import apiKey from '../../../api/apiKey.json';
import colors from '../../../constants/Colors'

import HeaderBack from '../../headers/HeaderBack';

export default class NewsList extends Component {
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

    parcingDate = (date) => {
        if (typeof (date) == 'string') {
            let result,
                day,
                mounth,
                year

            year = date.substr(0, 4)
            mounth = date.substr(5, 2)
            day = date.substr(8, 2)

            return result = `${day}.${mounth}.${year}`;
        }
    }

    getUrlImage = (urlImage) => {
        return urlImage.substr(0, 4) === 'http' ? {uri: urlImage} : require('../../../assets/images/stub.png');
    }

    handleLearnMore = (link) => {
        WebBrowser.openBrowserAsync(link);
    }

    renderRow = news => {
        return (
            <TouchableHighlight onPress={()=>this.handleLearnMore(news.url)}>
                <View>
                    <Image
                        styleName="large-banner"
                        source={news.urlToImage ? this.getUrlImage(news.urlToImage) : require('../../../assets/images/stub.png')}
                    />
                    <View style={styles.contentWrapper}>
                        <View style={styles.newsMeta}>
                            <Caption>{news.author ? news.author : news.source.name}</Caption>
                            <Caption>{this.parcingDate(news.publishedAt)}</Caption>
                        </View>
                        <Title>{news.title}</Title>
                        <Text numberOfLines={3}>{news.description}</Text>
                    </View>
                    <Divider styleName="line" />
                </View>
          </TouchableHighlight>
        );
    }

    render() {
        const { wallsJSON, loading } = this.state
        return (
            <ListView
                data={wallsJSON}
                renderRow={this.renderRow}
                loading={loading}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentWrapper: {
        padding: 15,
        backgroundColor: colors.white
    },
    newsMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    newsTitle: {
        marginVertical: 10
    }
});

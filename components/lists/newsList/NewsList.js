import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { View, ListView, Subtitle, Image, Title, Caption} from '@shoutem/ui'
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
                <View style={styles.newsWrapper}>
                    <Image
                        styleName="large-banner"
                        source={news.urlToImage ? this.getUrlImage(news.urlToImage) : require('../../../assets/images/stub.png')}
                    />
                    <View>
                        <View style={styles.newsMeta} styleName="horizontal v-center space-between">
                            <Caption>{news.source.name}</Caption>
                            <Caption>{this.parcingDate(news.publishedAt)}</Caption>
                        </View>
                        <Title>{news.title}</Title>
                        <Subtitle>{news.description}</Subtitle>
                    </View>
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

});

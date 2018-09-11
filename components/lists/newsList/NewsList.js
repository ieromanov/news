import React, { PureComponent  } from 'react';
import {
    View,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'
import { ListView, Divider, Title, Image, Text, Caption} from '@shoutem/ui'
import { WebBrowser } from 'expo'


import apiKey from '../../../api/apiKey.json'
import colors from '../../../constants/Colors'

import HeaderBack from '../../headers/HeaderBack'

export default class NewsList extends PureComponent  {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderBack 
                    title={navigation.state.params.name}
                    navigation={navigation}
                />
    });

    state = {
        wallsJSON: [],
        loading: true,
        date: new Date().setDate(new Date().getDate()),
    }

    componentDidMount = () => {
        this.fetchWallsJSON();
    }

    fetchWallsJSON = () => {
        const { navigation } = this.props;
        const { date, wallsJSON } = this.state;
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/everything?sources=${navigation.state.params.sources}&to=${this.formatDate(date)}&pageSize=10&apiKey=${apiKey['api']}`;
        this.decrementDate()
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {
                if (wallsJSON.length === 0) {
                    this.setState({
                        loading: false,
                        wallsJSON: jsonData.articles
                    })
                } else {
                    this.setState({
                        loading: false,
                        wallsJSON: wallsJSON.concat(jsonData.articles)
                    })
                } 
            })
            .catch(error => console.log('JSON Fetch error : ' + error));
    }
    
    formatDate = (date) => {
        let newDate = new Date(date)

        let dd = newDate.getDate();
        dd < 10 ? dd = '0' + dd : dd
        
        let mm = newDate.getMonth() + 1;
        mm < 10 ? mm = '0' + mm : mm
        
        let yy = newDate.getFullYear();
        
        return `${yy}-${mm}-${dd}`;
    }

    parcingDate = (date) => {
        if (typeof (date) == 'string') {
            let year = date.substr(0, 4)
            let mounth = date.substr(5, 2)
            let day = date.substr(8, 2)

            return `${day}.${mounth}.${year}`;
        }
    }

    decrementDate = () => {
        const { date } = this.state
        const dDate = new Date(date).setDate(new Date(date).getDate() - 1)
        this.setState({ date: dDate })
    }

    loadMoreNews = () => {
        this.fetchWallsJSON()
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
                onLoadMore={this.loadMoreNews}
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

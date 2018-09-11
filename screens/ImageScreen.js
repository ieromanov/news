import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    ScrollView
} from 'react-native';

export default class ImageScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super();

        this.state = {
            wallsJSON: [],
            loading: true
        }
    }

    componentDidMount = () => {
        this.fetchWallsJSON();
    }

    fetchWallsJSON = () => {
        this.setState({ loading: true });
        const url = "https://pixabay.com/api/?key=6912186-be8b40c8427ba6551db6d967&order=latest&image_type=photo";
        fetch(url)
            .then(response => response.json())
            .then(jsonData => {

                this.state.wallsJSON = {};
                this.state.wallsJSON = jsonData.hits;

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
                    this.state.wallsJSON.map((wallpaper, index) => {
                        return (
                            <View 
                                key={ index }
                                style={styles.container}>
                                <Image 
                                    style={styles.image}
                                    source={{ uri: wallpaper.webformatURL}}/>
                                <View style={styles.containerRow}>
                                    <View style={styles.containerAuthorRow}>
                                        <Text style={styles.authorName}>{wallpaper.user}</Text>
                                    </View>
                                    <View style={styles.containerLikesRow}>
                                        <Text style={styles.curent}>{wallpaper.likes}</Text>
                                        <Text style={styles.curent}>{wallpaper.downloads}</Text>
                                    </View>
                                </View>     
                            </View>
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
    container: {
        flex: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
        margin: 10
    },
    image: {
        flex: 1,
        width: null,
        height: 200
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5
    },
    containerAuthorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    authorName: {
        marginLeft: 5
    },
    containerLikesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    curent: {
        color: '#666',
        marginHorizontal: 5
    },
});

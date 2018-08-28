import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import CountryList  from '../components/CountryList/CountryList';
import JournalList from '../components/CountryList/JournalList/JournalList';
import NewsList     from '../components/CountryList/JournalList/NewsList/NewsList';


const Navigation = createStackNavigator(
    {
        CountryList: { screen: CountryList},
        JournalList: { screen: JournalList },
        NewsList: { screen: NewsList },
    }
);

export default class NewsScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return <Navigation />;
    }
}

import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import CountryList  from '../components/lists/countryList/CountryList';
import JournalList  from '../components/lists/journalList/JournalList';


const Navigation = createStackNavigator(
    {
        CountryList: { screen: CountryList},
        JournalList: { screen: JournalList },
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

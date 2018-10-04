import React, { Component } from 'react';
import NewsList from '../components/lists/newsList/NewsList';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <NewsList />
    );
  }
}

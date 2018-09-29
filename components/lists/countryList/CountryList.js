import React, { Component } from "react";
import {
  View,
  TouchableHighlight,
  ActivityIndicator,
  RefreshControl,
  StyleSheet
} from "react-native";

import { Row, Divider, Title, Icon, ListView } from "@shoutem/ui";

import * as countries from "../../../assets/data/iso-3166.json";
import apiKey from "../../../api/apiKey.json";

export default class CountryList extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    wallsJSON: {},
    loading: true,
    countryArr: []
  };

  componentDidMount = () => {
    this.fetchWallsJSON();
  };

  componentWillMount = () => {
    this.state.loading = true;
  };

  fetchWallsJSON = () => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey["api"]}`;
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
      .catch(error => console.log("JSON Fetch error : " + error));
  };

  renderLoadingSpinner = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating color={"#000000"} size={"large"} />
      </View>
    );
  };

  sortByCountry = arrCountry => {
    let arr = [];

    arrCountry.map((country, index) => {
      if (arr.includes(country.country)) {
        return;
      } else {
        arr.push(country.country);
      }
    });
    return arr;
  };

  renderRow = country => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            navigate("JournalList", {
              name: countries[country],
              country: country
            });
          }}
        >
          <Row styleName="small">
            <Title>{countries[country]}</Title>
            <Icon name="right-arrow" />
          </Row>
        </TouchableHighlight>
        <Divider styleName="line" />
      </View>
    );
  };

  renderResults = () => {
    const { wallsJSON } = this.state;
    return (
      <ListView
        data={this.sortByCountry(wallsJSON)}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.fetchWallsJSON}
          />
        }
      />
    );
  };

  render() {
    return this.state.loading
      ? this.renderLoadingSpinner()
      : this.renderResults();
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

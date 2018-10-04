import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

import { Row, Divider, Title, Icon, ListView } from "@shoutem/ui";

import DefaultLoader from "../../preloader/DefaultLoader";

import * as countriesISO3166 from "../../../assets/data/iso-3166.json";
import apiKey from "../../../api/apiKey.json";
import RowCard from "../../cards/RowCard";

export default class CountryList extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    countries: [],
    loading: true
  };

  componentDidMount = () => {
    this.getCountry();
  };

  componentWillMount = () => {
    this.state.loading = true;
  };

  getCountry = async () => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey["api"]}`;
    let response = await fetch(url);
    let jsonData = await response.json();

    this.setState({
      loading: false,
      countries: jsonData.sources
    });
  };

  sortByCountry = arrCountry => {
    let arr = [];

    arrCountry.map(country => {
      if (arr.includes(country.country)) {
        return;
      } else {
        arr = [...arr, country.country];
      }
    });
    return arr;
  };

  renderRow = country => {
    const { navigate } = this.props.navigation;
    return (
      <RowCard
        text={countriesISO3166[country]}
        iconName="chevron-thin-right"
        onPress={() => {
          navigate("JournalList", {
            name: countriesISO3166[country],
            country: country
          });
        }}
      />
    );
  };

  renderResults = () => {
    const { countries } = this.state;
    return (
      <ListView
        data={this.sortByCountry(countries)}
        renderRow={this.renderRow}
      />
    );
  };

  render() {
    return this.state.loading ? <DefaultLoader /> : this.renderResults();
  }
}

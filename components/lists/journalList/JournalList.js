import React, { PureComponent } from "react";
import { ListView } from "@shoutem/ui";
import firebase from "firebase";

import apiKey from "../../../api/apiKey.json";

import HeaderBack from "../../headers/HeaderBack";
import DefaultLoader from "../../preloader/DefaultLoader";
import RowCard from '../../cards/RowCard';

export default class JournalList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <HeaderBack
        title={navigation.state.params.name}
        navigation={navigation}
      />
    )
  });

  state = {
    journals: [],
    followJournals: [],
    loading: true,
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  };

  componentDidMount = async () => {
    await this.getFollowJournals();
    await this.getJournals();
  };

  getFollowJournals = async () => {
    let userID = firebase.auth().currentUser.uid;
    let database = firebase.database();

    let userResponse = await database.ref("/" + userID);
    let userFollowResponse = await userResponse.once("value");
    let userFollowData = await userFollowResponse.val();

    for (key in userFollowData) {
      this.setState({
        followJournals: [...this.state.followJournals, userFollowData[key]]
      });
    }
  };

  getJournals = async () => {
    const { navigation } = this.props;
    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/sources?country=${
      navigation.state.params.country
    }&apiKey=${apiKey["api"]}`;
    let journalResp = await fetch(url);
    let journalData = await journalResp.json();

    this.setState({
      loading: false,
      journals: journalData.sources
    });
  };

  renderRow = journal => {
    const { followJournals } = this.state;
    return (
      <RowCard text={journal.name} iconName={followJournals.includes(journal.id) ? "heart" : "heart-outlined"} />
    );
  };

  renderResults = () => {
    const { journals } = this.state;
    return <ListView data={journals} renderRow={this.renderRow} />;
  };

  render() {
    return this.state.loading ? <DefaultLoader /> : this.renderResults();
  }
}

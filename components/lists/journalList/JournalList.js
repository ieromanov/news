import React, { PureComponent } from "react";
import { ListView, View } from "@shoutem/ui";
import firebase from "firebase";

import apiKey from "../../../api/apiKey.json";

import HeaderBack from "../../headers/HeaderBack";
import DefaultLoader from "../../preloader/DefaultLoader";
import RowCard from "../../cards/RowCard";
import BottomModal from "../../modal/BottomModal";

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
    visibleModal: false,
    titleModal: "",
    descModal: ""
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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

    const url = `https://newsapi.org/v2/sources?country=${navigation.state.params.country}&apiKey=${apiKey["api"]}`;
    let journalResp = await fetch(url);
    let journalData = await journalResp.json();

    this.setState({
      loading: false,
      journals: journalData.sources
    });
  };

  openModal = (title, description) => {
    this.setState({
      visibleModal: true,
      titleModal: title,
      descModal: description
    });
  };

  closeModal = () => {
    this.setState({
      visibleModal: false
    });
  };

  renderRow = journal => {
    const { followJournals } = this.state;
    return (
      <RowCard
        text={journal.name}
        iconName={
          followJournals.includes(journal.id) ? "heart" : "heart-outlined"
        }
        onPress={()=>this.openModal(journal.name, journal.description)}
      />
    );
  };

  renderResults = () => {
    const {
      journals,
      visibleModal,
      titleModal,
      descModal
    } = this.state;
    return (
      <View>
        <ListView data={journals} renderRow={this.renderRow} />
        <BottomModal
          isVisible={visibleModal}
          title={titleModal}
          description={descModal}
          textButton={"Follow"}
          onPressClose={this.closeModal}
        />
      </View>
    );
  };

  render() {
    return this.state.loading ? <DefaultLoader /> : this.renderResults();
  }
}

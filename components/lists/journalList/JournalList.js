import React, { Component } from "react";
import { View, FlatList } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../../../redux/actions";

import apiKey from "../../../api/apiKey.json";

import HeaderBack from "../../headers/HeaderBack";
import DefaultLoader from "../../preloader/DefaultLoader";
import RowCard from "../../cards/RowCard";
import BottomModal from "../../modal/BottomModal";

class JournalList extends Component {
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

  componentDidMount = () => {
    // await this.getFollowJournals();
    this.getJournals();
  };

  getFollowJournals = async () => {
    const { getJournalSubscriptions, journalSubscriptions } = this.props;
    await getJournalSubscriptions();

    console.log("Подписки из props", journalSubscriptions);

    let source = [];
    for (key in journalSubscriptions) {
      if (!this.state.followJournals.includes(journalSubscriptions[key])) {
        source.push(journalSubscriptions[key]);
      }
    }

    this.setState({
      followJournals: [...this.state.followJournals, ...source]
    });
  };

  getJournals = async () => {
    const { navigation } = this.props;
    this.setState({ loading: true });

    // prettier-ignore
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

  toggleSubToJournal = (name, id) => {
    this.props.journalSubscriptions[name] ?
      this.props.unsubscribeToJournal(name, id) :
      this.props.subscribeToJournal(name, id)
  };

  renderRow = journal => {
    const { journalSubscriptions } = this.props;
    return (
      <RowCard
        text={journal.item.name}
        iconName={
          journalSubscriptions[journal.item.name] ? "heart" : "heart-outlined"
        }
        onPress={() => this.openModal(journal.item.name, journal.item.description)}
        onPressIcon={() => this.toggleSubToJournal(journal.item.name, journal.item.id)}
      />
    );
  };

  renderResults = () => {
    const { journals, visibleModal, titleModal, descModal } = this.state;
    return (
      <View>
        <FlatList 
          data={journals}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.id}
        />
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
    console.log("Подписки из state", this.props.journalSubscriptions);
    return this.state.loading ? <DefaultLoader /> : this.renderResults();
  }
}

const mapStateToProps = state => {
  return {
    journalSubscriptions: state.journalSubscriptions
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JournalList);

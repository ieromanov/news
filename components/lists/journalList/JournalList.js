import React, { PureComponent } from "react";
import {
  View,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Row, Divider, Title, Icon, ListView } from "@shoutem/ui";

import apiKey from "../../../api/apiKey.json";

import HeaderBack from "../../headers/HeaderBack";

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
    wallsJSON: [],
    loading: true
  };

  componentDidMount = () => {
    this.fetchWallsJSON();
  };

  fetchWallsJSON = () => {
    const { navigation } = this.props;

    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/sources?country=${navigation.state.params.country}&apiKey=${apiKey["api"]}`;
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          loading: false,
          wallsJSON: jsonData.sources
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

  renderRow = journal => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TouchableHighlight
          onPress={() =>
            navigate("NewsList", {
              name: journal.name,
              country: journal.country,
              sources: journal.id
            })
          }
        >
          <Row styleName="small">
            <Title>{journal.name}</Title>
            <Icon name="right-arrow" />
          </Row>
        </TouchableHighlight>
        <Divider styleName="line" />
      </View>
    );
  };

  render() {
    const { wallsJSON, loading } = this.state;
    return (
      <ListView data={wallsJSON} renderRow={this.renderRow} loading={loading} />
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  touchableComponent: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    borderWidth: 0.5,
    paddingLeft: 15,
    borderColor: "#d6d7da",
    paddingVertical: 20
  },
  sourceContainer: {
    display: "flex",
    flexDirection: "row"
  },
  sourceName: {
    flex: 5,
    color: "rgba(0,0,0,0.5)"
  },
  sourceArrow: {
    marginRight: 20,
    color: "rgba(0,0,0,0.5)"
  },
  sourseArrow: {
    flex: 1
  }
});

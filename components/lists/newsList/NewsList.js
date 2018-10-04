import React, { PureComponent } from "react";
import { ListView } from "@shoutem/ui";
import firebase from "firebase";

import DefaultLoader from "../../preloader/DefaultLoader";
import Card from "../../cards/Card";

import apiKey from "../../../api/apiKey.json";

import "../../../redux/helpers/firebaseInitApp";

console.ignoredYellowBox = ["Setting a timer"];

export default class NewsList extends PureComponent {
  state = {
    news: [],
    userFollowData: "",
    loading: true,
    firstLoad: true,
    date: new Date().setDate(new Date().getDate())
  };

  componentDidMount = () => {
    this.getNews();
  };

  getNews = async () => {
    const { date, news } = this.state;

    let userID = firebase.auth().currentUser.uid;
    let database = firebase.database();
    this.setState({ loading: true });

    this.decrementDate();

    let userResponse = await database.ref("/" + userID);
    let userFollowResponse = await userResponse.once("value");
    let userFollowData = await userFollowResponse.val();

    let sources = "";
    for (key in userFollowData) {
      sources += userFollowData[key] + ",";
    }
    sources = sources.substring(0, sources.length - 1);

    const newsUrl = `https://newsapi.org/v2/everything?sources=${sources}&to=${this.formatDate(
      date
    )}&apiKey=${apiKey["api"]}`;
    let newsResponse = await fetch(newsUrl);
    let newsData = await newsResponse.json();

    if (news.length === 0) {
      this.setState({
        loading: false,
        firstLoad: false,
        news: newsData.articles
      });
    } else {
      this.setState({
        loading: false,
        news: [...news, ...newsData.articles]
      });
    }
  };

  formatDate = date => {
    let newDate = new Date(date);

    let dd = newDate.getDate();
    dd < 10 ? (dd = "0" + dd) : dd;

    let mm = newDate.getMonth() + 1;
    mm < 10 ? (mm = "0" + mm) : mm;

    let yy = newDate.getFullYear();

    return `${yy}-${mm}-${dd}`;
  };

  decrementDate = () => {
    const { date } = this.state;
    const dDate = new Date(date).setDate(new Date(date).getDate() - 1);
    this.setState({ date: dDate });
  };

  loadMoreNews = () => {
    this.getNews();
  };

  renderRow = news => {
    return (
      <Card
        url={news.url}
        image={news.urlToImage}
        title={news.title}
        description={news.description}
        metaDataLeft={news.source.name}
        metaDataRight={this.formatDate(news.publishedAt)}
        animated
      />
    );
  };

  renderResults() {
    const { news, loading } = this.state;

    return (
      <ListView
        data={news}
        renderRow={this.renderRow}
        loading={loading}
        onLoadMore={this.loadMoreNews}
      />
    );
  }

  render() {
    return this.state.firstLoad ? <DefaultLoader /> : this.renderResults();
  }
}

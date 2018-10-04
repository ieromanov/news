import React from "react";
import { Entypo } from "@expo/vector-icons";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewsScreen from "../screens/NewsScreen";

import colors from "../constants/Colors";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <Entypo size={24} name="list" color={focused ? colors.violet : colors.black} />,
  tabBarOptions: {
    showLabel: false
  }
};

const NewsStack = createStackNavigator({
  News: NewsScreen
});

NewsStack.navigationOptions = {
  tabBarLabel: "News",
  tabBarIcon: ({ focused }) => <Entypo size={24} name="news" color={focused ? colors.violet : colors.black} />,
  tabBarOptions: {
    showLabel: false
  }
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => <Entypo size={24} name="user" color={focused ? colors.violet : colors.black} />,
  tabBarOptions: {
    showLabel: false
  }
};

export default createBottomTabNavigator({
  HomeStack,
  NewsStack,
  SettingsStack
});

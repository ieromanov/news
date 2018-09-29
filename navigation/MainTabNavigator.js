import { createMaterialTopTabNavigator } from "react-navigation";

import colors from "../constants/Colors";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NewsScreen from "../screens/NewsScreen";

export default createMaterialTopTabNavigator (
  {
    Home: {
      screen: HomeScreen
    },
    News: {
      screen: NewsScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    optimizationsEnabled: true,
    tabBarPosition: "bottom",
    lazy: true,
    tabBarOptions: {
      showIcon: false,
      pressColor: colors.grey,
      upperCaseLabel: false,
      labelStyle: {
        color: colors.black,
      },
      indicatorStyle: {
        backgroundColor: colors.black
      },
      style: {
        backgroundColor: colors.white,
      }
    },
    inactiveTintColor: colors.black
  }
);

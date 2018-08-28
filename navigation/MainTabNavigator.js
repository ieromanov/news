import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import ImageScreen from '../screens/ImageScreen';
import NewsScreen from '../screens/NewsScreen';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    News: {
      screen: NewsScreen,
    },
    Image: {
      screen: ImageScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'News':
            iconName = Platform.OS === 'ios' ? `ios-paper${focused ? '' : '-outline'}` : 'md-paper';
            break;
          case 'Image':
            iconName =
              Platform.OS === 'ios' ? `ios-images${focused ? '' : '-outline'}` : 'md-images';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom', 
    tabBarOptions: {
      labelStyle: {
        color: '#000000'
      },
    },
    inactiveTintColor: '#ccc',
    animationEnabled: true,
  }
);

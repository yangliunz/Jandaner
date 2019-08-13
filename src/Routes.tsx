import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsList from './screens/NewsList';
import NewsDetail from './screens/NewsDetail';

import Pics from './screens/Pics';
import React from 'react';

const TabNavigator = createBottomTabNavigator(
  {
    NewsList: {
      screen: NewsList,
    },
    Pics: Pics,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName = '';
        switch (routeName) {
          case 'NewsList':
            iconName = 'ios-paper';
            break;
          case 'Pics':
            iconName = 'ios-photos';
            break;
          default:
            iconName = 'ios-happy'
            break;
        }

        return <Ionicons name={iconName} size={20} color={focused ? '#00f' : 'gray'} />;
      },
    }),
  }
);

const RootNav = createStackNavigator({
  TabNav: {
    screen: TabNavigator,
    navigationOptions: () => ({ header: null }),
  },
  NewsDetail: NewsDetail,
});

export default createAppContainer(RootNav);

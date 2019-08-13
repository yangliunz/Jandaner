
import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Alert
} from 'react-native'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import MasonryList from "react-native-masonry-list";
import * as JandanAPI from '../services/jandanApi';


interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  isLoading: boolean;
}


interface State { picList: string[] }

class Pics extends Component<Props, State> {

  static navigationOptions = {
    title: 'Pics',
  };

  state: State = {
    picList: []
  }

  componentDidMount() {
    JandanAPI.getPics(1).then(pics => {
      this.setState({ picList: pics });
    })
  }


  render() {
    const { picList } = this.state;
    console.log(picList.map(item => { return { node: { image: { url: item } } } }))
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <MasonryList
          itemSource={["node", "image"]}
          images={picList.map(item => { return { node: { image: { url: item } } } })} />
      </SafeAreaView>
    )
  }
}

export default Pics;

import React, { Component } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  Image,
  Dimensions,
  View,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  ScrollView,
} from 'react-navigation';

import HTMLView from 'react-native-htmlview';

import * as JandanAPI from '../services/jandanApi';
import { News } from '../types';


const { width } = Dimensions.get('window')

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State { isLoading: boolean, content: string }

class NewsDetail extends Component<Props, State> {

  static navigationOptions = {
    title: 'Detail',
  }

  state: State = {
    isLoading: true,
    content: ''
  };

  loadNewsContent = () => {
    const newsId = this.props.navigation.state.params.id;
    JandanAPI.getNewsDetail(newsId).then(arti => {
      let content = arti.post.content;
      this.setState({ content, isLoading: false });
    })
  }

  componentDidMount() {
    this.loadNewsContent()
  }

  renderLoadingView = () => {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
  }

  renderBanner = () => {
    const news = this.props.navigation.state.params as News;
    let url = undefined;
    if (news.custom_fields.thumb_c && news.custom_fields.thumb_c.length > 0) {
      url = news.custom_fields.thumb_c[0];
    }
    if (url) {
      return <Image style={{
        width: width - 20,
        height: (width - 20) / 2,
        resizeMode: 'cover',
        marginVertical: 10
      }} source={{ uri: url }} />
    }
    return <></>
  }

  renderNewsContent = (content: string) => {
    const news = this.props.navigation.state.params as News;
    return (
      <ScrollView style={{ padding: 10 }} >
        <Text style={{ color: 'darkgray', fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>{news.author.nickname} @{news.date}</Text>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{news.title}</Text>
        {this.renderBanner()}
        <HTMLView
          value={`<div>${content.replace(/(\r\n|\n|\r)/gm, "")}</div>`}
          stylesheet={{ p: { fontWeight: '300', color: '#2a2a2a' } }}
        />
        <View style={{ height: 10, width: '100%' }} />
      </ScrollView>);
  }

  render() {
    const { isLoading, content } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? this.renderLoadingView() : this.renderNewsContent(content)}
      </SafeAreaView>
    )
  }
}

export default NewsDetail;

import React, { Component } from 'react';

import { connectWithActions } from 're-reduced';
import actions from "../actions/newsActions";
import * as selectors from "../selectors/newsSelector";
import { News } from '../types/index';


import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import NewsCell from '../components/NewsCell';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  isLoading: boolean;
  newsList: News[];
  pageNum: number;
  canLoadMoreNews: boolean;
  actions: typeof actions;
}

interface State { }

class NewsList extends Component<Props, State> {

  loadMoreNews = () => {
    const { pageNum, newsList, isLoading, canLoadMoreNews } = this.props;
    const { fetchNews } = this.props.actions;
    if (!isLoading && canLoadMoreNews) {
      fetchNews(pageNum + 1);
    }
  }

  componentDidMount() {
    this.loadMoreNews();
  }

  renderNews = (newsItem: News, index: number) => {
    return <NewsCell news={newsItem} index={index} onPressItem={(item) => {
      this.props.navigation.navigate('NewsDetail', item);
    }} />
  }

  renderLoadingView = () => {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
  }

  render() {
    const { newsList, isLoading } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={newsList}
          renderItem={({ item, index }) => this.renderNews(item, index)}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            this.loadMoreNews();
          }}
          ListFooterComponent={() => isLoading ? this.renderLoadingView() : <View />
          }
        />
      </SafeAreaView>)
  }
}


const enhance = connectWithActions<Props>(actions, {
  isLoading: selectors.isFetchingNews,
  newsList: selectors.newsList,
  pageNum: selectors.pageNum,
  canLoadMoreNews: selectors.canLoadMoreNews
});

export default enhance(NewsList);
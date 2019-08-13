import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  Image
} from 'react-native';
import { News } from '../types'
import Colors from '../const/Colors';

const { width } = Dimensions.get('window')

export interface Props {
  index: number;
  news: News;
  onPressItem?: (Item: News) => void;
}


export default class NewsCell extends PureComponent<Props> {

  renderHeader = () => {
    const { news } = this.props;
    return <View style={[styles.flex]}>
      <Text style={styles.headerContent}>{news.author.nickname}</Text>
      <Text style={styles.headerContent}>{news.date}</Text>
    </View>
  }

  renderBanner = () => {
    const { news } = this.props;
    let url = undefined;
    if (news.custom_fields.thumb_c && news.custom_fields.thumb_c.length > 0) {
      url = news.custom_fields.thumb_c[0];
    }
    if (url) {
      return <Image style={styles.banner} source={{ uri: url }} />
    }
    return <></>
  }

  renderTags = () => {
    const { news, index } = this.props;
    const { tags } = news;
    let tagStr = tags.map(t => `#${t.title}`).join(', ');
    return <View>
      <Text style={styles.headerContent}>{tagStr}</Text>
    </View>
  }

  render() {
    const { news, index, onPressItem } = this.props;
    return (
      <TouchableOpacity onPress={() => {
        if (onPressItem) {
          onPressItem(news);
        }
      }}>
        <View style={[styles.cell, { backgroundColor: index % 2 == 0 ? '#fff' : '#fafafa' }]}>
          {this.renderHeader()}
          <Text style={styles.title} >{news.title}</Text>
          {this.renderBanner()}
          {this.renderTags()}
        </View>
      </TouchableOpacity>)
  }
}


let styles = StyleSheet.create({
  cell: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderColor,
  },
  flex: {
    flexDirection: "row",
    display: "flex",
    justifyContent: 'space-between'
  },
  headerContent: {
    color: Colors.AuthorColor,
    fontSize: 14,
    marginVertical: 5
  },
  title: {
    color: Colors.TextColor,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5
  },
  banner: {
    width: width - 10,
    height: (width - 10) / 2,
    resizeMode: 'cover'
  }
})

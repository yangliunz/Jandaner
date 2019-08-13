import axios from 'axios';
import { News } from '../types';
import { any } from 'prop-types';

const BASEAPI = 'http://i.jandan.net/?oxwlxojflwblxbsapi=';

function baseGetURL(url: string) {
  return axios.get(url).then(res => res.data);
}

export function getNews(page: number): Promise<News[]> {
  const apiURL = `get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=${page}&custom_fields=thumb_c,views&dev=1`;
  const finalURL = BASEAPI + apiURL;
  return baseGetURL(finalURL).then(data => data.posts);
}

export function getNewsDetail(newsId: number): Promise<any> {
  const apiURL = `get_post&id=${newsId}&include=content`;
  const finalURL = BASEAPI + apiURL;
  return baseGetURL(finalURL);
}

export function getPics(page: number): Promise<any> {
  const apiURL = `jandan.get_pic_comments&page=${page}`;
  const finalURL = BASEAPI + apiURL;
  return baseGetURL(finalURL)
    .then(res => res.comments)
    .then(comments => comments.map((cmt: any) => cmt.pics[0]));
}

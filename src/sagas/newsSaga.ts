import { takeLatest, all } from 'redux-saga/effects';
import newsActions from '../actions/newsActions';
import * as JandanAPI from '../services/jandanApi';

import { apiWorkerFactory } from 're-reduced';
import { News } from '../types';

export const fetchNews = apiWorkerFactory<News[], number>(
  newsActions.fetchNews,
  JandanAPI.getNews
);

export default function* sagaWatcher() {
  yield all([takeLatest(newsActions.fetchNews.type, fetchNews)]);
}

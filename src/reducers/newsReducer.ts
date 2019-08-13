import { combineReducers } from 'redux';
import { createReducer, match } from 're-reduced';
import newsActions from '../actions/newsActions';
import { NewsState, News } from '../types';

const INITIAL_STATE: NewsState = {
  isFetchingNews: false,
  currentPageNum: 0,
  newsList: [],
};

const isFetchingNews = createReducer<boolean>(
  [
    match(newsActions.fetchNews.request, () => true),
    match(
      [newsActions.fetchNews.success, newsActions.fetchNews.failure],
      () => false
    ),
  ],
  INITIAL_STATE.isFetchingNews
);
const newsList = createReducer<News[]>(
  [
    match(newsActions.fetchNews.success, (state, dItem) => [
      ...state,
      ...dItem,
    ]),
  ],
  INITIAL_STATE.newsList
);

const currentPageNum = createReducer<number>(
  [match(newsActions.fetchNews.success, (state, _) => state + 1)],
  INITIAL_STATE.currentPageNum
);

export default combineReducers<NewsState>({
  isFetchingNews,
  currentPageNum,
  newsList,
});

const MAX_NEWS_PAGE_NUM = 100;

export const isFetchingNews = (state: any) => state.news.isFetchingNews;
export const newsList = (state: any) => state.news.newsList;
export const pageNum = (state: any) => state.news.currentPageNum;
export const canLoadMoreNews = (state: any) =>
  state.news.currentPageNum < MAX_NEWS_PAGE_NUM;

export interface Destination {
  id: string;
  mainText: string;
  sectionaryText: string;
  location?: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Tag {
  id: number;
  slug: string;
  title: string;
  description: string;
  post_count: number;
}

export interface Author {
  id: number;
  slug: string;
  nickname: string;
  url: string;
  description: string;
}

export interface News {
  id: number;
  url: string;
  title: string;
  date: string;
  tags: Tag[];
  author: Author;
  custom_fields: any;
}

export interface State {
  isFetching: boolean;
}
export interface NewsState {
  isFetchingNews: boolean;
  currentPageNum: number;
  newsList: News[];
}

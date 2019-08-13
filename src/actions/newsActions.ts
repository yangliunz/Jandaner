import { createActions } from 're-reduced';
import { News } from '../types';

export default createActions('NEWS', create => ({
  fetchNews: create.asyncAction<News[], number>(),
}));

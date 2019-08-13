import { createActions } from 're-reduced';
import { Destination } from '../types';

export default createActions('DESTINATIONS', create => ({
  fetch: create.asyncAction<Destination[]>(),
  add: create.asyncAction<Destination, Destination>(),
  delete: create.asyncAction<Destination, Destination>(),
}));

import newActions from './newsActions';

export { newActions };

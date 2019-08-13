import { all, fork } from 'redux-saga/effects';
import newsSaga from './newsSaga';
export default function* sagaWatcher() {
  yield all([, fork(newsSaga)]);
}

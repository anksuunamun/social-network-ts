import {all} from 'redux-saga/effects';
import {watchGetUSerProfile} from "../Profile-reducer";

export default function* rootSaga() {
  yield all([
    watchGetUSerProfile(),
  ]);
};
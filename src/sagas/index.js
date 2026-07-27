import { takeLatest } from 'redux-saga/effects';

import ACTION_TYPES from '../store/actions/actionTypes';
import { addContactSaga, getContactsSaga } from './contactSaga';

function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_CONTACTS_ACTION, getContactsSaga);
  yield takeLatest(ACTION_TYPES.ADD_CONTACT_ACTION, addContactSaga);
}
export default rootSaga;

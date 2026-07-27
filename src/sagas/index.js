import { takeLatest } from 'redux-saga/effects';

import ACTION_TYPES from '../store/actions/actionTypes';
import {
  addContactSaga,
  deleteContactSaga,
  getContactsSaga,
  updateContactSaga,
} from './contactSaga';

function* rootSaga() {
  yield takeLatest(ACTION_TYPES.GET_CONTACTS_ACTION, getContactsSaga);
  yield takeLatest(ACTION_TYPES.ADD_CONTACT_ACTION, addContactSaga);
  yield takeLatest(ACTION_TYPES.DELETE_CONTACT_ACTION, deleteContactSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_CONTACT_ACTION, updateContactSaga);
}
export default rootSaga;

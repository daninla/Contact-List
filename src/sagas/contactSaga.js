import { call, put } from 'redux-saga/effects';

import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from '../api/contactsApi';
import {
  addContactError,
  addContactRequest,
  addContactSuccess,
  deleteContactError,
  deleteContactRequest,
  deleteContactSuccess,
  getContactsError,
  getContactsRequest,
  getContactsSuccess,
  updateContactError,
  updateContactRequest,
  updateContactSuccess,
} from '../store/actions/contactActions';

// ---- Get contacts ----
export function* getContactsSaga() {
  yield put(getContactsRequest());
  try {
    const contacts = yield call(getContacts);
    yield put(getContactsSuccess(contacts));
  } catch (error) {
    yield put(getContactsError(error.message));
  }
}

// ---- Add contact ----
export function* addContactSaga(action) {
  yield put(addContactRequest());
  try {
    const contact = yield call(addContact, action.payload);
    yield put(addContactSuccess(contact));
  } catch (error) {
    yield put(addContactError(error.message));
  }
}

// ---- Update contact ----
export function* updateContactSaga(action) {
  yield put(updateContactRequest());
  try {
    const contact = yield call(updateContact, action.payload);
    yield put(updateContactSuccess(contact));
  } catch (error) {
    yield put(updateContactError(error.message));
  }
}

// ---- Delete contact ----
export function* deleteContactSaga(action) {
  yield put(deleteContactRequest());
  try {
    yield call(deleteContact, action.payload);
    yield put(deleteContactSuccess(action.payload));
  } catch (error) {
    yield put(deleteContactError(error.message));
  }
}

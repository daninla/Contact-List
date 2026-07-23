import * as types from '../../constans';

export const fetchContactsSuccess = (contacts) => ({
  type: types.FETCH_CONTACTS,
  payload: contacts,
});

export const addContactSuccess = (contact) => ({
  type: types.ADD_CONTACT,
  payload: contact,
});

export const updateContactSuccess = (contact) => ({
  type: types.UPDATE_CONTACT,
  payload: contact,
});

export const deleteContactSuccess = (id) => ({
  type: types.DELETE_CONTACT,
  payload: id,
});

export const selectContact = (contact) => ({
  type: types.SELECT_CONTACT,
  payload: contact,
});

export const clearCurrentContact = () => ({
  type: types.CLEAR_CURRENT_CONTACT,
});

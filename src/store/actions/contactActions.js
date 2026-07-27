import types from './actionTypes';

// ---- Fetch contacts ----
export const getContactsAction = () => ({
  type: types.GET_CONTACTS_ACTION,
});

export const getContactsRequest = () => ({
  type: types.GET_CONTACTS_REQUEST,
});

export const getContactsSuccess = (contacts) => ({
  type: types.GET_CONTACTS_SUCCESS,
  payload: contacts,
});

export const getContactsError = (error) => ({
  type: types.GET_CONTACTS_ERROR,
  payload: error,
});

// ---- Add contact ----
export const addContactAction = (contact) => ({
  type: types.ADD_CONTACT_ACTION,
  payload: contact,
});

export const addContactRequest = () => ({
  type: types.ADD_CONTACT_REQUEST,
});

export const addContactSuccess = (contact) => ({
  type: types.ADD_CONTACT_SUCCESS,
  payload: contact,
});

export const addContactError = (error) => ({
  type: types.ADD_CONTACT_ERROR,
  payload: error,
});

// ---- Update contact ----
export const updateContactAction = (contact) => ({
  type: types.UPDATE_CONTACT_ACTION,
  payload: contact,
});

export const updateContactRequest = () => ({
  type: types.UPDATE_CONTACT_REQUEST,
});

export const updateContactSuccess = (contact) => ({
  type: types.UPDATE_CONTACT_SUCCESS,
  payload: contact,
});

export const updateContactError = (error) => ({
  type: types.UPDATE_CONTACT_ERROR,
  payload: error,
});

// ---- Delete contact ----
export const deleteContactAction = (id) => ({
  type: types.DELETE_CONTACT_ACTION,
  payload: id,
});

export const deleteContactRequest = () => ({
  type: types.DELETE_CONTACT_REQUEST,
});

export const deleteContactSuccess = (id) => ({
  type: types.DELETE_CONTACT_SUCCESS,
  payload: id,
});

export const deleteContactError = (error) => ({
  type: types.DELETE_CONTACT_ERROR,
  payload: error,
});

// ---- Синхронные экшены ----
export const selectContact = (contact) => ({
  type: types.SELECT_CONTACT,
  payload: contact,
});

export const clearCurrentContact = () => ({
  type: types.CLEAR_CURRENT_CONTACT,
});

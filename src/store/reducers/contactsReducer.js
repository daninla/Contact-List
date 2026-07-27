import { EMPTY_CONTACT } from '../../model/contact';
import types from '../actions/actionTypes';

const initialState = {
  contacts: [],
  currentContact: { ...EMPTY_CONTACT },
  isFetching: false,
  error: null,
};

export default function contactsReducer(state = initialState, { type, payload }) {
  switch (type) {
    // ---- Get contacts ----
    case types.GET_CONTACTS_REQUEST:
      return { ...state, isFetching: true, error: null };

    case types.GET_CONTACTS_SUCCESS:
      return { ...state, isFetching: false, contacts: payload };

    case types.GET_CONTACTS_ERROR:
      return { ...state, isFetching: false, error: payload };

    // ---- Add contact ----
    case types.ADD_CONTACT_REQUEST:
      return { ...state, isFetching: true, error: null };

    case types.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        contacts: [...state.contacts, payload],
      };

    case types.ADD_CONTACT_ERROR:
      return { ...state, isFetching: false, error: payload };

    // ---- Update contact ----
    case types.UPDATE_CONTACT_REQUEST:
      return { ...state, isFetching: true, error: null };

    case types.UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        contacts: state.contacts.map((c) => (c.id === payload.id ? payload : c)),
        currentContact: { ...EMPTY_CONTACT },
      };

    case types.UPDATE_CONTACT_ERROR:
      return { ...state, isFetching: false, error: payload };

    // ---- Delete contact ----
    case types.DELETE_CONTACT_REQUEST:
      return { ...state, isFetching: true, error: null };

    case types.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        contacts: state.contacts.filter((c) => c.id !== payload),
        currentContact: { ...EMPTY_CONTACT },
      };

    case types.DELETE_CONTACT_ERROR:
      return { ...state, isFetching: false, error: payload };

    // ---- Синхронные экшены ----
    case types.SELECT_CONTACT:
      return { ...state, currentContact: { ...payload } };

    case types.CLEAR_CURRENT_CONTACT:
      return { ...state, currentContact: { ...EMPTY_CONTACT } };

    default:
      return state;
  }
}
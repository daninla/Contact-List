import * as types from '../../constans';
import { EMPTY_CONTACT } from '../../model/contact';

const initialState = {
  contacts: [],
  currentContact: { ...EMPTY_CONTACT },
};

export default function contactsReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case types.FETCH_CONTACTS:
      return { ...state, contacts: payload };

    case types.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, payload] };

    case types.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === payload.id ? payload : c,
        ),
        currentContact: { ...EMPTY_CONTACT },
      };

    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== payload),
        currentContact: { ...EMPTY_CONTACT },
      };

    case types.SELECT_CONTACT:
      return { ...state, currentContact: { ...payload } };

    case types.CLEAR_CURRENT_CONTACT:
      return { ...state, currentContact: { ...EMPTY_CONTACT } };

    default:
      return state;
  }
}

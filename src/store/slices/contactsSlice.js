import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../api/contact-service';
import { CONTACTS_SLICE_NAME } from '../../constans';
import { EMPTY_CONTACT } from '../../model/contact';

const initialState = {
  contacts: [],
  currentContact: { ...EMPTY_CONTACT },
  successEditCont: false,
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  `${CONTACTS_SLICE_NAME}/getContacts`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${CONTACTS_SLICE_NAME}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeContact = createAsyncThunk(
  `${CONTACTS_SLICE_NAME}/deleteContact`,
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${CONTACTS_SLICE_NAME}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editContact = createAsyncThunk(
  `${CONTACTS_SLICE_NAME}/editContact`,
  async (contact, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/${CONTACTS_SLICE_NAME}/${contact.id}`,
        contact,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addContact = createAsyncThunk(
  `${CONTACTS_SLICE_NAME}/addContact`,
  async (contact, { rejectWithValue }) => {
    try {
      const response = await api.post(`${CONTACTS_SLICE_NAME}`, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const setPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const resetCurrentContact = () => ({ ...EMPTY_CONTACT });

const contactsSlice = createSlice({
  name: CONTACTS_SLICE_NAME,
  initialState,
  reducers: {
    selectContact(state, { payload }) {
      state.currentContact = payload;
      state.successEditCont = false;
    },

    clearCurrentContact(state) {
      state.currentContact = resetCurrentContact();
      state.successEditCont = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, setPending)
      .addCase(addContact.pending, setPending)
      .addCase(removeContact.pending, setPending)

      .addCase(fetchContacts.rejected, setRejected)
      .addCase(addContact.rejected, setRejected)
      .addCase(editContact.rejected, setRejected)
      .addCase(removeContact.rejected, setRejected)
      .addCase(editContact.pending, (state) => {
        state.successEditCont = false;
      })

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.isLoading = false;
      })

      .addCase(editContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact,
        );
        state.successEditCont = true;
        state.isLoading = false;
      })

      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );

        state.currentContact = resetCurrentContact();
        state.isLoading = false;
      });
  },
});

export const { selectContact, clearCurrentContact, hideElement } =
  contactsSlice.actions;

export default contactsSlice.reducer;

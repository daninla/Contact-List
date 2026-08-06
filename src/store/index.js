import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import contactsApi from './services/contactsApi';

const logger = createLogger();

export default configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware).concat(logger),
});

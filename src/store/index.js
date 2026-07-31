import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import contactsReducer from './slices/contactsSlice';

const logger = createLogger();

export default configureStore({
  reducer: {
    contactsList: contactsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

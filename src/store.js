import axios from 'axios';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import * as api from './config';
import { ThemeReducer } from './features/theme/theme-slice';

export const store = configureStore({
  reducer: { theme: ThemeReducer },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});

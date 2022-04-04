import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { appSlice } from './AppSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  
  
  // This only concerns Chrome extension: Redux dev tool:
  // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  devTools: {
    trace: true,
  }
});

export type RootState = ReturnType<typeof store.getState>;

import {PayloadAction, asyncThunkCreator, buildCreateSlice, configureStore, createSlice} from '@reduxjs/toolkit';
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const createAppSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator}
});

const moodScaleSlice = createAppSlice({
  name: 'MoodScale',
  initialState: null as null | number,
  reducers: (create) => ({
    pull: create.asyncThunk(
      async (state) => {},
    ),
    {
      pending: (state) => {
        state.loading = true;
      },
      rejected: (state, action) => {
        state.error = action.payload ?? action.error;
      },
      fulfilled: (state, action) => {
        state.
      }
    }
    push: (state) => {
      
    }
  }),
})

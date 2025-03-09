import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
  configureStore,
  createSlice,
} from '@reduxjs/toolkit';
import {diaryApi, activeDiaryEntryDateSlice} from '@/services/diary-api';

export const store = configureStore({
  reducer: {
    [diaryApi.reducerPath]: diaryApi.reducer,
    activeDiaryEntryDate: activeDiaryEntryDateSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(diaryApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const createAppSlice = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator},
});

/*
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
*/

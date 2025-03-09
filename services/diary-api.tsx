import {createSlice} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {eq} from 'drizzle-orm';
import {db} from '@/db';
import {diaryEntries} from '@/db/schema/diary-entries';

export interface ActiveDiaryEntry extends DiaryEntry {
  entryDate: string;
}

export interface DiaryEntry {
  moodRating: number;
}

export const diaryApi = createApi({
  reducerPath: 'diaryApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: build => ({
    getDiaryEntry: build.query<ActiveDiaryEntry, string>({
      queryFn: async entryDate => {
        try {
          return {
            data: {
              entryDate,
              ...(
                await db
                  .select()
                  .from(diaryEntries)
                  .where(eq(diaryEntries.entryDate, entryDate))
              )[0],
            },
          };
        } catch (e) {
          return {error: e};
        }
      },
    }),
    getActiveDiaryEntry: build.query<ActiveDiaryEntry, void>({
      queryFn: async arg => {
        return {data: {date: '2025-01-02'}};
      },
    }),
    saveDiaryEntry: build.mutation({
      queryFn: async diaryEntry => {
        const {date: entryDate, ...diaryEntryNoDate} = diaryEntry;
        try {
          db.insert(diaryEntries).values(diaryEntry).onConflictDoUpdate({
            target: diaryEntry.entryDate,
            set: diaryEntryNoDate,
          });
        } catch (e) {
          return {error: e};
        }
      },
    }),
  }),
});

export const {useGetDiaryEntryQuery, useGetActiveDiaryEntryQuery} = diaryApi;

export const activeDiaryEntryDateSlice = createSlice({
  name: 'activeDiaryEntryDate',
  initialState: new Date().toISOString().split('T')[0],
  reducers: {
    switchToDate: (state, action) => {
      state = action.payload;
    },
  },
});

export const {switchToDate: switchActiveDiaryEntryDate} =
  activeDiaryEntryDateSlice.actions;

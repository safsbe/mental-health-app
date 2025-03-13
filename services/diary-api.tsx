import {createSlice} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {eq, inArray} from 'drizzle-orm';
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
  tagTypes: ['diaryEntry'],
  endpoints: build => ({
    getDiaryEntry: build.query<ActiveDiaryEntry, string>({
      queryFn: async (entryDate: string) => {
        try {
          return {
            data: (
              await db
                .select()
                .from(diaryEntries)
                .where(eq(diaryEntries.entryDate, entryDate))
            )[0],
          };
        } catch (e) {
          return {error: e};
        }
      },
      providesTags: ['diaryEntry'],
    }),
    // TODO: Remove this.
    getActiveDiaryEntry: build.query<ActiveDiaryEntry, void>({
      queryFn: async arg => {
        return {data: {entryDate: '2025-01-02'}};
      },
    }),
    saveDiaryEntry: build.mutation({
      queryFn: async (diaryEntry: ActiveDiaryEntry) => {
        const {entryDate, ...diaryEntryNoDate} = diaryEntry;
        const insertValue = {
          ...diaryEntry,
          updatedOn: new Date().toISOString().split('T')[0]}
        try {
          await db
            .insert(diaryEntries)
            .values(insertValue)
            .onConflictDoUpdate({
              target: diaryEntries.entryDate,
              set: diaryEntryNoDate,
            });
          return {data: insertValue};
        } catch (e) {
          return {error: e};
        }
      },
      invalidatesTags: ['diaryEntry'],
    }),
    getDiaryEntryMood: build.query<number, string | undefined>({
      queryFn: async (entryDate: string = new Date().toISOString().split('T')[0]) => {
        try {
          return {
            data: (
              await db
                .select({moodRating: diaryEntries.moodRating})
                .from(diaryEntries)
                .where(eq(diaryEntries.entryDate, entryDate))
            )[0]?.moodRating || 0,
          };
        } catch(e) {
          return {
            error: e,
          };
        }
      },
      providesTags: ['diaryEntry'],
    }),
    getDiaryDashboardValues: build.query<{moodRating: string[]}, {weekStartDate: string}>({
      queryFn: async ({weekStartDate}) => {
        try {
          const moodRating = (await db
            .select({moodRating: diaryEntries.moodRating})
            .from(diaryEntries)
            .where(
              inArray(
                diaryEntries.entryDate,
                [
                  weekStartDate,
//                  weekStartDate++,
//                  weekStartDate++,
//                  weekStartDate++,
//                  weekStartDate++,
//                  weekStartDate++,
//                  weekStartDate++,
                ]))).map(x => x.moodRating || 0);
          return {
            data: {
              moodRating,
            }
          }
        }
      },
    }),
  }),
});

export const {
  useGetDiaryEntryQuery,
  useGetActiveDiaryEntryQuery,
  useGetDiaryEntryMoodQuery,
  useSaveDiaryEntryMoodMutation,
  useSaveDiaryEntryMutation,
} = diaryApi;

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

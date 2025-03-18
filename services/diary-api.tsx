import {createSlice} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {format, differenceInCalendarDays, addDays} from 'date-fns';
import {and, eq, lte, gte} from 'drizzle-orm';
import {db} from '@/db';
import {DiaryEntries, DiaryEntryListItems, DiaryEntryListTypes} from '@/db/schema/diary-entries';

interface DiaryEntryList {
  id: number,
  body: string,
}

interface DiaryEntryLists {
  momentBest: DiaryEntryList[],
  momentWorst: DiaryEntryList[],
  significantEvents: DiaryEntryList[],
  whatHappened: DiaryEntryList[],
  medicineTaken: DiaryEntryList[],
  tags: DiaryEntryList[],
}

function generateISODatesBetween(startDate: string, endDate: string): string[] {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const daysArray: string[] = [];
  
  daysArray.push(startDate);
  for (let days=1; days<=differenceInCalendarDays(endDateObj, startDateObj); days++)
    daysArray.push(format(addDays(startDateObj, days), 'yyyy-MM-dd'));
  return daysArray
}

export interface ActiveDiaryEntry {
  entryDate: string;
  moodRating: number;
  sleepRating: number;
}

export const diaryApi = createApi({
  reducerPath: 'diaryApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  tagTypes: [
    'diaryEntry',
    'diaryEntryMoodRating',
    'diaryEntrySleepRating',
  ],
  endpoints: build => ({
    getDiaryEntry: build.query<ActiveDiaryEntry, string|undefined>({
      queryFn: async (entryDate = format(new Date(), 'yyyy-MM-dd')) => {
        try {
          return {
            data: (
              await db
                .select()
                .from(DiaryEntries)
                .where(eq(DiaryEntries.entryDate, entryDate))
                .limit(1)
            )[0],
          };
        } catch (e) {
          return {error: e};
        }
      },
      providesTags: ['diaryEntry'],
    }),
    saveDiaryEntry: build.mutation({
      queryFn: async (diaryEntry: ActiveDiaryEntry) => {
        const {entryDate, ...diaryEntryNoDate} = diaryEntry;
        const insertValue = {
          ...diaryEntry,
          updatedOn: new Date().toISOString()}
        try {
          await db
            .insert(DiaryEntries)
            .values(insertValue)
            .onConflictDoUpdate({
              target: DiaryEntries.entryDate,
              set: diaryEntryNoDate,
            });
          return {data: insertValue};
        } catch (error) {
          return {error};
        }
      },
      invalidatesTags: [
        'diaryEntry',
        'diaryEntryMoodRating',
        'diaryEntrySleepRating',
      ],
    }),
    getDiaryEntryMoodRating: build.query<number|null, string|undefined>({
      queryFn: async (entryDate: string = format(new Date(), 'yyyy-MM-dd')) => {
        try {
          return {
            data: (
              await db
                .select({moodRating: DiaryEntries.moodRating})
                .from(DiaryEntries)
                .where(eq(DiaryEntries.entryDate, entryDate))
                .limit(1)
            )[0]?.moodRating || null,
          };
        } catch(error) {
          return {error};
        }
      },
      providesTags: ['diaryEntryMoodRating'],
    }),
    saveDiaryEntryMoodRating: build.mutation<{}, {moodRating: number, entryDate: string|undefined}>({
      queryFn: async ({moodRating, entryDate = format(new Date(), 'yyyy-MM-dd')}) => {
        try {
          await db
            .insert(DiaryEntries)
            .values({
              entryDate,
              moodRating,
              updatedOn: new Date().toISOString(),
            })
            .onConflictDoUpdate({
              target: DiaryEntries.entryDate,
              set: {moodRating},
            });
          return {data: {}};
        } catch (error) {
          return {error};
        }
      },
      invalidatesTags: ['diaryEntryMoodRating'],
    }),
    getDiaryEntryMoodRating7Days: build.query<(number|null)[], string|undefined>({
      queryFn: async (lastEntryDate: string = format(new Date(), 'yyyy-MM-dd')) => {
        const firstEntryDateObj = new Date(lastEntryDate);
        firstEntryDateObj.setDate(firstEntryDateObj.getDate() - 6);
        const firstEntryDate = format(firstEntryDateObj, 'yyyy-MM-dd');
        const entryDates = generateISODatesBetween(firstEntryDate, lastEntryDate);
        
        try {
          return {
            data: (
              await db
                .select({
                  entryDate: DiaryEntries.entryDate,
                  moodRating: DiaryEntries.moodRating,
                })
                .from(DiaryEntries)
                .where(and(
                  lte(DiaryEntries.entryDate, lastEntryDate),
                  gte(DiaryEntries.entryDate, firstEntryDate),
                ))
                .limit(7)
                .then(dbReturns => entryDates.map(entryDate => dbReturns?.find(x => x.entryDate === entryDate)?.moodRating || null))
            ),
          }
        } catch(error) {
          return {error}
        }
      },
      providesTags: ['diaryEntryMoodRating'],
    }),
    saveDiaryEntrySleepRating: build.mutation<{},{entryDate?: string, sleepRating: number | null}>({
      queryFn: async ({entryDate = format(new Date(), 'yyyy-MM-dd'), sleepRating}) => {
        const insertValue = {
          entryDate,
          sleepRating,
          updatedOn: format(new Date(), 'yyyy-MM-dd'),
        };
        
        try {
          await db
            .insert(DiaryEntries)
            .values(insertValue)
            .onConflictDoUpdate({
              target: DiaryEntries.entryDate,
              set: insertValue,
            });
          return {data: insertValue};
        } catch(error) {
          return {error};
        }
      },
      invalidatesTags: ['diaryEntrySleepRating']
    }),
    getDiaryEntrySleepRating: build.query<number|null, string|undefined>({
      queryFn: async (entryDate = format(new Date(), 'yyyy-MM-dd')) => {
        try {
          return (await db
            .select({sleepRating: DiaryEntries.sleepRating})
            .from(DiaryEntries)
            .where(eq(DiaryEntries.entryDate, entryDate))
            .limit(1))[0]?.sleepRating || null;
        } catch(error) {
          return {error};
        }
      },
      providesTags: ['diaryEntrySleepRating'],
    }),
    getDiaryEntrySleepRating7Days: build.query<(number|null)[], string|undefined>({
      queryFn: async (lastEntryDate: string = format(new Date(), 'yyyy-MM-dd')) => {
        const firstEntryDateObj = new Date(lastEntryDate);
        firstEntryDateObj.setDate(firstEntryDateObj.getDate() - 6);
        const firstEntryDate = format(firstEntryDateObj, 'yyyy-MM-dd');
        const entryDates = generateISODatesBetween(firstEntryDate, lastEntryDate);
        
        try {
          return {
            data: (
              await db
                .select({
                  entryDate: DiaryEntries.entryDate,
                  sleepRating: DiaryEntries.sleepRating,
                })
                .from(DiaryEntries)
                .where(and(
                  lte(DiaryEntries.entryDate, lastEntryDate),
                  gte(DiaryEntries.entryDate, firstEntryDate),
                ))
                .then(dbReturns => entryDates.map(entryDate => dbReturns?.find(x => x.entryDate === entryDate)?.sleepRating || null))
            ),
          }
        } catch(error) {
          return {error}
        }
      },
      providesTags: ['diaryEntryMoodRating'],
    }),
    getDiaryEntryExtended: build.query<{}, string>({
      queryFn: async entryDate => {
        try {
          const [diaryEntryResult, diaryMomentResult] = await Promise.allSettled([
            db
              .select({
                entryDate: DiaryEntries.entryDate,
                updatedOn: DiaryEntries.updatedOn,
                moodRating: DiaryEntries.moodRating,
                sleepRating: DiaryEntries.sleepRating,
                sleepStart: DiaryEntries.sleepStart,
                sleepEnd: DiaryEntries.sleepEnd,
                awokenCount: DiaryEntries.awokenCount,
                napCount: DiaryEntries.napCount,
                napDuration: DiaryEntries.napDuration,
              })
              .from(DiaryEntries)
              .where(eq(DiaryEntries.entryDate, entryDate))
              .limit(1).then(x => x[0]),
            db
              .select({
                entryDate: DiaryEntryListItems.entryId,
                id: DiaryEntryListItems.id,
                type: DiaryEntryListItems.type,
                body: DiaryEntryListItems.body,
              })
              .from(DiaryEntryListItems)
              .where(eq(DiaryEntryListItems.entryId, entryDate))
              .then(x => x.reduce<DiaryEntryLists>((pV, cV, i) => {
                const data: DiaryEntryList = {id: cV.id, body: cV.body};
                switch (cV.type) {
                  case DiaryEntryListTypes.MOMENT_BEST:
                    pV.momentBest.push(data);
                    break;
                  case DiaryEntryListTypes.MOMENT_WORST:
                    pV.momentWorst.push(data);
                    break;
                  case DiaryEntryListTypes.EVENT_SIGNIFICANT:
                    pV.significantEvents.push(data);
                    break;
                  case DiaryEntryListTypes.WHAT_HAPPENED:
                    pV.whatHappened.push(data);
                    break;
                  case DiaryEntryListTypes.MEDICINE_TAKEN:
                    pV.medicineTaken.push(data);
                    break;
                  case DiaryEntryListTypes.TAGS:
                    pV.tags.push(data);
                    break;
                }
                return pV;
              }, {
                momentBest: [],
                momentWorst: [],
                significantEvents: [],
                whatHappened: [],
                medicineTaken: [],
                tags: [],
              })),
          ]);
          return {
            data: {
              ...diaryEntryResult,
              ...diaryMomentResult,
            },
          };
        } catch(error) {
          return {error};
        }
      },
      providesTags: ['diaryEntry']
    }),
  }),
});

export const {
  useGetDiaryEntryQuery,
  useGetDiaryEntryMoodRating7DaysQuery,
  useGetDiaryEntryMoodRatingQuery,
  useSaveDiaryEntryMoodRatingMutation,
  useGetDiaryEntrySleepRating7DaysQuery,
  useGetDiaryEntrySleepRatingQuery,
  useSaveDiaryEntrySleepRatingMutation,
  useSaveDiaryEntryMutation,
} = diaryApi;

export const activeDiaryEntryDateSlice = createSlice({
  name: 'activeDiaryEntryDate',
  initialState: format(new Date(), 'yyyy-MM-dd'),
  reducers: {
    switchToDate: (state, action) => {
      return action.payload;
    },
  },
}); 

export const {switchToDate: switchActiveDiaryEntryDate} =
  activeDiaryEntryDateSlice.actions;

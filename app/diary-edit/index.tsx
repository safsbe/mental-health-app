import {PropsWithChildren, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSegments} from 'expo-router';
import {
  Group,
  Section,
  TextInputDesign,
  TextBoxDesign,
  SleepDurationInput,
  NumberInputComponent,
} from '@/components/diary';
import MoodScale from '@/components/MoodScale';
import {
  ActiveDiaryEntry as ActiveEntry,
  useGetActiveDiaryEntryQuery,
  useGetDiaryEntryQuery,
} from '@/services/diary-api';
import {RootState} from '@/utils/store';

// Styles

const styles = StyleSheet.create({
  root: {
    marginTop: 15,
  },
  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

// Main function

const defaultDiaryData = {
  moodRating: 3,
  SignificantEvents: ['Ur mom'],
  BestMoment: [],
  WorstMoment: [],
  WhatHappened: [],
  NumberOfWakings: 0,
  MedicineTaken: [],
  AlcoholCaffeinetaken: [],
  NumberOfNaps: 0,
};

export default function DiaryEdit() {
  const [workingEntry, setWorkingEntry] = useState<ActiveEntry>();
  const activeEntryDate = useSelector(
    (state: RootState) => state.activeDiaryEntryDate,
  );
  const dispatch = useDispatch();

  const {
    data: activeEntryData,
    error: activeEntryError,
    isLoading: activeEntryIsLoading,
  } = useGetDiaryEntryQuery(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (activeEntryError) {
      console.error('Failed to load active diary entry');
      return;
    }
    setWorkingEntry(activeEntryData);
  }, [activeEntryIsLoading]);

  useEffect(() => {
    console.log('workingEntryUpdate: ' + JSON.stringify(workingEntry));
  }, [workingEntry]);

  // useStates

  const [diaryData, setDiaryData] = useState(defaultDiaryData);

  // handle Callbacks

  useEffect(() => {
    setDiaryData(defaultDiaryData);
  }, []);

  useEffect(() => {
    console.log('diaryData:', diaryData);
  }, [diaryData]);

  const handleTextBoxDesignCallBack = ({
    title,
    text,
  }: {
    title: string;
    text: string;
  }) => {
    var data = diaryData;

    // sort data to make sure theres no value
    var filteredData = data.title.filter(x => x !== text);

    data.title = filteredData;

    setDiaryData(data);

    console.log('attempted deleting', title, text);
  };

  const handleTextInputDesignCallBack = ({
    title,
    text,
  }: {
    title: string;
    text: string;
  }) => {
    var data = diaryData;

    if (data[title].indexOf(text) === -1) {
      // this text under this title isnt in data
      data[title].push(text);
    }

    setDiaryData(data);

    console.log('attempted adding', title, text);
  };

  const handleNumberInputComponentCallBack = ({
    title,
    number,
  }: {
    title: string;
    number: number;
  }) => {
    console.log('handleNumberInputComponent', title, number);
  };

  // Processing all the useStates and callbacks together

  if (activeEntryIsLoading) {
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  } else if (activeEntryError) {
    return (
      <ScrollView>
        <Text>Error loading diary entry.</Text>
        <Text>{JSON.stringify(activeEntryError, undefined, 4)}</Text>
      </ScrollView>
    );
  } else if (workingEntry) {
    return (
      <ScrollView style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{workingEntry.entryDate}</Text>
        </View>
        <Group title="Mood Board">
          <Section title="Emotion">
            {/* <Text>Mood: {workingEntry?.moodRating}</Text> */}
            <MoodScale
              currentMood={workingEntry?.moodRating}
              onSelectMood={i =>
                setWorkingEntry({...workingEntry, moodRating: i})
              }
            />
          </Section>
          <Section title="Significant Events">
            <TextInputDesign
              title="SignificantEvents"
              callBack={handleTextInputDesignCallBack}
            />
            <TextBoxDesign
              displayText="test"
              title="SignificantEvents"
              callBack={handleTextBoxDesignCallBack}
            />
          </Section>
          <Section title="Best Moment">
            <TextInputDesign
              title="BestMoment"
              callBack={handleTextInputDesignCallBack}
            />
            <TextBoxDesign
              displayText="entry text"
              title="BestMoment"
              callBack={handleTextBoxDesignCallBack}
            />
          </Section>
          <Section title="Worst Moment">
            <TextInputDesign
              title="WorstMoment"
              callBack={handleTextInputDesignCallBack}
            />
          </Section>
          <Section title="What Happened">
            <TextInputDesign
              title="WhatHappened"
              callBack={handleTextInputDesignCallBack}
            />
          </Section>
        </Group>
        <Group title="Sleep Board">
          <Section title="How rested do you feel?">
            {/* <Text>Mood: {workingEntry?.moodRating}</Text> */}
            <MoodScale
              currentMood={workingEntry?.moodRating}
              onSelectMood={i =>
                setWorkingEntry({...workingEntry, moodRating: i})
              }
            />
          </Section>
          <Section title="Sleep Duration" titleRight={<Text>10 hours</Text>}>
            <SleepDurationInput />
          </Section>
          <Section
            title="Number of Wakings"
            titleRight={
              <NumberInputComponent
                title="NumberOfWakings"
                callBack={handleNumberInputComponentCallBack}
              />
            }
          ></Section>
          <Section title="Medicine Taken">
            <TextInputDesign
              title="MedicineTaken"
              callBack={handleTextInputDesignCallBack}
            />
          </Section>
          <Section title="Alcohol / Caffeine Taken">
            <TextInputDesign
              title="AlcoholCaffeineTaken"
              callBack={handleTextInputDesignCallBack}
            />
          </Section>
          <Section
            title="Number of Naps"
            titleRight={
              <NumberInputComponent
                title="NumberOfNaps"
                callBack={handleNumberInputComponentCallBack}
              />
            }
          ></Section>
          <Section
            title="Total Duration of Naps"
            titleRight={
              <View
                style={{display: 'flex', flex: 1, flexDirection: 'row', gap: 5}}
              >
                <NumberInputComponent
                  title="TotalNapDuration"
                  callBack={handleNumberInputComponentCallBack}
                />
                <Text style={{height: '100%', paddingTop: 8, fontSize: 16}}>
                  Hrs
                </Text>
              </View>
            }
          ></Section>
        </Group>
      </ScrollView>
    );
  }
}

import {PropsWithChildren, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Stack, useSegments} from 'expo-router';
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
  moodRating: 0,
  SignificantEvents: ['Example Data; Click trash icon to remove me!'],
  BestMoment: [],
  WorstMoment: [],
  WhatHappened: [],
  NumberOfWakings: 0,
  MedicineTaken: [],
  SleepDuration: [], // e.g. [(date of start), (date of end)]
  AlcoholCaffeineTaken: [],
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
    data,
  }: {
    title: string;
    data: string[];
  }) => {
    const newState = {...diaryData};

    newState[title] = data;

    setDiaryData(newState);

    console.log('updated array', title, newState);
  };

  const handleTextInputDesignCallBack = ({
    title,
    text,
  }: {
    title: string;
    text: string;
  }) => {
    const newState = {...diaryData};

    if (newState[title].indexOf(text) === -1) {
      // this text under this title isnt in data
      newState[title].push(text);
    }

    setDiaryData(newState);

    console.log('attempted adding', title, text);
  };

  const handleNumberInputComponentCallBack = ({
    title,
    number,
  }: {
    title: string;
    number: number;
  }) => {
    const newState = {...diaryData};

    newState[title] = number;

    setDiaryData(newState);

    console.log('handleNumberInputComponent', title, number);
  };

  const handleSleepDurationInputCallBack = (dateArray: Date[]) => {
    const newState = {...diaryData};

    console.log(dateArray);

    if (dateArray[0] > dateArray[1]) {
      // invalid inputs
      Alert.alert(
        'Error',
        'Sleep duration Start Time cannot be after End Time',
      );
    } else {
      var newArray = [];

      newArray.push(dateArray[0]);
      newArray.push(dateArray[1]);

      newState['SleepDuration'] = newArray;

      setDiaryData(newState);
    }
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
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: props => (
              <Text
                {...props}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#765000',
                }}
              >
                Edit Diary
              </Text>
            ),
            headerRight: props => (
              <Text
                {...props}
                style={{
                  fontSize: 16,
                  color: '#765000',
                  fontWeight: '500',
                }}
                onPress={() => console.log('diaryData:', diaryData)}
              >
                Save
              </Text>
            ),
          }}
        />
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
                key={diaryData.SignificantEvents.length}
                data={diaryData.SignificantEvents}
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
                key={diaryData.BestMoment.length}
                data={diaryData.BestMoment}
                title="BestMoment"
                callBack={handleTextBoxDesignCallBack}
              />
            </Section>
            <Section title="Worst Moment">
              <TextInputDesign
                title="WorstMoment"
                callBack={handleTextInputDesignCallBack}
              />
              <TextBoxDesign
                key={diaryData.WorstMoment.length}
                data={diaryData.WorstMoment}
                title="WorstMoment"
                callBack={handleTextBoxDesignCallBack}
              />
            </Section>
            <Section title="What Happened">
              <TextInputDesign
                title="WhatHappened"
                callBack={handleTextInputDesignCallBack}
              />
              <TextBoxDesign
                key={diaryData.WhatHappened.length}
                data={diaryData.WhatHappened}
                title="WhatHappened"
                callBack={handleTextBoxDesignCallBack}
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
            <Section title="Sleep Duration" titleRight={<Text> hours</Text>}>
              <SleepDurationInput callBack={handleSleepDurationInputCallBack} />
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
              <TextBoxDesign
                key={diaryData.MedicineTaken.length}
                data={diaryData.MedicineTaken}
                title="MedicineTaken"
                callBack={handleTextBoxDesignCallBack}
              />
            </Section>
            <Section title="Alcohol / Caffeine Taken">
              <TextInputDesign
                title="AlcoholCaffeineTaken"
                callBack={handleTextInputDesignCallBack}
              />
              <TextBoxDesign
                key={diaryData.AlcoholCaffeineTaken.length}
                data={diaryData.AlcoholCaffeineTaken}
                title="AlcoholCaffeineTaken"
                callBack={handleTextBoxDesignCallBack}
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
                  style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    gap: 5,
                  }}
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
      </View>
    );
  }
}

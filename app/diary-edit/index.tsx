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
import {useSegments, Stack} from 'expo-router';
import {
  Group,
  Section,
  TextInputDesign,
  TextBoxDesign,
  SleepDurationInput,
} from '@/components/diary';
import MoodScale from '@/components/MoodScale';
import {
  ActiveDiaryEntry as ActiveEntry,
  useGetActiveDiaryEntryQuery,
  useGetDiaryEntryQuery,
} from '@/services/diary-api';
import {RootState} from '@/utils/store';

// handle Callbacks

const handleTextBoxDesignCallBack = (text: string) => {
  console.log('attempted deleting', text);
};

const handleTextInputDesignCallBack = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  console.log('attempted adding', title, text);
};

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
                onPress={() => console.log('save diary called')}
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
                displayText="test"
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
            <Section title="Sleep Duration" titleRight="10 hours">
              <SleepDurationInput />
            </Section>
            <Section title="Number of Wakings"></Section>
            <Section title="Medicine Taken">
              <TextInputDesign
                title="MedicineTaken"
                callBack={handleTextInputDesignCallBack}
              />
            </Section>
            <Section title="Alcohol / Caffeine Taken"></Section>
            <Section title="Number of Naps"></Section>
            <Section title="Total Duration of Naps"></Section>
          </Group>
        </ScrollView>
      </View>
    );
  }
}

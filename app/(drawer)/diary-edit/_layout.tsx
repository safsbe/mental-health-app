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
import {Group, Section} from '@/components/diary';
import MoodScale from '@/components/MoodScale';
import {
  ActiveDiaryEntry as ActiveEntry,
  useGetActiveDiaryEntryQuery,
  useGetDiaryEntryQuery,
} from '@/services/diary-api';
import {RootState} from '@/utils/store';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

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
        <Text>{JSON.strngify(activeEntryError, undefined, 4)}</Text>
      </ScrollView>
    );
  } else if (workingEntry) {
    return (
      <ScrollView>
        <View style={styles.header}>
          <Pressable>
            <Text>Save</Text>
          </Pressable>
          <Text>Edit Diary</Text>
          <Text>{workingEntry.entryDate}</Text>
          <Pressable>
            <Text>Save</Text>
          </Pressable>
        </View>
        <Group title="Mood Board">
          <Section title="Emotion">
            <Text>Mood: {workingEntry?.moodRating}</Text>
            <MoodScale
              currentMood={workingEntry?.moodRating}
              onSelectMood={i =>
                setWorkingEntry({...workingEntry, moodRating: i})
              }
            />
          </Section>
          <Section title="Significant events"></Section>
          <Section title="Best moment">
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  borderColor: '#D9CBAE',
                  borderRadius: 6,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  flexGrow: 1,
                  padding: 0,
                  marginHorizontal: 3,
                }}
              />
              <Pressable
                style={{
                  borderRadius: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginHorizontal: 3,
                  backgroundColor: '#D9CBAE',
                }}
                onPress={() => null}
              >
                <Text>Add</Text>
              </Pressable>
            </View>
            <View>
              <View
                style={{
                  marginVertical: 6,
                  paddingHorizontal: 6,
                  backgroundColor: '#FFF',
                  borderColor: '#D9CBAE',
                  borderRadius: 6,
                  borderWidth: 1,
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}
              >
                <Text style={{flexGrow: 1}}>Entry text</Text>
                <Pressable style={{backgroundColor: 'red'}}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          </Section>
          <Section title="Worst moment"></Section>
          <Section title="What happened"></Section>
          <Pressable style={{backgroundColor: 'green'}}>
            <Text>Save</Text>
          </Pressable>
        </Group>
      </ScrollView>
    );
  }
}

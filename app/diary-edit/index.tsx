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

interface DiaryEntryListEditSectionProps<T> {
  title: string;
  onAddItem: () => void;
  onRemoveItem: (item: {id: T}) => void;
  items: {
    id: T;
    body: string;
  }[];
}

function DiaryEntryListEditSection({
  title,
  onAddItem,
  onRemoveItem,
  items,
}: DiaryEntryListEditSectionProps<string>) {
  return (
    <Section title={title}>
      <TextInputDesign title="" callBack={onAddItem} />
      <TextBoxDesign items={items} onRemoveItem={onRemoveItem} />
    </Section>
  );
}

const handleSleepDurationInputCallBack = () => {
  return;
};

const handleNumberInputComponentCallBack = () => {
  return;
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
  } = useGetDiaryEntryQuery(activeEntryDate);

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
                onPress={() => console.log('diaryData:', 'e')}
              >
                Save
              </Text>
            ),
          }}
        />
        <ScrollView style={styles.root}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {new Date(workingEntry.entryDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          <Group title="Mood Board">
            <Section title="Emotion">
              <MoodScale
                currentMood={workingEntry?.moodRating}
                onSelectMood={i =>
                  setWorkingEntry({...workingEntry, moodRating: i})
                }
              />
            </Section>
            <DiaryEntryListEditSection
              title="Significant Events"
              onAddItem={() => {}}
              onRemoveItem={() => {}}
              items={[]}
            />
            <DiaryEntryListEditSection
              title="Best Moment"
              onAddItem={() => {}}
              onRemoveItem={() => {}}
              items={[]}
            />
            <DiaryEntryListEditSection
              title="Worst Moment"
              onAddItem={() => {}}
              onRemoveItem={() => {}}
              items={[]}
            />
            <DiaryEntryListEditSection
              title="What Happened"
              onAddItem={() => {}}
              onRemoveItem={() => {}}
              items={[]}
            />
          </Group>
          <Group title="Sleep Board">
            <Section title="How rested do you feel?">
              <MoodScale
                currentMood={workingEntry?.sleepRating}
                onSelectMood={i =>
                  setWorkingEntry({...workingEntry, sleepRating: i})
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
            <DiaryEntryListEditSection
              title="Medicine Taken"
              onAddItem={() => {}}
              onRemoveItem={() => {}}
              items={[]}
            />
            <DiaryEntryListEditSection
              title="Alcohol / Cafeine Taken"
              onAddItem={() => {}}
              onRemoveItem={() => {}}
              items={[]}
            />
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

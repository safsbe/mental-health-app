import {format, startOfWeek, endOfWeek, addDays} from 'date-fns';
import {useEffect, useState, ReactNode} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SvgCss} from 'react-native-svg/css';
import {useSelector, useDispatch} from 'react-redux';
import {Graph} from '@/components/Graph';
import {router} from 'expo-router';
import NewCalendarView from '@/components/NewCalendarView';
import GetWeek from '@/components/GetWeek';
import {Image} from 'expo-image';
import {SleepHoursGraph} from '@/components/SleepGraph';
import {Group, Section} from '@/components/diary';
import MoodScale from '@/components/MoodScale';
import Octicons from '@expo/vector-icons/Octicons';
import {RootState} from '@/utils/store';
import {
  useGetDiaryEntryQuery,
  useSaveDiaryEntryMoodRatingMutation,
  useGetDiaryEntryMoodRatingQuery,
  useGetDiaryEntryMoodRating7DaysQuery,
  useSaveDiaryEntrySleepRatingMutation,
  useGetDiaryEntrySleepRatingQuery,
  useGetDiaryEntrySleepRating7DaysQuery,
  switchActiveDiaryEntryDate,
} from '@/services/diary-api';

const svgPlaceholder = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" fill="#D9CBAE">
    
  </circle>
  <path
    fill="#765000"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
  <text class="hours" fill="#482641" x="50" y="50" text-anchor="middle" dominant-baseline="central">No data</text>
  <Text class="time" x="50" y="0" text-anchor="middle" dominant-baseline="text-before-edge">12</Text>
  <Text class="time" x="95" y="50" text-anchor="end" dominant-baseline="central">3</Text>
  <Text class="time" x="50" y="100" text-anchor="middle" dominant-baseline="text-after-edge">6</Text>
  <Text class="time" x="5" y="50" text-anchor="left" dominant-baseline="central">9</Text>
</svg>

<style>
  text {
    position: relative;
    top: 50%;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
  }

  .time {
    font-size: 12px;
  }
</style>
`;

interface GraphSectionProps {
  title: string;
  subtitle: string;
  subtitle2?: string;
  children: ReactNode;
}

function generateCalendarWeekDayNumbers(date: string): number[] {
  let currentDate = startOfWeek(new Date(date), {weekStartsOn: 1});
  const days: number[] = [];
  for (let i = 0; i < 7; i++) days.push(+format(addDays(currentDate, i), 'd'));
  return days;
}

function GraphSection({
  title,
  subtitle,
  subtitle2 = '',
  children,
}: GraphSectionProps) {
  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flex: 1,
      width: '100%',
      marginTop: 15,
    },
    title: {
      color: '#765000',
      fontWeight: 'bold',
      fontSize: 20,
    },
    subtitle: {
      color: '#765000',
      fontSize: 14,
      alignSelf: 'stretch',
    },
    subtitle2: {
      color: '#765000',
      fontSize: 14,
      alignSelf: 'stretch',
    },
    chartContainer: {
      display: 'flex',
      flex: 1,
      width: '100%',
      marginVertical: 10,
      alignItems: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {subtitle2 ? (
        <Text style={styles.subtitle2}>{subtitle2}</Text>
      ) : (
        <Text style={{marginTop: -14}}></Text>
      )}
      <View style={styles.chartContainer}>{children}</View>
    </View>
  );
}

type InsightsProps = {
  insights: {
    trend: 'up' | 'down';
    text: string;
  }[];
};

export function Insights({insights}: InsightsProps) {
  const styles = StyleSheet.create({
    root: {
      marginTop: 15,
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: '#765000',
    },
    title: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    text: {
      color: '#FFF',
      fontSize: 14,
    },
    insight: {
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Insights</Text>
      {insights.map(({trend, text}, index) => (
        <View style={styles.insight} key={index}>
          <Text style={styles.text}>{trend}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

interface OptionProps {
  text: string;
  imageType: number;
}

function Option({text, imageType}: OptionProps) {
  const imageOptions = [
    require('../../assets/quickRecommendation/aboutself.png'),
    require('../../assets/quickRecommendation/meditation.png'),
    require('../../assets/quickRecommendation/activities.png'),
  ];

  const styles = StyleSheet.create({
    containerAboutSelf: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#A1AEFF',
      borderRadius: 20,
      borderWidth: 0.4,
      borderColor: 'white',
    },
    containerMeditation: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#AEFFA1',
      borderRadius: 20,
      borderWidth: 0.4,
      borderColor: 'white',
    },
    containerActivities: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#FFE7E7',
      borderRadius: 20,
      borderWidth: 0.4,
      borderColor: 'white',
    },
    text: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      paddingHorizontal: 10,
    },
    image: {
      width: 64,
      height: 64,
      alignSelf: 'center',
      objectFit: 'contain',
    },
  });

  var imageSelectedOption = imageOptions[0]; // set default to first value
  var containerStyle = styles.containerAboutSelf;
  var redirect: () => void;
  var routes = [
    '/thisarticle?category=selfhelp&title=Self Care&id=13',
    '/meditation/meditation/',
    '/thisarticle?category=aboutmentalhelp&title=Anxiety&id=15',
  ];

  switch (imageType) {
    case 0: {
      imageSelectedOption = imageOptions[0];
      containerStyle = styles.containerAboutSelf;

      break;
    }
    case 1: {
      imageSelectedOption = imageOptions[1];
      containerStyle = styles.containerMeditation;

      break;
    }
    case 2: {
      imageSelectedOption = imageOptions[2];
      containerStyle = styles.containerActivities;

      break;
    }
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={{
          flex: 1,
          display: 'flex',
          height: 'auto',
          paddingTop: 5,
          paddingBottom: 10,
          gap: 5,
        }}
        onPress={() =>
          // @ts-ignore
          router.push(routes[imageType])
        }
      >
        <Text style={styles.text}>{text}</Text>
        <Image style={styles.image} source={imageSelectedOption} />
      </TouchableOpacity>
    </View>
  );
}

function Recommendations() {
  const styles = StyleSheet.create({
    root: {
      marginTop: 15,
      display: 'flex',
      flex: 1,
    },
    title: {
      paddingBottom: 5,
      color: '#765000',
      fontWeight: 'bold',
      fontSize: 16,
      alignSelf: 'center',
    },
    recommendationContainer: {
      paddingTop: 10,
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      width: '85%',
      alignSelf: 'center',
      gap: 15,
    },
    recommendation: {
      borderRadius: 30,
      padding: 20,
      width: '30%',
      maxWidth: 200,
    },
    recommendationText: {
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Recommended</Text>
      <View style={styles.recommendationContainer}>
        <Option text="How to feel better article" imageType={0} />
        <Option text="Try Deep Breathing" imageType={1} />
        <Option text="Anxiety and Panic Attack" imageType={2} />
      </View>
    </View>
  );
}

// Set the default days on the graph to be correct

const today = new Date(Date.now());

export default function Diary() {
  // REDUX WIRING
  const dispatch = useDispatch();
  const activeDiaryEntryDate = useSelector(
    (state: RootState) => state.activeDiaryEntryDate,
  );
  // const {data: diaryEntryData} = useGetDiaryEntryQuery(activeDiaryEntryDate);
  const {data: diaryEntryMoodRatingData} =
    useGetDiaryEntryMoodRatingQuery(activeDiaryEntryDate);
  const {data: diaryEntryMoodRating7DaysData} =
    useGetDiaryEntryMoodRating7DaysQuery(
      format(
        endOfWeek(new Date(activeDiaryEntryDate), {weekStartsOn: 1}),
        'yyyy-MM-dd',
      ),
    );
  const [saveDiaryEntryMoodRating, saveDiaryEntryMoodRatingResult] =
    useSaveDiaryEntryMoodRatingMutation();

  const {data: diaryEntrySleepRatingData} =
    useGetDiaryEntrySleepRatingQuery(activeDiaryEntryDate);
  const {data: diaryEntrySleepRating7DaysData} =
    useGetDiaryEntrySleepRating7DaysQuery(
      format(
        endOfWeek(new Date(activeDiaryEntryDate), {weekStartsOn: 1}),
        'yyyy-MM-dd',
      ),
    );
  const [saveDiaryEntrySleepRating] = useSaveDiaryEntrySleepRatingMutation();
  // END REDUX WIRING

  useEffect(() => {
    console.log('activeDiaryEntryDate: ' + activeDiaryEntryDate);
  }, [activeDiaryEntryDate]);

  useEffect(() => {
    console.log('diaryEntryMoodRatingData: ' + diaryEntryMoodRatingData);
  }, [diaryEntryMoodRatingData]);

  useEffect(() => {
    console.log(
      'diaryEntryMoodRating7DaysData: ' + diaryEntryMoodRating7DaysData,
    );
  }, [diaryEntryMoodRating7DaysData]);

  const [dayNumbers, setDayNumbers] = useState<number[]>(
    GetWeek(today).map(x => x.getDate()),
  );

  // STYLING STUFF

  const recommendations: Recommendation[] = [
    {
      title: 'How to feel better article',
      backgroundColor: '#A1AEFF',
      image: {},
    },
    {
      title: 'Try Deep Breathing',
      backgroundColor: '#AEFFA1',
      image: {},
    },
    {
      title: 'Anxiety and Panic Attack',
      backgroundColor: '#FFE7E7',
      image: {},
    },
  ];

  const styles = StyleSheet.create({
    containerGraphsSection: {
      backgroundColor: '#FFF',
      marginTop: 15,
      marginHorizontal: 15,
      flex: 1,
    },
    containerDiarySection: {
      backgroundColor: '#FDF6E7',
      borderRadius: 30,
      marginTop: 30,
      paddingTop: 10,
      paddingHorizontal: 15,
      flex: 1,
    },
    inlineSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  // TRIGGERS WHEN SCROLLING THE DIFFERENT WEEKS

  const handleCallBackToDiary = (data: string[]) => {
    // example 'data' value: ["3 Mar 2025", "4 Mar 2025", "5 Mar 2025", "6 Mar 2025", "7 Mar 2025", "8 Mar 2025", "9 Mar 2025"]
    console.log('data');
    dispatch(
      switchActiveDiaryEntryDate(
        format(new Date(data[data.length - 1]), 'yyyy-MM-dd'),
      ),
    );
    setDayNumbers(generateCalendarWeekDayNumbers(data[data.length - 1]));
  };

  return (
    <ScrollView>
      <View style={styles.containerGraphsSection}>
        <NewCalendarView
          activeDate={activeDiaryEntryDate}
          callBackToDiary={handleCallBackToDiary}
        />
        <GraphSection title="Mood 😄" subtitle="Your mood has been Great">
          {diaryEntryMoodRating7DaysData !== undefined && (
            <Graph
              scaleData={diaryEntryMoodRating7DaysData}
              dayNumbers={dayNumbers}
            />
          )}
        </GraphSection>
        <GraphSection
          title="Restfulness Level"
          subtitle="Your restfulness: Fluctuated"
        >
          {diaryEntrySleepRating7DaysData !== undefined && (
            <Graph
              scaleData={diaryEntrySleepRating7DaysData}
              dayNumbers={dayNumbers}
            />
          )}
        </GraphSection>
        <GraphSection
          title="Sleep Hours"
          subtitle="Your sleep hour: Fluctuated"
          subtitle2="Average duration: 9.3 hours"
        >
          <SleepHoursGraph dayNumbers={dayNumbers} />
        </GraphSection>
        <Insights
          insights={[
            {
              trend: '',
              text: '',
            },
            {
              trend: '',
              text: 'There are no insights currently. Check back again later!',
            },
          ]}
        />
        <Recommendations recommendations={recommendations} />
      </View>
      <View style={styles.containerDiarySection}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <View style={{flex: 1}}></View>
          <View style={{flex: 10, alignSelf: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {new Date(activeDiaryEntryDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          <Pressable
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
              justifyContent: 'center',
              height: '100%',
            }}
            onPress={() => router.push('/diary-edit')}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}
            >
              <Octicons name="pencil" size={16} color="black" />
              <Text>Edit</Text>
            </View>
          </Pressable>
        </View>
        <Group title="Mood Board">
          <Section title="">
            <Text style={{color: '#765000'}}>Mood</Text>
            <MoodScale
              currentMood={diaryEntryMoodRatingData}
              onSelectMood={selectedMood =>
                saveDiaryEntryMoodRating({
                  moodRating: selectedMood,
                  entryDate: activeDiaryEntryDate,
                })
              }
            />
          </Section>
          <Section title="">
            <Text style={{color: '#765000'}}>Best Moment</Text>
          </Section>
        </Group>
        <Group title="Sleep Board">
          <Section title="">
            <Text style={{color: '#765000'}}>How rested do you feel?</Text>
            <MoodScale
              currentMood={diaryEntrySleepRatingData}
              onSelectMood={x =>
                saveDiaryEntrySleepRating({
                  sleepRating: x,
                  entryDate: activeDiaryEntryDate,
                })
              }
            />
          </Section>
          <Section title="">
            <View style={styles.inlineSection}>
              <Text style={{color: '#765000'}}>Sleep duration</Text>
              <Text style={{color: '#765000'}}>0 hrs</Text>
            </View>
            <View style={styles.inlineSection}>
              <Text style={{color: '#A5A5A5'}}>Start</Text>
              <Text>12:00 AM</Text>
            </View>
            <View style={styles.inlineSection}>
              <Text style={{color: '#A5A5A5'}}>End</Text>
              <Text>12:00 AM</Text>
            </View>
            {/*<SvgCss xml={svgPlaceholder} width="100%" height="100%" />*/}
          </Section>
          <Section title="">
            <View style={styles.inlineSection}>
              <Text style={{color: '#765000'}}>Number of wakings</Text>
              <Text>0</Text>
            </View>
          </Section>
          <Section title="">
            <View>
              <Text style={{color: '#765000'}}>Medicine taken</Text>
              <Text>None</Text>
            </View>
          </Section>
          <Section title="">
            <View>
              <Text style={{color: '#765000'}}>Alcohol / Caffeine taken</Text>
              <Text>None</Text>
            </View>
          </Section>
          <Section title="">
            <View style={styles.inlineSection}>
              <Text style={{color: '#765000'}}>Number of naps</Text>
              <Text>0</Text>
            </View>
          </Section>
          <Section title="">
            <View style={styles.inlineSection}>
              <Text style={{color: '#765000'}}>Duration of naps</Text>
              <Text>0 hrs</Text>
            </View>
          </Section>
        </Group>
      </View>
    </ScrollView>
  );
}

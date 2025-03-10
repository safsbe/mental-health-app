import {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Graph} from '@/components/Graph';
import {router, Stack} from 'expo-router';
import CalendarView from '@/components/CalendarView';
import NewCalendarView from '@/components/NewCalendarView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import GetWeek from '@/components/GetWeek';
import {Image} from 'expo-image';
import {SleepHoursGraph} from '@/components/SleepGraph';
import {Group, Section} from '@/components/diary';
import MoodScale from '@/components/MoodScale';

function GraphSection({title, subtitle, subtitle2, children}) {
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
      alignSelf: 'stretch ',
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

function Option({text, imageType}: {text: string; imageType: number}) {
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
  var routes = ['/', '/meditation/meditation/', '/'];

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
        <Option text="Try Deep     Breathing" imageType={1} />
        <Option text="Anxiety and Panic attack" imageType={2} />
      </View>
    </View>
  );
}

// Set the default days on the graph to be correct

const today = new Date(Date.now());
const week = GetWeek(today);

var defaultDayNumbers = [];

for (var i = 0; i < 7; i++) {
  defaultDayNumbers.push(week[i].getDate());
}

// GLOBAL VARIABLE USED TO HOLD THE MOST UPDATED MOOD VALUE OF THE CURRENTLY CHOSEN WEEK

var parsedAsyncMoodData = new Array();
// var parsedAsyncRestData = new Array;

async function getDataFromAsync() {
  const asyncMoodData = await AsyncStorage.getItem('mood');
  // const asyncRestData = await AsyncStorage.getItem('rest');

  parsedAsyncMoodData = JSON.parse(asyncMoodData);
  // const parsedAsyncRestData = JSON.parse(asyncRestData);

  return parsedAsyncMoodData;
}

// ALL EMPTY IN CASE FAILURE TO LOAD DATA

var defaultScaleData = [-1, -1, -1, -1, -1, -1, -1];

export default function Diary() {
  const [dayNumbers, setDayNumbers] = useState<number[]>(defaultDayNumbers);
  const [scaleData, setScaleData] = useState<number[]>(defaultScaleData);
  const tempKey = useRef([]);

  // LORD KNOWS WHY THEF FOLLOWING WORKS I DONT EVEN UNDERSTAND IT MYSELF BUT PLEASE FOR THE LOVE OF GOD DO NOT TOUCH IT UNLESS YOU UNDERSTAND

  useEffect(() => {
    var internalValueNow = [];

    getDataFromAsync().then(() => {
      internalValueNow = parsedAsyncMoodData;
      const data = getDefaultDiaryData(internalValueNow);

      tempKey.current = data;

      // console.log('deep effect called')
      // console.log(tempKey.current)

      setScaleData(tempKey.current);
      // console.log('teset?')
    });

    // console.log('effect called');
  }, []);

  // DO NOT TOUCH ABOVE

  // BELOW TWO FUNCTIONS GO WITH USE EFFECT

  function checkDayDataFromAsync(type: string, date: Date, _DATA) {
    // options for type are 'mood'/'rest'
    const formattedDate = date.toISOString().split('T')[0];

    if (type === 'mood') {
      const check = _DATA.filter(x => x.date === formattedDate);

      if (check.length === 0) {
        // No data on that day
        return -1;
      } else {
        // console.log('else triggered')
        return check[0].mood - 1;
      }
    } else if (type === 'rest') {
      // Implement later when theres rest data
    }
  }

  function getDefaultDiaryData(_DATA) {
    var data = [];

    for (var i = 0; i < 7; i++) {
      data.push(checkDayDataFromAsync('mood', week[i], _DATA));
    }

    return data;
  }

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
  });

  // TRIGGERS WHEN SCROLLING THE DIFFERENT WEEKS

  const handleCallBackToDiary = (data: string[]) => {
    // example 'data' value: ["3 Mar 2025", "4 Mar 2025", "5 Mar 2025", "6 Mar 2025", "7 Mar 2025", "8 Mar 2025", "9 Mar 2025"]

    var result = [];
    var dayNumbersArray = [];

    // Call to update if theres any changes in asyncstorage
    getDataFromAsync().then(() => {
      for (var i = 0; i < 7; i++) {
        var temp = new Date(data[i]);

        dayNumbersArray.push(temp.getDate());
        result.push(checkDayDataFromAsync('mood', temp, parsedAsyncMoodData));
      }

      setDayNumbers(dayNumbersArray);
      setScaleData(result);
    });
  };

  return (
    <ScrollView>
      <View style={styles.containerGraphsSection}>
        <NewCalendarView callBackToDiary={handleCallBackToDiary} />
        <GraphSection
          title="Mood 😄"
          subtitle="Your mood has been Great"
          subtitle2=""
        >
          <Graph scaleData={scaleData} dayNumbers={dayNumbers} />
        </GraphSection>
        <GraphSection
          title="Restfulness Level"
          subtitle="Your restfulness: Fluctuated"
          subtitle2=""
        >
          <Graph scaleData={scaleData} dayNumbers={dayNumbers} />
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
          }}
        >
          <View style={{flex: 1}}></View>
          <View style={{flex: 10, alignSelf: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {today.toLocaleDateString('en-GB', {
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
            onPress={() => router.push('/(drawer)/diary-edit')}
          >
            <Text>Edit</Text>
          </Pressable>
        </View>
        <Group title="Mood Board">
          <Section title="">
            <Text style={{color: '#765000'}}>Mood</Text>
            <MoodScale
              currentMood={scaleData[0] + 1}
              onSelectMood={() =>
                console.log(scaleData[new Date(Date.now()).getDay()])
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
              currentMood={scaleData[0] + 1}
              onSelectMood={() =>
                console.log(scaleData[new Date(Date.now()).getDay()])
              }
            />
          </Section>
        </Group>
      </View>
    </ScrollView>
  );
}

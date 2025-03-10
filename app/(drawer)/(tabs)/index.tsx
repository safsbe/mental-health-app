import moment from 'moment';
import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodScale from '@/components/MoodScale';
import QuickRecommendation from '@/components/QuickRecommendation';
import Quote from '@/components/Quote';
import Activities from '@/components/Activities';
import Explore from '@/components/Explore';
import {router} from 'expo-router';
import {getNativeSourceAndFullInitialStatusForLoadAsync} from 'expo-av/build/AV';
import {parse} from 'date-fns';

export default function Index() {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const alias = await AsyncStorage.getItem('alias');
      const purpose = await AsyncStorage.getItem('purpose');
      const appKnowledge = await AsyncStorage.getItem('appKnowledge');
      const authToken = await AsyncStorage.getItem('authToken');
      const mood = await AsyncStorage.getItem('mood');
      const videoWatched = await AsyncStorage.getItem('videoWatched');

      setName(alias || ''); // For this page

      console.log(alias, purpose, appKnowledge, authToken, mood, videoWatched); // Logging when you enter the page: for easier development to see current user
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <DiaryHero />
        <Section title="Recommended Read">
          <Quote />
        </Section>
        <Section title="Activities">
          <Activities />
        </Section>
        <Section title="Explore">
          <Explore />
        </Section>
      </View>
    </ScrollView>
  );
}

function DiaryHero() {
  const [mood, setMood] = useState(0);

  const handleMoodSelect = async (selectedMood: number) => {
    setMood(selectedMood);
    const currentDate = new Date().toISOString().split('T')[0]; // date formatted as YYYY-MM-DD
    const currMood = await AsyncStorage.getItem('mood');

    if (currMood == null) {
      await AsyncStorage.setItem(
        'mood',
        JSON.stringify([{date: currentDate, mood: selectedMood}]),
      );
    } else {
      // console.log(currMood); // Mood before button press

      const parsedCurrMood = JSON.parse(currMood);
      // @ts-ignore
      const otherResultArray = parsedCurrMood.filter(
        x => x.date !== currentDate,
      );

      // console.log('parsedCurrMood:', parsedCurrMood);
      // console.log('otherResultArray', otherResultArray);

      const todayNewEntry = {
        date: currentDate,
        mood: selectedMood,
      };

      // console.log('todayNewEntry:', todayNewEntry);

      otherResultArray.push(todayNewEntry); // add todays value to the moods from other days except the previous value for today

      // console.log('new otherResultArray:', otherResultArray);

      await AsyncStorage.setItem('mood', JSON.stringify(otherResultArray));
    }

    console.log('mood:', await AsyncStorage.getItem('mood'));
  };

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      paddingBottom: 10,
      borderRadius: 15,
      backgroundColor: '#FDF6E7',
      flex: 1,
      display: 'flex',
    },
    dateLarge: {
      marginTop: 5,
      color: '#765000',
      textAlign: 'center',
      fontSize: 32,
      fontWeight: 'bold',
    },
    dateSmall: {
      color: '#765000',
      textAlign: 'center',
      fontSize: 12,
    },
    diaryLinkText: {
      textDecorationLine: 'underline',
      color: '#765000',
      fontSize: 12,
      paddingHorizontal: 10,
      paddingTop: 5,
      textAlign: 'right',
    },
    moodText: {
      paddingTop: 10,
      color: '#765000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.diaryLinkText} onPress={() => router.push('/diary')}>
        View Diary
      </Text>
      <Text style={styles.dateLarge}>{moment().format('dddd')}</Text>
      <Text style={styles.dateSmall}>{moment().format('DD MMMM YYYY')}</Text>
      <Text style={styles.moodText}>What is your mood today?</Text>
      <MoodScale currentMood={mood} onSelectMood={handleMoodSelect} />
      <QuickRecommendation />
    </View>
  );
}

function Section({title, children}: PropsWithChildren & {title: string}) {
  const styles = StyleSheet.create({
    section: {
      marginHorizontal: 10,
      paddingVertical: 5,
    },
    title: {
      paddingBottom: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#765000',
    },
  });

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginHorizontal: 5,
  },
});

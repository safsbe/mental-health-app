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
import {
  useGetDiaryEntryMoodRatingQuery,
  useSaveDiaryEntryMoodRatingMutation,
} from '@/services/diary-api';

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
        {/* <Section title="Recommended Read">
          <Quote />
        </Section> */}
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
  // REDUX WIRING
  const {
    data: diaryEntryMoodRatingData,
    isLoading: diaryEntryMoodRatingIsLoading,
    isSuccess: diaryEntryMoodRatingIsSuccess,
    isError: diaryEntryMoodRatingisError,
    error: diaryEntryMoodRatingError,
  } = useGetDiaryEntryMoodRatingQuery(undefined);
  const [
    saveDiaryEntryMoodRating,
    saveDiaryEntryMoodRatingResult,
  ] = useSaveDiaryEntryMoodRatingMutation();
  
  // END REDUX WIRING

  const handleMoodSelect = (selectedMood: number) => {
    saveDiaryEntryMoodRating({moodRating: selectedMood});
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
      <MoodScale currentMood={diaryEntryMoodRatingData} onSelectMood={handleMoodSelect} />
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

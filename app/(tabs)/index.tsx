import moment from 'moment';
import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodScale from '@/components/MoodScale';
import Quote from '@/components/Quote';
import Activities from '@/components/Activities';
import Explore from '@/components/Explore';
import {router} from 'expo-router';

export default function Index() {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const alias = await AsyncStorage.getItem('alias');
      const dob = await AsyncStorage.getItem('dob');
      const goals = await AsyncStorage.getItem('goals');
      const authToken = await AsyncStorage.getItem('authToken');
      const mood = await AsyncStorage.getItem('mood');
      const videoWatched = await AsyncStorage.getItem('videoWatched');

      setName(alias || ''); // For this page

      console.log(alias, dob, goals, authToken, mood, videoWatched); // Logging when you enter the page: for easier development to see current user
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={DevLogoutUser}>
          <Text style={styles.greeter}>Hey, {name}!</Text>
        </Pressable>
        <DiaryHero />
        <Section title="Quote of the Day">
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
    await AsyncStorage.setItem(
      'mood',
      currMood + JSON.stringify({date: currentDate, mood: selectedMood}),
    );
    console.log(await AsyncStorage.getItem('mood'));
  };

  const styles = StyleSheet.create({
    container: {
      margin: 10,
      borderRadius: 15,
      backgroundColor: '#FDF8E7',
    },
    dateLarge: {
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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.dateLarge}>{moment().format('dddd')}</Text>
      <Text style={styles.dateSmall}>{moment().format('DD MMMM YYYY')}</Text>
      <MoodScale currentMood={mood} onSelectMood={handleMoodSelect} />
    </View>
  );
}

function Section({title, children}: PropsWithChildren & {title: string}) {
  const styles = StyleSheet.create({
    section: {
      margin: 10,
    },
    title: {
      marginBottom: 10,
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

function DevLogoutUser() {
  const removeUserData = async () => {
    await AsyncStorage.multiRemove([
      'alias',
      'authToken',
      'dob',
      'goals',
      'mood',
      'videoWatched',
    ]); // Remove all user info

    router.replace('/login'); // Navigate to login setup screen again
  };

  removeUserData();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
  },
  greeter: {
    color: '#765000',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    paddingTop: 30,
  },
});

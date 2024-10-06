import moment from 'moment';
import {Image} from 'expo-image';
import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodScale from '@/components/MoodScale';
import Quote from '@/components/Quote';
import Activities from '@/components/Activities';
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
    await AsyncStorage.setItem(
      'mood',
      JSON.stringify({date: currentDate, mood: selectedMood}),
    );
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

function Explore() {
  const exploreImages = {
    SelfCare: require('../../assets/explore-categories/self.svg'),
    UnderstandingYourself: require('../../assets/explore-categories/understanding_yourself.svg'),
    MentalHealth: require('../../assets/explore-categories/mental_health.svg'),
    StoriesFromOthers: require('../../assets/explore-categories/others.svg'),
  };

  const styles = StyleSheet.create({
    exploreColumn: {
      flex: 1,
      flexDirection: 'column',
      gap: 10,
    },
    exploreRow: {
      flex: 1,
      flexDirection: 'row',
      gap: 10,
    },
  });

  return (
    <View style={styles.exploreColumn}>
      <View style={styles.exploreRow}>
        <Pressable
          onPress={() => router.push('/articles?category=selfcare')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDF1FE',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            Self Care
          </Text>
          <Image style={{flexGrow: 1}} source={exploreImages.SelfCare} />
        </Pressable>
        <Pressable
          onPress={() =>
            router.push('/articles?category=understandingyourself')
          }
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDE5FF',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            Understanding Yourself
          </Text>
          <Image
            style={{flexGrow: 1}}
            source={exploreImages.UnderstandingYourself}
          />
        </Pressable>
      </View>
      <View style={styles.exploreRow}>
        <Pressable
          onPress={() => router.push('/articles?category=aboutmentalhealth')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDF7E5',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            About Mental Health
          </Text>
          <Image style={{flexGrow: 1}} source={exploreImages.MentalHealth} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/articles?category=storiesfromothers')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#FFE7E7',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            Stories From Others
          </Text>
          <Image
            style={{flexGrow: 1}}
            source={exploreImages.StoriesFromOthers}
          />
        </Pressable>
      </View>
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

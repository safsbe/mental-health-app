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

      setName(alias || ''); // For this page

      console.log(alias, dob, goals, authToken, mood); // Logging when you enter the page: for easier development to see current user
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
      paddingTop: 15,
      paddingBottom: 30,
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

type ExploreCardProps = {
  bgColor: string;
  imgSrc: Image['props']['source'];
  text: string;
};

function ExploreCard({bgColor, imgSrc, text}: ExploreCardProps) {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius: 6,
        marginRight: 15,
        padding: 15,
        width: 180,
        height: 200,
      }}
    >
      <Text
        style={{
          textAlign: 'right',
          fontWeight: 'bold',
          color: '#2A4E4C',
        }}
      >
        {text}
      </Text>
      <Image
        style={{
          flexGrow: 1,
        }}
        source={imgSrc}
      />
    </View>
  );
}

function Explore() {
  const exploreCards: ExploreCardProps[] = [
    {
      text: 'Self',
      bgColor: '#DDF1FE',
      imgSrc: require('../../assets/explore-categories/self.svg'),
    },
    {
      text: 'Self Help',
      bgColor: '#DDE5FF',
      imgSrc: require('../../assets/explore-categories/self_help.svg'),
    },
    {
      text: 'Mental Health',
      bgColor: '#DEF7E5',
      imgSrc: require('../../assets/explore-categories/mental_health.svg'),
    },
    {
      text: 'Lived Experience',
      bgColor: '#FFE7E7',
      imgSrc: require('../../assets/explore-categories/lived_experience.svg'),
    },
  ];
  return (
    <ScrollView horizontal={true}>
      {exploreCards.map((x, i) => (
        <ExploreCard
          key={i}
          bgColor={x.bgColor}
          text={x.text}
          imgSrc={x.imgSrc}
        />
      ))}
    </ScrollView>
  );
}

function Section({title, children}: PropsWithChildren & {title: string}) {
  const styles = StyleSheet.create({
    section: {
      marginVertical: 30,
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
    ]); // Remove all user info

    router.replace('/login'); // Navigate to login setup screen again
  };

  removeUserData();
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  greeter: {
    color: '#765000',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodScale from '@/components/MoodScale';
import Quote from '@/components/Quote';
import Activities from '@/components/Activities';

export default function Index() {
  const [name, setName] = useState('');
  const [mood, setMood] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem('alias');
      setName(storedName || '');
    };

    fetchUserData();
  }, []);

  const handleMoodSelect = async (selectedMood: number) => {
    setMood(selectedMood);
    const currentDate = new Date().toISOString().split('T')[0]; // date formatted as YYYY-MM-DD
    await AsyncStorage.setItem('mood', JSON.stringify({ date: currentDate, mood: selectedMood }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {name}</Text>
      <Text style={styles.subtext}>How are you feeling today?</Text>
      <MoodScale onSelectMood={handleMoodSelect} />
      <Text style={styles.boldText}>Quote of the day</Text>
      <Quote />
      <Text style={styles.boldText}>Activities</Text>
      <Activities/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  welcome: {
    fontSize: 24,
  },
  subtext: {
    fontSize: 14,
    marginVertical: 10,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});

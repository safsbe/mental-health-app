import {Image} from 'expo-image';
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default function MoodScale({
  currentMood,
  onSelectMood,
}: {
  currentMood: number;
  onSelectMood: (mood: number) => void;
}) {
  const moodImages = [
    require('../assets/moodscale/sad_full.svg'),
    require('../assets/moodscale/sad_slight.svg'),
    require('../assets/moodscale/neutral.svg'),
    require('../assets/moodscale/happy_slight.svg'),
    require('../assets/moodscale/happy_full.svg'),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.callToAction}>What is your mood today?</Text>
      <View style={styles.moodContainer}>
        {moodImages.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => onSelectMood(index + 1)}>
            <Image
              source={img}
              style={{
                ...styles.moodImage,
                ...(currentMood + 1 == index ? styles.moodImageActive : {}),
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  moodContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callToAction: {
    color: '#765000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moodImage: {
    width: 60,
    height: 60,
    opacity: 30,
  },
  moodImageActive: {
    opacity: 100,
  },
});

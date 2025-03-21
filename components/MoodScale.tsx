import {Image} from 'expo-image';
import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

interface MoodScaleProps {
  /**
   * @remarks
   * `0`, `null`, and `undefined` are treated identically.
   */
  currentMood?: number | null;
  onSelectMood: (mood: number) => void;
}
export default function MoodScale({currentMood, onSelectMood}: MoodScaleProps) {
  const moodImages = [
    require('../assets/moodscale/sad_full.svg'),
    require('../assets/moodscale/sad_slight.svg'),
    require('../assets/moodscale/neutral.svg'),
    require('../assets/moodscale/happy_slight.svg'),
    require('../assets/moodscale/happy_full.svg'),
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.callToAction}>What is your mood today?</Text> */}
      <View style={styles.moodContainer}>
        {moodImages.map((img, index) => (
          <Pressable key={index} onPress={() => onSelectMood(index + 1)}>
            <Image
              source={img}
              style={{
                ...styles.moodImage,
                ...(currentMood - 1 == index
                  ? styles.moodImageActive
                  : styles.moodImageInactive),
              }}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
  },
  moodContainer: {
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
    opacity: 1,
  },
  moodImageInactive: {
    opacity: 0.4,
  },
});

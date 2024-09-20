import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function MoodScale({ onSelectMood }: { onSelectMood: (mood: number) => void }) {
  const moodImages = [
    require('../assets/moodscale/Sad_Button.png'),
    require('../assets/moodscale/Slightly_Sad_Button.png'),
    require('../assets/moodscale/Neutral_Button.png'),
    require('../assets/moodscale/Slightly_Happy_Button.png'),
    require('../assets/moodscale/Happy_Button.png'),
  ];

  return (
    <View style={styles.moodContainer}>
      {moodImages.map((img, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectMood(index + 1)}>
          <Image source={img} style={styles.moodImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  moodImage: {
    width: 50,
    height: 50,
  },
});



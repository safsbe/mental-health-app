import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

export default function Meditation() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const loadAndPlaySound = async () => {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/meditation/love_wins_all.mp3') // Path to your song file
    );
    setSound(newSound);
    soundRef.current = newSound;
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
    setIsPlaying(true);
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      if (status.positionMillis !== undefined) {
        setPositionMillis(status.positionMillis);
        if (status.durationMillis !== undefined) {
          setDurationMillis(status.durationMillis);
          setSliderValue(status.positionMillis / status.durationMillis);
        }
      }
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
      setIsPlaying(false);
    } else {
      if (!sound) {
        await loadAndPlaySound();
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleSliderChange = async (value: number) => {
    if (sound && durationMillis) {
      const position = value * durationMillis;
      await sound.setPositionAsync(position);
      setSliderValue(value);
    }
  };

  const handleStop = async () => {
    await sound?.stopAsync();
    setIsPlaying(false);
    setSliderValue(0);
    setPositionMillis(0);
  };

  const getTimeMins = (millis: number) =>{
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
        <MaterialIcons
          name={isPlaying ? 'pause' : 'play-arrow'}
          size={48}
          color="#ffffff"
        />
      </TouchableOpacity>
      <Text>{getTimeMins(positionMillis)}/{getTimeMins(durationMillis)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1EB1FC"
      />
      <Button title="Stop" onPress={handleStop} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    alignItems: 'center',
    padding: 16,
  },
  playPauseButton: {
    backgroundColor: '#1EB1FC',
    borderRadius: 50,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    marginVertical: 20,
  },
});

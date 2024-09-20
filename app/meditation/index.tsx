import {useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Audio} from 'expo-av';
import {MaterialIcons} from '@expo/vector-icons';

export default function Meditation() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrackInitialPlay, setTrackInitialPlay] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const loadAndPlaySound = async () => {
    const {sound: newSound} = await Audio.Sound.createAsync(
      require('../../assets/meditation/love_wins_all.mp3'), // Path to your song file
    );
    setSound(newSound);
    soundRef.current = newSound;
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
    setIsPlaying(true);
    setTrackInitialPlay(false);
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

  const getTimeMins = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleSubtle}>Take a</Text>
        <Text style={styles.titleEmphasis}>Mindful Pause</Text>
        <Text style={styles.titleSubtle}>
          Life is a<Text style={styles.boldText}> marathon</Text>
        </Text>
        <Text style={styles.titleSubtle}>
          Not a<Text style={styles.boldText}> sprint</Text>
        </Text>
      </View>
      <View style={styles.controlContainer}>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playPauseButton}
        >
          <MaterialIcons
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={96}
            color="#ffffff"
          />
        </TouchableOpacity>
        <Text>
          {getTimeMins(positionMillis)}/{getTimeMins(durationMillis)}
        </Text>
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
        <Text style={styles.titleSubtle}>
          {Math.floor(durationMillis / 60000)} mins
        </Text>
        {/* <Button title="Stop" onPress={handleStop} /> */}
      </View>
      <View style={styles.audioChoiceContainer}>
        <Text style={{...styles.pill, ...styles.pillActive}}>General</Text>
        <Text style={styles.pill}>IPPT</Text>
      </View>
      <View style={styles.subtextContainer}>
        <Text style={styles.subtext}>Reduce Stress</Text>
        <Text style={styles.subtext}>Enhance Well-being</Text>
        <Text style={styles.subtext}>Increase Productivity</Text>
      </View>
      <View>
        <Text style={{...styles.pill, ...styles.pillActive}}>Read more</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#595F59',
  },
  playPauseButton: {
    height: 150,
    width: 150,
    marginBottom: 20,
    borderColor: '#A5A5A5',
    borderRadius: 5000,
    borderWidth: 10,
    padding: 16,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  controlContainer: {
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  titleEmphasis: {
    color: '#FFF',
    fontSize: 24,
    lineHeight: 48,
    textAlign: 'center',
  },
  titleSubtle: {
    color: '#A5A5A5',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  subtextContainer: {
    paddingVertical: 20,
  },
  subtext: {
    color: '#A5A5A5',
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 4,
  },
  audioChoiceContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 6,
  },
  pill: {
    borderColor: '#A5A5A5',
    borderRadius: 52,
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  pillActive: {
    backgroundColor: '#A5A5A5',
    color: '#FFF',
  },
});

import {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  BackHandler,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Audio} from 'expo-av';
import {MaterialIcons} from '@expo/vector-icons';
import {Image} from 'expo-image';
import {router, Stack} from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import {HeaderBackButton} from '@react-navigation/elements';

export default function Meditation() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrackInitialPlay, setTrackInitialPlay] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [trackID, setTrackID] = useState<number>(0);
  const tracks = [
    {
      title: 'Deep Breathing',
      file: require('../../assets/meditation/audio/deep_breathing.mp3'),
    },
    {
      title: 'Deep Breathing (IPPT)',
      file: require('../../assets/meditation/audio/deep_breathing_ippt.mp3'),
    },
    {
      title: 'Muscle Relaxation (Parody)',
      file: require('../../assets/meditation/audio/muscle_relaxation_parody.mp3'),
    },
  ];

  const loadAndPlaySound = async (trackID: number) => {
    await handleStop();
    const {sound: newSound} = await Audio.Sound.createAsync(
      tracks[trackID].file,
    );
    setSound(newSound);
    setTrackID(trackID);
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
        await loadAndPlaySound(trackID);
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
    await sound?.unloadAsync();
    setIsPlaying(false);
    setSliderValue(0);
    setPositionMillis(0);
  };

  const getTimeMins = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds;
  };

  async function changeOrientation() {
    await ScreenOrientation.lockAsync(2); // Sets to ANY portrait
  }

  BackHandler.addEventListener('hardwareBackPress', function () {
    changeOrientation();
  });

  changeOrientation();

  return (
    <View style={{height: '100%'}}>
      <Stack.Screen
        options={{
          // @ts-ignore
          headerStyle: {
            backgroundColor: '#595F59',
          },
          headerTitle: '',
          headerShown: true,
          headerShadowVisible: false,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              // @ts-ignore
              onPress={() => router.back()}
            />
          ),
        }}
      />
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
            tapToSeek={true}
            thumbTintColor="#1EB1FC"
          />
          <Text style={styles.titleSubtle}>
            {Math.floor(durationMillis / 60000)} mins
          </Text>
          {/* <Button title="Stop" onPress={handleStop} /> */}
        </View>
        <View style={styles.audioChoiceContainer}>
          {tracks.map(({title}, i) => (
            <Text
              key={title}
              style={{
                ...styles.pill,
                ...(trackID === i ? styles.pillActive : {}),
              }}
              onPress={() => loadAndPlaySound(i)}
            >
              {title}
            </Text>
          ))}
        </View>
        <View style={styles.subtextContainer}>
          <View style={styles.subtextItem}>
            <Image
              source={require('../../assets/meditation/icons/reduce_stress.svg')}
            />
            <Text style={styles.subtext}>Reduce Stress</Text>
          </View>
          <View style={styles.subtextItem}>
            <Image
              source={require('../../assets/meditation/icons/enhance_wellbeing.svg')}
            />
            <Text style={styles.subtext}>Enhance Well-being</Text>
          </View>
          <View style={styles.subtextItem}>
            <Image
              source={require('../../assets/meditation/icons/increase_productivity.svg')}
            />
            <Text style={styles.subtext}>Increase Productivity</Text>
          </View>
        </View>
        <Pressable
          onPress={() =>
            router.push(
              '/thisarticle?category=Self Care&title=Mindful Pause&id=0',
            )
          }
        >
          <Text style={{...styles.pill, ...styles.pillActive}}>Read more</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: '5%',
    paddingHorizontal: 16,
    paddingBottom: '5%',
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
    width: 200,
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
  subtextItem: {
    alignItems: 'stretch',
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  pill: {
    borderColor: '#A5A5A5',
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 3,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: '#FFF',
    textAlign: 'center',
    overflow: 'hidden',
  },
  pillActive: {
    backgroundColor: '#A5A5A5',
    color: '#FFF',
  },
});

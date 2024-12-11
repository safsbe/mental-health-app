import AsyncStorage from '@react-native-async-storage/async-storage';
import {ResizeMode, Video} from 'expo-av';
import {Image} from 'expo-image';
import {router} from 'expo-router';
import {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

export default function Login() {
  const [heroIntroFinished, setHeroIntroFinished] = useState(false);

  const _heroIntroStatusUpdateHandler = e => {
    if (e.didJustFinish === true) {
      setHeroIntroFinished(true);
      try {
        AsyncStorage.setItem('videoWatched', 'true');
      } catch (err) {
        Alert.alert(
          'Error',
          'Failed to set videoWatched variable value to "true"',
        );
      }
    }
  };

  const checkVideoWatched = async () => {
    const introFinished = await AsyncStorage.getItem('videoWatched');

    if (introFinished) {
      setHeroIntroFinished(true);
    }
  };

  checkVideoWatched();

  return (
    <View>
      {heroIntroFinished ? (
        <View style={styles.screen}>
          <Image
            contentFit="contain"
            style={{
              height: 250,
              width: 250,
            }}
            source={require('../../assets/auth/hero_graphic.gif')}
          />
          <Text style={{textAlign: 'center'}}>
            For when you are feeling something...
          </Text>
          <View style={styles.authOptions}>
            <Text
              style={styles.loginButton}
              // onPress={() => router.push('/')}  // Replace with proper link once its been set up
            >
              Login
            </Text>
            <Text
              style={styles.guestButton}
              onPress={() => router.push('/onboarding')}
            >
              Guest
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>No account? </Text>
            <Text style={styles.signUp} onPress={() => router.push('/signup')}>
              Sign up
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.video}>
          <Video
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={_heroIntroStatusUpdateHandler}
            shouldPlay={true}
            style={{
              height: 250,
              width: 250,
            }}
            source={require('../../assets/auth/hero_intro.mov')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loginButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    minWidth: '10%',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: '#2A4E4C',
    borderColor: '#2A4E4C',
    color: '#FFF',
    overflow: 'hidden',
  },
  guestButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    minWidth: '10%',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
  },
  signUp: {
    color: '#2A4E4C',
  },
  video: {
    backgroundColor: 'black',
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

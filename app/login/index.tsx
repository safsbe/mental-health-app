import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'expo-image';
import {router} from 'expo-router';
import {Alert, StyleSheet, Text, View} from 'react-native';

export default function Login() {
  const signInGuest = () => {
    try {
      AsyncStorage.setItem('authToken', 'guest');
      router.replace('/onboarding');
    } catch (err) {
      Alert.alert('Error', 'Failed to save login data');
    }
  };

  return (
    <View style={styles.screen}>
      <Image
        style={{
          height: 250,
          width: 250,
        }}
        source={require('../../assets/common/logo.svg')}
      />
      <Text style={{textAlign: 'center'}}>
        For when you are feeling something...
      </Text>
      <View style={styles.authOptions}>
        <Text style={{...styles.btn, ...styles.btnPrimary}}>Login</Text>
        <Text
          style={{...styles.btn, ...styles.btnSecondary}}
          onPress={() => signInGuest()}
        >
          Guest
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btn: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    minWidth: '10%',
    borderRadius: 8,
    borderWidth: 2,
    textAlign: 'center',
  },
  btnPrimary: {
    backgroundColor: '#2A4E4C',
    borderColor: '#2A4E4C',
    color: '#FFF',
  },
});

import {router} from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';

export default function Login() {
  // Set up proper login page as part of future beta

  // Currently not required as part of v0.7.2

  // Will redirect user back and give error message instead.

  Alert.alert(
    'Error',
    'This feature is not available yet as part of this application version, please try again in future versions!',
  );

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      flex: 1,
      marginTop: '15%',
    },
    returnButton: {
      width: '80%',
      alignSelf: 'center',
      borderRadius: 15,
      borderColor: 'black',
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable
          style={styles.returnButton}
          onPress={() => router.replace('/start')}
        >
          <Text>Return to start page</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

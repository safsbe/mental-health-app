import CalendarView from '@/components/CalendarView';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {router} from 'expo-router';

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>My Diary</Text>
      <CalendarView /> */}
      <Text style={styles.header}>
        This page is currently not in use and will be removed in a future
        version.
      </Text>

      <Text style={{opacity: 0, height: 50}}>a</Text>

      <Text style={styles.header}>
        Swipe the screen to return back to the other page.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontSize: 30,
    color: '#765000',
    alignSelf: 'center',
    fontWeight: '600',
  },
});

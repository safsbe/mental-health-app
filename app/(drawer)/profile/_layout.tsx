import CalendarView from '@/components/CalendarView';
import {View, StyleSheet, Text} from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Diary</Text>
      <CalendarView />
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

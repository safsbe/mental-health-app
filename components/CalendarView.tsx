import {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import WeekCalendar from './WeekCalendar';
import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';
import MoodGraph from './MoodGraph';

export default function CalendarView() {
  const [view, setView] = useState<'week' | 'month' | 'year'>('week');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const moodData = [
    {date: '2024-10-15', mood: 2},
    {date: '2024-10-16', mood: 3},
    {date: '2024-10-17', mood: 3},
    {date: '2024-10-18', mood: 3},
    {date: '2024-10-19', mood: 4},
    {date: '2024-10-20', mood: 4},
    {date: '2024-10-21', mood: 5},
  ]; //PLACEHOLDER DATA CUZ HAVENT IMPLEMENTED GETTING MOOD DATA FROM ASYNCSTORAGE YET

  const handleDayPress = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={view === 'week' ? styles.activeButton : styles.button}
          onPress={() => setView('week')}
        >
          <Text
            style={
              view === 'week' ? styles.activeButtonText : styles.buttonText
            }
          >
            7d
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={view === 'month' ? styles.activeButton : styles.button}
          onPress={() => setView('month')}
        >
          <Text
            style={
              view === 'month' ? styles.activeButtonText : styles.buttonText
            }
          >
            4w
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={view === 'year' ? styles.activeButton : styles.button}
          onPress={() => setView('year')}
        >
          <Text
            style={
              view === 'year' ? styles.activeButtonText : styles.buttonText
            }
          >
            1y
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render the corresponding calendar */}
      <View style={styles.calendarContainer}>
        {view === 'week' && (
          <WeekCalendar moodData={moodData} onDayPress={handleDayPress} />
        )}
        {view === 'month' && (
          <MonthCalendar moodData={moodData} onDayPress={handleDayPress} />
        )}
        {view === 'year' && (
          <YearCalendar moodData={moodData} onDayPress={handleDayPress} />
        )}
      </View>
      <View>
        <MoodGraph selectedDate={selectedDate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    height: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#FDF6E7',
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  activeButton: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#765000',
    borderRadius: 50,
  },
  buttonText: {
    color: '#765000',
    fontSize: 16,
  },
  activeButtonText: {
    color: '#FDF6E7',
    fontSize: 16,
  },
  calendarContainer: {
    flex: 1,
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

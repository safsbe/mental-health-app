import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Touchable,
} from 'react-native';
import WeekCalendar from './WeekCalendar';
import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';
import MoodGraph from './MoodGraph';
import Ionicons from '@expo/vector-icons/Ionicons';
import GetWeek from './GetWeek';

type NewCalendarViewProps = {
  callBackToDiary: (data: string[]) => void; // Pass data back to parent index.tsx in /diary
};

export default function NewCalendarView({
  callBackToDiary,
}: NewCalendarViewProps) {
  const [view, setView] = useState<'week' | 'month' | 'year'>('week');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const [Monday, setMonday] = useState<string>();
  const [Sunday, setSunday] = useState<string>();

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

  const handleCallBack = (data: string[]) => {
    // console.log(data)

    // @ts-ignore
    setMonday(
      data[0].toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    );
    // @ts-ignore
    setSunday(
      data[6].toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    );

    callBackToDiary(data);
  };

  const todate = new Date(Date.now());
  const result = GetWeek(todate);

  return (
    <View style={styles.container}>
      <View style={styles.rangeChangeContainer}>
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
      <View style={styles.weekRangeContainer}>
        <View style={{flex: 1, marginHorizontal: 10, opacity: 0}}></View>
        <View style={styles.rangeView}>
          {/* <Ionicons name="chevron-back" size={16} color="#765000" /> */}
          <Text style={styles.rangeViewText}>
            {Monday ||
              result[0].toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}{' '}
            -{' '}
            {Sunday ||
              result[6].toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
          </Text>
          {/* <Ionicons name="chevron-forward" size={16} color="#765000" /> */}
        </View>
        <View style={styles.todayButton}>
          {/* <TouchableOpacity style={styles.todayButtonIcon} onPress={() => triggerToday()}>
            <Ionicons name="calendar-outline" size={18} color="#765000" />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.calendarContainer}>
        {view === 'week' && (
          <WeekCalendar onDayPress={handleDayPress} callBack={handleCallBack} />
        )}
        {view === 'month' && (
          <MonthCalendar moodData={moodData} onDayPress={handleDayPress} />
        )}
        {view === 'year' && (
          <YearCalendar moodData={moodData} onDayPress={handleDayPress} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  rangeChangeContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  weekRangeContainer: {
    marginTop: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  calendarContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  rangeView: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    backgroundColor: '#FDF6E7',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  rangeViewText: {
    color: '#765000',
    paddingVertical: 2,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  todayButton: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  todayButtonIcon: {
    backgroundColor: '#FDF6E7',
    padding: 4,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#FDF6E7',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  activeButton: {
    backgroundColor: '#765000',
    paddingVertical: 5,
    paddingHorizontal: 15,
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
});

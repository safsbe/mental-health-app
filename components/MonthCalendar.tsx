import {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DateData, Calendar as RNCalendar} from 'react-native-calendars';

type MoodData = {
  date: string;
  mood: number;
};

const moodColors = {
  1: '#d4e4ff', // Very light blue
  2: '#b2d2ff', // Light blue
  3: '#80bfff', // Moderate blue
  4: '#3399ff', // Bright blue
  5: '#0066cc', // Dark blue
  default: '#f5f5dc', // Beige (default)
};

type CalendarViewProps = {
  moodData: MoodData[];
  onDayPress: (date: string) => void; // New prop for handling day press
};

const CalendarView = ({moodData, onDayPress}: CalendarViewProps) => {
  const [markedDates, setMarkedDates] = useState<{
    [key: string]: {
      disabled: string;
      startingDay: boolean;
      color: string;
      endingDay: boolean;
    };
  }>({});
  useEffect(() => {
    const newMarkedDates: {[key: string]: {color: string; textColor: string}} =
      {};

    moodData.forEach(({date, mood}) => {
      const formattedDate = date; // Ensure the date is in YYYY-MM-DD format
      newMarkedDates[formattedDate] = {
        marked: true,
        startingDay: true,
        color: moodColors[mood],
        endingDay: true,
        //dotColor: moodColors[mood] || moodColors.default,
        //selectedColor: '#ffffff', // White text for contrast
      };
    });

    setMarkedDates(newMarkedDates);
  }, [moodData]);
  console.log(markedDates);
  return (
    <View style={{flex: 1}}>
      <RNCalendar
        markedDates={markedDates}
        firstDay={0}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#000000',
          dayTextColor: '#2d4150',
          todayTextColor: '#00adf5',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
        }}
        onDayPress={(day: DateData) => onDayPress(day.dateString)}
      />
    </View>
  );
};

export default CalendarView;

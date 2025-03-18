import {format} from 'date-fns';
import {useEffect, useState, useRef, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  CalendarProvider,
  DateData,
  Calendar as RNCalendar,
  WeekCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import GetWeek from './GetWeek';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [],
  dayNames: [''],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'en';

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
  activeDate: string;
  onDayPress: (date: string) => void; // New prop for handling day press
  callBack: (data: string[]) => void; // Pass data back to parent NewCalendarView
};

export default function CalendarView({
  activeDate,
  onDayPress,
  callBack,
}: CalendarViewProps) {
  const [selected, setSelected] = useState('');

  const markedDates = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
      },
    };
  }, [selected]);

  // console.log(markedDates);

  const [width, setWidth] = useState<number>();

  const createSelected = () => {
    markedDates[selected] = {
      selected: true,
      disableTouchEvent: true,
    };
  };

  createSelected();

  const ref = useRef();

  return (
    <View onLayout={e => setWidth(e.nativeEvent.layout.width)}>
      <CalendarProvider
        date={activeDate} // Set the default selected date as today
        onDateChanged={date => callBack(GetWeek(date))} // Call the parent onDayPress when the date is changed
      >
        <WeekCalendar
          // @ts-ignore
          // ref={ref}
          key={width} // For rerendering the calendar on width change // See this: https://github.com/wix/react-native-calendars/issues/2327#issuecomment-2276606500
          calendarWidth={width}
          firstDay={1}
          markedDates={markedDates}
          allowShadow={false}
          onDayPress={day => onDayPress(day.dateString)} // Handle the day press events
          theme={{
            backgroundColor: 'white',
            calendarBackground: 'white',
            textSectionTitleColor: '#A5A5A5',
            todayTextColor: 'black', // override default color
            dayTextColor: 'black',
            textDayFontWeight: 'bold',
            // todayTextColor: 'white',
            // todayBackgroundColor: '#765000',
            selectedDayBackgroundColor: '#765000',
            selectedDayTextColor: 'white',
            dotColor: '#00adf5',
          }}
        />
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
  },
});

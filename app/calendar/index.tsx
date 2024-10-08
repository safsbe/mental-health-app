import moment from 'moment';
import {Text, View} from 'react-native';

export type CalendarProps = {
  view: 'week' | 'month';
  activeWeekOrMonth?: number;
  activeYear?: number;
  selectedDate: Date;
};

export function Calendar({
  view,
  activeWeekOrMonth,
  activeYear,
  selectedDate,
}: CalendarProps) {
  function isLeapYear(year: number) {
    if (year % 4 !== 0) return false;
    if (year % 100 === 0 && year % 400 !== 0) return false;
    return true;
  }

  const activeMonth = selectedDate.getUTCMonth();
  activeYear = selectedDate.getUTCFullYear();
  const activeMonthStartDay = selectedDate.getDay();

  const monthDayCount = [
    31,
    (() => (isLeapYear(activeYear) ? 29 : 28))(),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const monthStartDay = activeMonth;

  return (
    <View>
      <Text>{moment('MMMM')}</Text>
    </View>
  );
}

export default function CalendarWrapper() {}

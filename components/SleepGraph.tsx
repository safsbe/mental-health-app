import {StyleSheet, Text, View} from 'react-native';
import {criticallyDampedSpringCalculations} from 'react-native-reanimated/lib/typescript/animation/springUtils';

export type GraphProps = {
  style?: CommonStyleProps;
  min?: number;
  max?: number;
  scales: ScaleProps[];
};

type CommonStyleProps = {
  pointColors?: string[];
  pointHeight?: number;
  pointColor?: string;
  slideWidth?: number;
  slideGap?: number;
  slideColor?: string;
};

type ScaleProps = {
  style?: CommonStyleProps;
  point: number;
  label?: string;
  label2?: string;
  color?: string;
  min?: number;
  max?: number;
  highlight?: boolean;
};

function getDefaultDayNumbers() {
  const today = new Date(Date.now());
  const dayOfWeek = today.getDay();

  var result = [];

  for (var i = 0; i < dayOfWeek - 1; i++) {
    var temp = new Date(
      new Date().setDate(new Date().getDate() - (dayOfWeek - 1 - i)),
    );

    result.push(temp.getDate());
  }

  result.push(today.getDate());

  for (var i = 0; i < 7 - dayOfWeek; i++) {
    var temp = new Date(new Date().setDate(new Date().getDate() + (i + 1)));

    result.push(temp.getDate());
  }

  return result;
}

function convertToMinutes(unprocessedTime: number) {
  // Declare first
  var hours = '';
  var minutes = '';

  // Check how many digits
  if (unprocessedTime >= 100) {
    // If unprocessedTime 3 digits or 4 digits
    hours = unprocessedTime.toString().slice(0, -2);
    minutes = unprocessedTime.toString().slice(-2);
  } else if (unprocessedTime <= 59) {
    // If unprocessedTime 2 digits or 1 digit
    minutes = unprocessedTime.toString();
  }

  var inMinutes = 0;

  inMinutes = Number(hours) * 60 + Number(minutes);

  return inMinutes; // counts from 0000 (12am)
}

function getPercentageOfRange(
  startInMinutes: number,
  endInMinutes: number,
  queryInMinutes: number,
) {
  // all values are in minutes (processed values)

  var range = endInMinutes - startInMinutes;
  var correctedStartValue = queryInMinutes - startInMinutes;
  var percentage = (correctedStartValue * 100) / range;

  return percentage;
}

type NewScaleProps = {
  graphStartTime: number;
  graphEndTime: number;
  startTime: number;
  endTime: number;
};

function NewScale({
  graphStartTime,
  graphEndTime,
  startTime,
  endTime,
}: NewScaleProps) {
  // Logic below

  const min = graphEndTime || 0;
  const max = graphStartTime || 120; // 120 pixels high for max

  // check if start time is on 2nd day (next day)

  if (startTime < graphStartTime) {
    startTime = startTime + 2400; // add a day to the calculation to treat it as next day
  }

  // check if end time is on 1st day (before next day)

  if (endTime <= graphEndTime) {
    // e.g. endTime = 2330, graphEndTime = 715

    endTime = endTime + 2400; // add a day to the calculation
  }

  // Assumed that graphEndTime is always on 2nd day, will break if not

  graphEndTime = graphEndTime + 2400;

  const startTimePercentage = getPercentageOfRange(
    convertToMinutes(graphStartTime),
    convertToMinutes(graphEndTime),
    convertToMinutes(startTime),
  );
  const endTimePercentage = getPercentageOfRange(
    convertToMinutes(graphStartTime),
    convertToMinutes(graphEndTime),
    convertToMinutes(endTime),
  );

  // console.log('percent' + startTimePercentage);

  // Style and style logic

  const startTimePaddingHeightInPixels = Math.round(
    (startTimePercentage / 100) * 120,
  );
  const heightOfTimeInPixels = Math.round(
    (endTimePercentage / 100 - startTimePercentage / 100) * 120,
  );

  var scaleColor = '';
  var opacity = 1;

  if (heightOfTimeInPixels >= 0 && heightOfTimeInPixels < 24) {
    scaleColor = '#FA9C93';
  } else if (heightOfTimeInPixels >= 24 && heightOfTimeInPixels < 48) {
    scaleColor = '#FADC8D';
  } else if (heightOfTimeInPixels >= 48 && heightOfTimeInPixels < 72) {
    scaleColor = '#8DFAB7';
  } else if (heightOfTimeInPixels >= 72 && heightOfTimeInPixels < 96) {
    scaleColor = '#8DD0FA';
  } else if (heightOfTimeInPixels >= 96 && heightOfTimeInPixels <= 120) {
    scaleColor = '#8DB0FA';
  } else {
    scaleColor = '#F7F7F7';
    opacity = 0;
  }

  const styles = StyleSheet.create({
    scaleContainer: {
      display: 'flex',
      flex: 1,
      // position: 'relative',
      height: 120, // fixed height to match other 2 graphs
      width: 24, // fixed width to match other 2 graphs
      maxWidth: 24,
      // backgroundColor: '#F7F7F7',
      // backgroundColor: 'pink',
    },
    scaleOuter: {
      // top: 0,
      // left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#F7F7F7',
      // backgroundColor: 'black',
      borderRadius: 6,
    },
    scaleInner: {
      marginTop: startTimePaddingHeightInPixels,
      width: '100%',
      height: heightOfTimeInPixels,
      // height: '100%',
      backgroundColor: scaleColor,
      borderRadius: 6,
      opacity: opacity,
    },
  });

  return (
    <View style={styles.scaleContainer}>
      <View style={styles.scaleOuter}>
        {/* <Text>A?</Text> */}
        <View style={styles.scaleInner}></View>
      </View>
    </View>
  );
}

export function SleepHoursGraph({dayNumbers}: {dayNumbers: number[]}) {
  // need to add new logic to process incoming data from async storage or wherever else

  const styles = StyleSheet.create({
    root: {
      height: 140,
      width: '100%',
      gap: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    root2: {
      display: 'flex',
      flex: 1,
      height: '100%',
      width: '100%',
      gap: 15,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'flex',
      flex: 1,
      height: '100%',
      width: '100%',
      gap: 15,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayName: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 6,
      color: '#A5A5A5',
    },
    dayNumber: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

  console.log('refresh');

  // Data for the labels

  const thisWeekDayNumbers = getDefaultDayNumbers();

  const dayNameShort = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <View style={styles.container}>
      {mockData.map(({startTime, endTime}, index) => (
        <View key={index}>
          <NewScale
            graphStartTime={2100}
            graphEndTime={715}
            startTime={startTime}
            endTime={endTime}
          />
          <Text style={styles.dayName}>{dayNameShort[index]}</Text>
          <Text style={styles.dayNumber}>
            {dayNumbers != undefined
              ? dayNumbers[index]
              : thisWeekDayNumbers[index]}
          </Text>
        </View>
      ))}
    </View>
  );
}

const mockData = [
  {
    startTime: 2230,
    endTime: 630,
  },
  {
    startTime: 2100,
    endTime: 615,
  },
  {
    startTime: 2230,
    endTime: 2345,
  },
  {
    startTime: 130,
    endTime: 445,
  },
  {
    startTime: 145,
    endTime: 200,
  },
  {
    startTime: 2230,
    endTime: 630,
  },
  {
    startTime: 2230,
    endTime: 715,
  },
];

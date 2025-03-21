import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function ScaleBlock({value = -1}: {value: number}) {
  var color = '';
  var radius = 0;

  switch (value) {
    case 0: {
      color = '#FA9C93';
      radius = 6;
      break;
    }
    case 1: {
      color = '#FADC8D';
      radius = 6;
      break;
    }
    case 2: {
      color = '#8DFAB7';
      radius = 6;
      break;
    }
    case 3: {
      color = '#8DD0FA';
      radius = 6;
      break;
    }
    case 4: {
      color = '#8DB0FA';
      radius = 6;
      break;
    }
    default: {
      color = '#F7F7F7';
      radius = 6;
      break;
    }
  }

  const styles = StyleSheet.create({
    block: {
      height: 24,
      width: 24,
      backgroundColor: color,
      borderRadius: radius,
    },
  });

  return <View style={styles.block}></View>;
}

function Scale({value = -1}: {value: number}) {
  const list = [];
  // const

  if (value >= -1 && value <= 4) {
    for (var i = 0; i < 5; i++) {
      if (i === value) {
        list.unshift(i); // colored box
      } else {
        list.unshift(-1); // uncolored box
      }
    }
  } else {
    console.log('ERROR: INVALID VALUE RECEIVED');
  }

  const styles = StyleSheet.create({
    scaleContainer: {
      display: 'flex',
      flex: 1,
      maxWidth: 24,
      width: 24,
      height: 120,
      borderRadius: 6,
      backgroundColor: '#F7F7F7',
    },
  });

  // console.log(list);

  return (
    <View style={styles.scaleContainer}>
      {list.map((value, index) => (
        <ScaleBlock key={index} value={value} />
      ))}
    </View>
  );
}

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

export function Graph({
  scaleData,
  dayNumbers,
}: {
  scaleData: (number | null)[];
  dayNumbers: number[];
}) {
  const dayNameShort = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // console.log(scaleData);

  const styles = StyleSheet.create({
    root: {
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

  // console.log(dayNumbers);

  const thisWeekDayNumbers = getDefaultDayNumbers();

  return (
    <View style={styles.root}>
      {scaleData.map((value, index) => {
        if (!value) value = 0;
        return (
          <View key={index}>
            <Scale value={value - 1} />
            <Text style={styles.dayName}>{dayNameShort[index]}</Text>
            <Text style={styles.dayNumber}>
              {dayNumbers != undefined
                ? dayNumbers[index]
                : thisWeekDayNumbers[index]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

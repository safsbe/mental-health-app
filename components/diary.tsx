import {PropsWithChildren, ReactElement, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {minutesInDay} from 'date-fns/constants';
import {time} from 'drizzle-orm/mysql-core';
import {min} from 'drizzle-orm';

export function Group({title, children}: PropsWithChildren & {title?: string}) {
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 20,
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#D9CBAE',
      }}
    >
      {title && (
        <Text
          style={{
            margin: 6,
            fontSize: 20,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}

export function Section({
  title,
  titleRight,
  children,
}: PropsWithChildren & {title?: string; titleRight?: ReactElement}) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 6,
      margin: 6,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#FDF6E7',
      gap: 5,
    },
    titleText: {
      color: '#765000',
      fontSize: 16,
      fontWeight: '400',
      flexGrow: 1,
    },
    titleRight: {
      color: '#765000',
      fontSize: 14,
      fontWeight: '300',
    },
  });

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.titleRight}>{titleRight}</View>
      </View>
      {children}
    </View>
  );
}

function filterToNumber(number: string) {
  var result = number.replace(/[^0-9]/g, '');

  return Number(result);
}

export function NumberInputComponent({
  title,
  callBack,
}: {
  title: string;
  callBack: ({title, number}: {title: string; number: number}) => void;
}) {
  const [number, setNumber] = useState(0);

  const styles = StyleSheet.create({
    root: {
      maxWidth: 56,
      width: 56,
      height: 28,
      backgroundColor: 'white',
      borderColor: '#D9CBAE',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    input: {
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={number.toString()}
        onChangeText={number => setNumber(filterToNumber(number))}
        onEndEditing={() => callBack({title, number})}
        keyboardType="numeric"
        maxLength={2}
      />
    </View>
  );
}

export function TextInputDesign({
  title,
  callBack,
}: {
  title: string;
  callBack: ({title, textValue}: {title: string; textValue: string}) => void;
}) {
  const [text, onChangeText] = useState('');

  function checkThenCallBack() {
    if (text.trim() == '') {
      return;
    } else {
      callBack({title, text});
    }
  }

  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      gap: 10,
    },
    input: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: '#D9CBAE',
      borderWidth: 1,
      flexGrow: 1,
      height: 28,
    },
    button: {
      maxWidth: 56,
      width: 56,
      height: 28,
      borderRadius: 5,
      paddingVertical: 4,
      paddingHorizontal: 15,
      backgroundColor: '#D9CBAE',
    },
    buttonText: {
      textAlign: 'center',
      color: '#765000',
      fontSize: 14,
      paddingTop: 2,
    },
  });

  return (
    <View style={styles.root}>
      <TextInput style={styles.input} onChangeText={onChangeText} />
      <Pressable style={styles.button} onPress={() => checkThenCallBack()}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

function convert(value: Date) {
  const hours = value.getHours().toString();
  const minutes = value.getMinutes().toString();

  var finalString = '';

  if (Number(hours) == 0) {
    finalString += '00';
  } else if (Number(hours) > 0 && Number(hours) < 10) {
    finalString += '0' + hours;
  } else {
    finalString += hours;
  }

  finalString += ':';

  if (Number(minutes) == 0) {
    finalString += '00';
  } else if (Number(minutes) > 0 && Number(minutes) < 10) {
    finalString += '0' + minutes;
  } else {
    finalString += minutes;
  }

  return finalString;
}

export function SleepDurationInput({
  callBack,
}: {
  callBack: ({start, end}: {start: Date; end: Date}) => void;
}) {
  // set default times first
  const hours = new Date(Date.now()).getHours();
  const minute = new Date(Date.now()).getMinutes();

  const defaultTime = hours.toString() + ':' + minute.toString();

  const [inputStartTime, setInputStartTime] = useState(new Date(Date.now()));
  const [inputEndTime, setInputEndTime] = useState(new Date(Date.now()));

  const processAndCallBackEndTime = data => {
    // const newState = [...inputStartTime];

    var timestamp = new Date(data.nativeEvent.timestamp);

    setInputEndTime(timestamp);

    callBack([inputStartTime, timestamp]);
  };

  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flex: 1,
      gap: 10,
    },
    row: {
      flexDirection: 'row',
    },
    text: {
      color: '#A5A5A5',
      flexGrow: 1,
      alignSelf: 'center',
    },
    pickerText: {
      textAlign: 'center',
      fontSize: 14,
      paddingTop: 4,
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={styles.text}>Start Time</Text>
        <View style={styles.picker}>
          {Platform.OS === 'ios' ? (
            <RNDateTimePicker
              mode="time"
              value={inputStartTime}
              onChange={value =>
                setInputStartTime(new Date(value.nativeEvent.timestamp))
              }
            />
          ) : (
            <View
              style={{
                width: 56,
                height: 28,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                borderColor: '#D9CBAE',
                borderWidth: 1,
                display: 'flex',
              }}
            >
              <Text
                style={styles.pickerText}
                onPress={() =>
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    value: new Date(),
                    onChange: value =>
                      setInputStartTime(new Date(value.nativeEvent.timestamp)),
                  })
                }
              >
                {convert(inputStartTime)}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>End Time</Text>
        <View style={styles.picker}>
          {Platform.OS === 'ios' ? (
            <RNDateTimePicker
              mode="time"
              value={inputEndTime}
              onChange={value =>
                setInputEndTime(new Date(value.nativeEvent.timestamp))
              }
            />
          ) : (
            <View
              style={{
                width: 56,
                height: 28,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                borderColor: '#D9CBAE',
                borderWidth: 1,
                display: 'flex',
              }}
            >
              <Text
                style={styles.pickerText}
                onPress={() =>
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    value: new Date(),
                    onChange: value => processAndCallBackEndTime(value),
                  })
                }
              >
                {convert(inputEndTime)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export function TextBoxDesign({
  data,
  title,
  callBack,
}: {
  data: string[];
  title: string;
  callBack: ({title, data}: {title: string; data: string[]}) => void;
}) {
  const handleDeleteRequest = (text: string) => {
    // console.log(data)

    var filteredData = data.filter(x => x !== text);

    data = filteredData;

    callBack({title, data});
  };

  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flex: 1,
      gap: 5,
      // marginTop: 5,
    },
  });

  return (
    <View style={styles.root}>
      {data != undefined && data.length != 0 ? (
        data.map((text, index) => (
          <TextBoxInternal
            key={index}
            text={text}
            deleteRequest={handleDeleteRequest}
          />
        ))
      ) : (
        <View style={{height: 0}}></View>
      )}
    </View>
  );
}

export function TextBoxInternal({
  text,
  deleteRequest,
}: {
  text: string;
  deleteRequest: (text: string) => void;
}) {
  const styles = StyleSheet.create({
    textContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: '#D9CBAE',
      borderWidth: 1,
    },
    text: {
      flex: 1,
      flexGrow: 1,
      paddingVertical: 4,
    },
    trashIcon: {
      paddingVertical: 4,
      paddingHorizontal: 5,
    },
  });

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={() => deleteRequest(text)} style={styles.trashIcon}>
        <Ionicons name="trash-outline" size={16} color="black" />
      </Pressable>
    </View>
  );
}

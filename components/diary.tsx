import {PropsWithChildren, useState} from 'react';
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
} from '@react-native-community/datetimepicker';

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
}: PropsWithChildren & {title?: string; titleRight?: string}) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 6,
      margin: 6,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#FDF6E7',
    },
    titleText: {
      color: '#765000',
      fontSize: 16,
      fontWeight: '400',
      marginBottom: 10,
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
        <Text style={styles.titleRight}>{titleRight}</Text>
      </View>
      {children}
    </View>
  );
}

export function TextInputDesign({
  title,
  callBack,
}: {
  title: string;
  callBack: ({title, text}: {title: string; text: string}) => void;
}) {
  const [text, onChangeText] = useState('');

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
      borderRadius: 5,
      paddingVertical: 4,
      paddingHorizontal: 15,
      backgroundColor: '#D9CBAE',
    },
    buttonText: {
      color: '#765000',
    },
  });

  return (
    <View style={styles.root}>
      <TextInput style={styles.input} onChangeText={onChangeText} />
      <Pressable style={styles.button} onPress={() => callBack({title, text})}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

export function SleepDurationInput() {
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
    picker: {},
  });

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={styles.text}>Start Time</Text>
        <View style={styles.picker}>
          {Platform.OS === 'ios' ? (
            <RNDateTimePicker
              mode="time"
              value={new Date()}
              minuteInterval={5}
            />
          ) : (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                borderColor: '#D9CBAE',
                borderWidth: 1,
              }}
            >
              <Text
                onPress={() =>
                  DateTimePickerAndroid.open({
                    mode: 'time',
                    value: new Date(),
                    minuteInterval: 5,
                  })
                }
              >
                15:10
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>End Time</Text>
        <View style={styles.picker}>
          <RNDateTimePicker mode="time" value={new Date()} minuteInterval={5} />
        </View>
      </View>
    </View>
  );
}

export function TextBoxDesign({
  displayText,
  callBack,
}: {
  displayText: string;
  callBack: (text: string) => void;
}) {
  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flex: 1,
      marginTop: 5,
    },
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
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{displayText}</Text>
        <Pressable
          onPress={() => callBack(displayText)}
          style={styles.trashIcon}
        >
          <Ionicons name="trash-outline" size={16} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

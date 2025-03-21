import {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, Stack} from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import {HeaderBackButton} from '@react-navigation/elements';
import Goals from '@/components/Goals';
import RNPickerSelect from 'react-native-picker-select';

const goalTitles = [
  'Break Bad Habits',
  'Learn More',
  'Keep Calm',
  'Form Good Habits',
  'Manage Stress',
  'Journalling',
];

const goalImages = [
  require('../../assets/guest/Break Bad Habits.png'),
  require('../../assets/guest/Learn More.png'),
  require('../../assets/guest/Keep Calm.png'),
  require('../../assets/guest/Form Good Habits.png'),
  require('../../assets/guest/Manage Stress.png'),
  require('../../assets/guest/Journalling.png'),
];

export default function GuestStart() {
  const [alias, setAlias] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [appKnowledge, setAppKnowledge] = useState<string>('');
  const pickerRef1 = useRef();
  const pickerRef2 = useRef();
  const [testState, setTestState] = useState<string>('');

  const [selectedGoals, setSelectedGoals] = useState<boolean[]>(
    Array(6).fill(false),
  ); // Track selected goals

  async function lockApplicationPortrait() {
    await ScreenOrientation.lockAsync(2);
  }

  lockApplicationPortrait();

  const handleSave = async () => {
    const selectedGoalTitles = goalTitles.filter(
      (_, index) => selectedGoals[index],
    );
    const selectedGoalImages = goalImages.filter(
      (_, index) => selectedGoals[index],
    );

    if (!alias || selectedGoals.length === 0) {
      Alert.alert(
        'Error',
        'Please fill all fields and select at least one goal',
      );
      return;
    }

    try {
      await AsyncStorage.setItem('alias', alias);
      await AsyncStorage.setItem('purpose', purpose);
      await AsyncStorage.setItem('appKnowledge', appKnowledge);
      await AsyncStorage.setItem('authToken', 'guest'); // Moved from login page to here.
      await AsyncStorage.setItem(
        'goals',
        JSON.stringify({
          titles: selectedGoalTitles,
          images: selectedGoalImages,
        }),
      );

      router.replace('/(drawer)/(tabs)'); // Navigate to tabs after saving
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const handleGoalSelect = (index: number) => {
    const updatedSelectedGoals = [...selectedGoals];
    updatedSelectedGoals[index] = !updatedSelectedGoals[index]; // Toggle goal selection
    setSelectedGoals(updatedSelectedGoals);
  };

  function resetInputs() {
    // This function strategically breaks something to reset the dropdowns and clear their options (I think)

    // @ts-ignore
    pickerRef1.current.state.selectedItem = pickerRef1.current.state.items[0];
    // @ts-ignore
    pickerRef2.current.state.selectedItem = pickerRef2.current.state.items[0];

    setAlias('');

    // console.log(pickerRef1.current.state.selectedItem);

    // @ts-ignore
    setTestState(pickerRef1.current.state);
    // @ts-ignore
    setTestState(pickerRef2.current.state);
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          // @ts-ignore
          title: 'Continue As Guest',
          headerTitleStyle: {fontWeight: 'bold'},
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              // @ts-ignore
              onPress={() => router.replace('/start')}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome! Let's get to know you</Text>

        <Text style={styles.questionText}>1. What should we call you?</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name / alias"
          value={alias}
          onChangeText={setAlias}
        />

        <Text style={styles.questionText}>
          2. What is your purpose of using this app?
        </Text>

        {/* <View style={styles.pickerContainer}>
          <RNPickerSelect
            // @ts-ignore
            ref={pickerRef1}
            style={pickerStyles}
            itemKey={testState}
            onValueChange={value => setPurpose(value)}
            items={[
              {label: 'Break Bad Habits', value: 'Break Bad Habits'},
              {label: 'Form Good Habits', value: 'Form Good Habits'},
              {label: 'Manage Stress', value: 'Manage Stress'},
              {label: 'Journalling', value: 'Journalling'},
              {label: 'Others', value: 'Others'},
            ]}
          />
        </View> */}

        {/* Goals Components */}
        <View style={styles.goalsContainer}>
          {goalTitles.map((title, index) => (
            <Goals
              key={index}
              title={title}
              image={goalImages[index]}
              isSelected={selectedGoals[index]}
              onSelect={() => handleGoalSelect(index)}
            />
          ))}
        </View>

        <Text style={styles.questionText}>
          3. How did you hear of this app? (Optional)
        </Text>

        <View style={styles.pickerContainer}>
          <RNPickerSelect
            // @ts-ignore
            ref={pickerRef2}
            style={pickerStyles}
            itemKey={testState}
            onValueChange={value => setAppKnowledge(value)}
            items={[
              {label: 'Superiors', value: 'Superiors'},
              {label: 'Friends', value: 'Friends'},
              {label: 'DPPH', value: 'DPPH'},
              {
                label: 'CSSCOM Well-Being Channel',
                value: 'CSSCOM Well-Being Channel',
              },
              {label: 'Others', value: 'Others'},
            ]}
          />
        </View>

        <View style={styles.finalButtonContainer}>
          <Text style={styles.clearButton} onPress={() => resetInputs()}>
            Clear
          </Text>
          <Text style={styles.nextButton} onPress={handleSave}>
            Next
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  questionText: {
    paddingVertical: 10,
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  pickerContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  finalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  clearButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    minWidth: '10%',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#765000',
    borderColor: '#765000',
  },
  nextButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    minWidth: '10%',
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: '#2A4E4C',
    color: '#2A4E4C',
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    margin: 10,
  },
  inputAndroid: {
    margin: 10,
  },
});

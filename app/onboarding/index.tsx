import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {router} from 'expo-router';
import Goals from '@/components/Goals';
import * as ScreenOrientation from 'expo-screen-orientation';

const goalTitles = [
  'Break Bad Habits',
  'Learn More',
  'Keep Calm',
  'Form Good Habits',
  'Manage Stress',
  'Journalling',
];
const goalImage = require('../../assets/placeholders/400x400.svg');
const goalImages = [
  goalImage,
  goalImage,
  goalImage,
  goalImage,
  goalImage,
  goalImage,
];

export default function Onboarding() {
  const [alias, setAlias] = useState<string>('');
  const [dob, setDob] = useState<Date>(new Date());
  const [selectedGoals, setSelectedGoals] = useState<boolean[]>(
    Array(6).fill(false),
  ); // Track selected goals
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

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

    if (!alias || !dob || selectedGoalTitles.length === 0) {
      Alert.alert(
        'Error',
        'Please fill all fields and select at least one goal',
      );
      return;
    }

    try {
      await AsyncStorage.setItem('alias', alias);
      await AsyncStorage.setItem('dob', dob.toISOString());
      await AsyncStorage.setItem(
        'goals',
        JSON.stringify({
          titles: selectedGoalTitles,
          images: selectedGoalImages,
        }),
      );
      await AsyncStorage.setItem('authToken', 'guest'); // Moved from login page to here.

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

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome! Let's get to know you</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={alias}
        onChangeText={setAlias}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePicker}
      >
        <Text>{dob ? dob.toDateString() : 'Select Date of Birth'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDob(selectedDate);
            }
          }}
        />
      )}

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

      <Button title="Next" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
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
  datePicker: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

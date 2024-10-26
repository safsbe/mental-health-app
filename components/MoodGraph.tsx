import {View, Text, StyleSheet} from 'react-native';

type MoodGraphProps = {
  selectedDate: string;
};

const MoodGraph = ({selectedDate}: MoodGraphProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selected Date: {selectedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MoodGraph;

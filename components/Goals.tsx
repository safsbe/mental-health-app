import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

type GoalsProps = {
  title: string;
  image: any;
  isSelected: boolean;
  onSelect: () => void;
};

const Goals: React.FC<GoalsProps> = ({title, image, isSelected, onSelect}) => {
  return (
    <TouchableOpacity
      style={[styles.goal, isSelected && styles.selected]}
      onPress={onSelect}
    >
      <Image source={image} style={styles.image} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goal: {
    width: '45%',
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  selected: {
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default Goals;

import {Image} from 'expo-image';
import {router} from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Activities() {
  const handlePress = () => {
    router.push('/meditation/meditation');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      {/* Image on the left */}
      <Image
        source={require('../assets/activities/meditation.svg')}
        style={styles.image}
      />
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Overwhelmed and unable to focus?</Text>
        {/* Description */}
        <Text style={styles.description}>
          Take this mindful pause for a 5 minute break
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: '#FFE7E7',
    borderRadius: 6,
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

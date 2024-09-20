import { router } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


export default function Activities() {
  const handlePress = () =>{
    router.push("/meditation");
  }
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      {/* Image on the left */}
      <Image source={require('../assets/activities/Stressed_Out_Graphic.png')} style={styles.image} />
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Overwhelmed and unable to focus?</Text>
        {/* Description */}
        <Text style={styles.description}>Take this mindful pause for a 5 minute break</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor:"#FFDDF9",
    borderRadius: 10,
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
    paddingBottom:15,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

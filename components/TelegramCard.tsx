import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For Telegram icon

type TelegramCardProps = {
  image: { uri: string };
  title: string;
  description: string;
  backgroundColor: string;
};

function TelegramCard({ image, title, description, backgroundColor = '#9BD8AC' }:TelegramCardProps) {
  return (
    <View style={[styles.card, {backgroundColor}]}>
      {/* Image on the left */}
      <Image source={image} style={styles.image} />

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Telegram Icon at the bottom left corner */}
      <TouchableOpacity style={styles.telegramIcon}>
        <FontAwesome name="telegram" size={28}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  telegramIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default TelegramCard;
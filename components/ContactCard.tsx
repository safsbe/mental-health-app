import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For phone icon

type ContactCardProps = {
  organisation: string;
  phoneNumber: string;
  details: string;
};

function ContactCard({ organisation, phoneNumber, details }:ContactCardProps) {
  const handlePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.orgText}>{organisation}</Text>
          <Text style={styles.detailsText}>{phoneNumber} • {details}</Text>
        </View>
        <Ionicons name="call" size={24} color="blue" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orgText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 13,
    color: '#555',
  },
});

export default ContactCard;
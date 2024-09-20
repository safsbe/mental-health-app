import React from 'react';
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'; // For phone icon

type ContactCardProps = {
  organisation: string;
  phoneNumber: string;
  details: string;
  mode: 'flat' | 'raised';
};

function ContactCard({
  organisation,
  phoneNumber,
  details,
  mode,
}: ContactCardProps) {
  const handlePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity
      style={mode === 'flat' ? styles.cardFlat : styles.cardRaised}
      onPress={handlePress}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.orgText}>{organisation}</Text>
          <Text style={styles.detailsText}>
            {phoneNumber} • {details}
          </Text>
        </View>
        <Ionicons name="call" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardFlat: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },
  cardRaised: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#F6F6F6',
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

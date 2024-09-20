import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';
import ContactCard from '@/components/ContactCard';

export default function SOSScreen() {
  const handleSOSPress = () => {
    Linking.openURL('tel:+123456789'); // Replace with the actual telephone number
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Large text placeholder1 */}
      <Text style={styles.largeText}>You are not alone.</Text>
      <Text style={styles.largeText}>We're here to help.</Text>

      {/* Text placeholder2 */}
      <Text style={styles.text}>You will remain anonymous</Text>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <Text style={styles.sosButtonBigText}>SOS</Text>
        <Text style={styles.sosButtonSmallText}>Samaritans of Singapore</Text>
        <Text style={styles.sosButtonSmallText}>Helpline 1767</Text>
      </TouchableOpacity>

      {/* Contact Cards for General Mental  */}
      <Text style={styles.leftText}>General Mental Well-Being</Text>

      {/* Contact Card for IMH*/}
      <ContactCard 
        organisation="Insititute of Mental Health" 
        phoneNumber="63892222" 
        details="24/7 available" 
      />

      {/* Contact Card for SOS*/}
      <ContactCard 
        organisation="Samaritans of Singapore" 
        phoneNumber="63892222" 
        details="24/7 available" 
      />

      {/* Contact Card for NCH*/}
      <ContactCard 
        organisation="National Care Helpline" 
        phoneNumber="+1800 202 6868" 
        details="Daily 8am-12am" 
      />

      {/* Contact Card for SRS*/}
      <ContactCard 
        organisation="Silver Ribbon Singapore" 
        phoneNumber="6385 3714" 
        details="24/7 available" 
      />

      <Text style={styles.leftText}>Services Helpline</Text>

      <ContactCard 
        organisation="Singapore Armed Forces" 
        phoneNumber="1800 278 0022" 
        details="24/7 available" 
      />
      <ContactCard 
        organisation="Singapore Civil Defence Force" 
        phoneNumber="1800 286 6666" 
        details="24/7 available" 
      />
      <ContactCard 
        organisation="Singapore Police Force" 
        phoneNumber="1800 255 1151"
        details="Weekdays 8:30am-6:30pm" 
      />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:50,
    paddingHorizontal:20,
    paddingBottom:30,
  },
  largeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  sosButton: {
    backgroundColor: 'orange',
    paddingVertical: 55,
    paddingHorizontal: 15,
    borderRadius: 5000, // Rounded button
    marginBottom: 20,
    alignItems: 'center',
  },
  sosButtonBigText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  sosButtonSmallText: {
    fontSize: 15,
    color: 'white',
    
  },
  leftText: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'flex-start', // Align text to the left
  },
});
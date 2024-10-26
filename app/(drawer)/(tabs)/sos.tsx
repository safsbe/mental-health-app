import {
  Linking,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ContactCard from '@/components/ContactCard';

function SOSButton() {
  const sosHelpline = '1767';

  const handleSOSPress = (phoneNumber: string) => {
    Linking.openURL('tel:' + phoneNumber);
  };

  const styles = StyleSheet.create({
    sosHoning1: {
      marginBottom: 30,
      borderRadius: 5000,
      backgroundColor: '#FCEDD0',
      padding: 15,
      width: '90%',
      maxWidth: 200,
      maxHeight: 200,
      height: '90%',
    },
    sosHoning2: {
      borderRadius: 5000,
      backgroundColor: '#F5D596',
      padding: 15,
      width: '100%',
      height: '100%',
    },
    sosHoning3: {
      borderRadius: 5000,
      backgroundColor: '#E09400',
      padding: 10,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
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
      textAlign: 'center',
    },
    sosButtonSmallText: {
      fontSize: 15,
      color: 'white',
      textAlign: 'center',
    },
  });

  return (
    <Pressable
      style={styles.sosHoning1}
      onPress={() => handleSOSPress(sosHelpline)}
    >
      <View style={styles.sosHoning2}>
        <View style={styles.sosHoning3}>
          <Text style={styles.sosButtonBigText}>SOS</Text>
          <Text style={styles.sosButtonSmallText}>Samaritans of Singapore</Text>
          <Text style={styles.sosButtonSmallText}>Helpline: 1767</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function SOSScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Large text placeholder1 */}
      <Text style={styles.largeText}>You are not alone.</Text>
      <Text style={styles.largeText}>We're here to help.</Text>

      {/* Text placeholder2 */}
      <Text style={styles.text}>You will remain anonymous</Text>

      {/* SOS Button */}
      <SOSButton />

      <Text style={styles.text}>
        The button will bing up your phone's dialer but will not call
        imediately.
      </Text>

      {/* Contact Cards for General Mental  */}
      <Text style={styles.leftText}>General Mental Well-Being</Text>

      {/* Contact Card for IMH*/}
      <ContactCard
        organisation="Insititute of Mental Health"
        phoneNumber="63892222"
        details="24/7Hrs"
        mode="flat"
      />

      {/* Contact Card for SOS*/}
      <ContactCard
        organisation="Samaritans of Singapore"
        phoneNumber="63892222"
        details="24/7Hrs"
        mode="flat"
      />

      {/* Contact Card for NCH*/}
      <ContactCard
        organisation="National Care Helpline"
        phoneNumber="+1800 202 6868"
        details="Daily 8am-12am"
        mode="flat"
      />

      {/* Contact Card for SRS*/}
      <ContactCard
        organisation="Silver Ribbon Singapore"
        phoneNumber="6385 3714"
        details="24/7Hrs"
        mode="flat"
      />

      <Text style={styles.leftText}>Services Helpline</Text>

      <ContactCard
        organisation="Singapore Armed Forces"
        phoneNumber="1800 278 0022"
        details="24/7Hrs"
        mode="flat"
      />
      <ContactCard
        organisation="Singapore Civil Defence Force"
        phoneNumber="1800 286 6666"
        details="24/7Hrs"
        mode="flat"
      />
      <ContactCard
        organisation="Singapore Police Force"
        phoneNumber="1800 255 1151"
        details="Weekdays 8.30am-6.30pm"
        mode="flat"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  largeText: {
    fontSize: 30,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    color: '#A5A5A5',
    fontSize: 14,
    marginBottom: 20,
  },
  leftText: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'flex-start', // Align text to the left
  },
});

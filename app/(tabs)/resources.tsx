import { ScrollView, Text, StyleSheet } from 'react-native';
import TelegramCard from '@/components/TelegramCard';
import ContactCard from '@/components/ContactCard';

export default function ResourcesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Large text */}
      <Text style={styles.largeText}>Stay updated</Text>

      {/* Small text */}
      <Text style={styles.smallText}>Telegram</Text>

      {/* Telegram Card */}
      <TelegramCard
        image={require('../../assets/resources_tab/telegram_image_1.png')} //
        title="CSSCOM Well-Being"
        description="Join our Telegram channel for a daily mental well-being boost."
        backgroundColor = "#9BD8AC"
      />
      <TelegramCard
        image={require('../../assets/resources_tab/telegram_image_2.png')} //
        title="CSSCOM Well-Being"
        description="Join our Telegram channel for a daily mental well-being boost."
        backgroundColor='#9FD4D1'
      />
      <Text style={styles.smallText}>Useful Contacts</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  smallText: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});
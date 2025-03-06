import {ScrollView, Text, StyleSheet} from 'react-native';
import TelegramCard from '@/components/TelegramCard';
import ContactCard from '@/components/ContactCard';

export default function ResourcesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Large text */}
      <Text style={styles.largeText}>Stay updated with us</Text>

      {/* Small text */}
      <Text style={styles.smallText}>Telegram</Text>

      {/* Telegram Card */}
      <TelegramCard
        image={require('../../../assets/resources_tab/csscom_wellbeing_channel.svg')} //
        title="CSSCOM Well-Being"
        description="Join our Telegram channel for a daily mental well-being boost"
        backgroundColor="#DEF7E5"
        link="http://go.gov.sg/wbc"
      />
      <TelegramCard
        image={require('../../../assets/resources_tab/mindline_sg.svg')} //
        title="Mindline.sg"
        description="Current tips to cope ina competitive environment"
        backgroundColor="#DDF1FE"
        link="https://t.me/letstalkbymindline"
      />
      {/* <Text style={styles.smallText}>Useful Contacts</Text>
      <ContactCard
        organisation="Singapore Armed Forces"
        phoneNumber="1800 278 0022"
        details="24/7Hrs"
        mode="raised"
      />
      <ContactCard
        organisation="Singapore Civil Defence Force"
        phoneNumber="1800 286 6666"
        details="24/7Hrs"
        mode="raised"
      />
      <ContactCard
        organisation="Singapore Police Force"
        phoneNumber="1800 255 1151"
        details="Weekdays 8.30am-6.30pm"
        mode="raised"
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  largeText: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: '#2A4E4C',
    fontSize: 32,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 18,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
});

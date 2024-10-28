import React, {useState, useEffect, useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {quotes} from '@/db/schema';
import {FontAwesome} from '@expo/vector-icons';
import {DrizzleProvider, useDrizzle} from '@/providers/drizzle';

const Quote = () => {
  const db = useDrizzle();
  const [quote, setQuote] = useState('');
  db.select().from(quotes).limit(1).then(x => setQuote(x[0].text))

  return (
    <View style={styles.quoteContainer}>
      <FontAwesome
        name="quote-right"
        size={24}
        color="white"
        style={styles.icon}
      />
      <Text style={styles.quoteText}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A4E4C',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, // Space between the icon and the text
  },

  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 10,
    color: '#ffffff',
  },
});

export default Quote;

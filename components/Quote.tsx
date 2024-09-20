import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import quotes from '../assets/quotes.json';
import { FontAwesome } from "@expo/vector-icons";

const Quote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = () => {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      const todayQuote = quotes.find((q: { date: string }) => q.date === currentDate);

      if (todayQuote) {
        setQuote(todayQuote.quote);
      } else {
        setQuote('No quote for today.');
      }
    };

    fetchQuote();

  }, []);

  return(
    <View style={styles.quoteContainer}>
      <FontAwesome name="quote-right" size={24} color="white" style={styles.icon} />
      <Text style={styles.quoteText}>{quote}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flexDirection: 'row',
    backgroundColor: '#32452d',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, // Space between the icon and the text
  },

  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 10,
    color:'#ffffff',
  },
});

export default Quote;

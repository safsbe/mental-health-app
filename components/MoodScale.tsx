import { diaryEntries } from '@/db/schema';
import { useDrizzle } from '@/providers/drizzle';
import { and, gte, lt } from 'drizzle-orm';
import {Image} from 'expo-image';
import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {eq} from 'drizzle-orm';

export default function MoodScale() {
  const moodImages = [
    require('../assets/moodscale/sad_full.svg'),
    require('../assets/moodscale/sad_slight.svg'),
    require('../assets/moodscale/neutral.svg'),
    require('../assets/moodscale/happy_slight.svg'),
    require('../assets/moodscale/happy_full.svg'),
  ];

  const [mood, setMood] = useState<number | null>(null);
  let targetDbKey: Date;

  const db = useDrizzle();
  let todayStart = new Date();
  todayStart.setHours(0);
  todayStart.setMinutes(0);
  todayStart.setSeconds(0);
  let todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);
  
  useEffect(() => {
    todayStart = new Date();
    todayStart.setHours(0);
    todayStart.setMinutes(0);
    todayStart.setSeconds(0);
    todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
      console.log("BEEP");
      if (targetDbKey) {
      console.log("BOOP");
        db.update(diaryEntries).set({
          moodScale: mood,
        }).where(eq(diaryEntries.createdOn, targetDbKey));
      } else {
        console.log("BAAP" + mood);
        db.insert(diaryEntries).values({moodScale: mood}).then(x => {
          console.log("GOOB");
          
          db.select().from(diaryEntries).where(and(gte(diaryEntries.createdOn, todayStart), lt(diaryEntries.createdOn, todayEnd))).limit(1).then(x => {
            if (x[0]) {
              targetDbKey = x[0].createdOn;
            }
          });
        });
      }}, [mood])
  
  db.select().from(diaryEntries).where(and(gte(diaryEntries.createdOn, todayStart), lt(diaryEntries.createdOn, todayEnd))).limit(1).then(x => {
    if (x[0]) {
      setMood(x[0]?.moodScale);
      targetDbKey = x[0].createdOn;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.callToAction}>What is your mood today?</Text>
      <View style={styles.moodContainer}>
        {moodImages.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => mood === index ? setMood(null) : setMood(index)}>
            <Image
              source={img}
              style={{
                ...styles.moodImage,
                ...(mood === index ? styles.moodImageActive : {}),
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  moodContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callToAction: {
    color: '#765000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moodImage: {
    width: 50,
    height: 50,
    opacity: 30,
  },
  moodImageActive: {
    opacity: 100,
  },
});

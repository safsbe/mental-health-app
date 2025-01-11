import {View, Text, Pressable, StyleSheet, BackHandler} from 'react-native';
import {Image} from 'expo-image';
import {router, Stack, useLocalSearchParams} from 'expo-router';
import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import {HeaderBackButton} from '@react-navigation/elements';

export default function Articles() {
  async function changeOrientation() {
    await ScreenOrientation.lockAsync(2); // Sets to ANY portrait => See https://docs.expo.dev/versions/latest/sdk/screen-orientation/#orientationlock
  }

  // @ts-ignore
  BackHandler.addEventListener('hardwareBackPress', function () {
    changeOrientation();
  });

  // changeOrientation();

  const {category} = useLocalSearchParams<{category?: string}>(); // get the category
  let headerTitle = '';

  console.log({category});

  const ArticleList = [
    {
      category: 'selfcare',
      titleLong: 'Mindful Pause',
      titleShort: 'Mindful Pause',
      id: 0,
    },
    {
      category: 'selfcare',
      titleLong: 'Understanding Sleep',
      titleShort: 'Understanding Sleep',
      id: 1,
    },
    {
      category: 'selfcare',
      titleLong: 'Sleep Quality Checklist',
      titleShort: 'Sleep Quality Checklist',
      id: 2,
    },
    {
      category: 'understandingyourself',
      titleLong: 'Know Your Personality Type',
      titleShort: 'Personality Types',
      id: 3,
    },
    {
      category: 'understandingyourself',
      titleLong: 'Identify and Tame Your Emotions',
      titleShort: 'Identify and Tame Emotions',
      id: 4,
    },
    {
      category: 'understandingyourself',
      titleLong: 'What is Attachment Style',
      titleShort: 'What is Attachment Style',
      id: 5,
    },
    {
      category: 'understandingyourself',
      titleLong: 'Distress Signs',
      titleShort: 'Distress Signs',
      id: 6,
    },
    {
      category: 'understandingyourself',
      titleLong: 'Eustress – Good Stress',
      titleShort: 'Eustress – Good Stress',
      id: 7,
    },
    {
      category: 'aboutmentalhealth',
      titleLong: 'Attention Deficit Hyperactivity Disorder',
      titleShort: 'ADHD',
      id: 8,
    },
    {
      category: 'aboutmentalhealth',
      titleLong: 'Autism Spectrum Disorder',
      titleShort: 'ASD',
      id: 9,
    },
    {
      category: 'aboutmentalhealth',
      titleLong: 'Bipolar Disorder',
      titleShort: 'Bipolar Disorder',
      id: 10,
    },
    {
      category: 'aboutmentalhealth',
      titleLong: 'What is Psychotherapy',
      titleShort: 'What is Psychotherapy',
      id: 11,
    },
    {
      category: 'storiesfromothers',
      titleLong: 'Helplines',
      titleShort: 'Helplines',
      id: 12,
    },
  ];

  const categories = {
    selfcare: 'About Self-Care',
    understandingyourself: 'Understanding Yourself',
    aboutmentalhealth: 'About Mental Health',
    storiesfromothers: 'Stories From Others',
  };

  return (
    <View style={{height: '100%'}}>
      <Stack.Screen
        options={{
          // @ts-ignore
          title: categories[category],
          headerTitleStyle: {fontWeight: 'bold'},
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              // @ts-ignore
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <View style={{gap: 10, marginTop: 20}}>
        {ArticleList.filter(x => x.category === category).map(
          ({category, titleLong, titleShort, id}, index) => (
            <ArticleEntry
              category={category}
              titleLong={titleLong}
              titleShort={titleShort}
              id={Number(id)}
              key={index}
            />
          ),
        )}
      </View>
    </View>
  );
}

function ArticleEntry({
  category,
  titleLong,
  titleShort,
  id,
}: {
  category: string;
  titleLong: string;
  titleShort: string;
  id: number;
}) {
  const styles = StyleSheet.create({
    article: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'grey',
      overflow: 'hidden',
      marginLeft: 20,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      backgroundColor: 'white',
    },
    articleText: {
      fontSize: 16,
      paddingLeft: 10,
      paddingRight: 10,
    },
  });

  return (
    <Pressable
      onPress={() =>
        // @ts-ignore
        router.push(
          `/thisarticle?category=${category}&title=${titleShort}&id=${id}`,
        )
      } // If it shows an error, ignore it - it works
      //onPress={() => console.log(`/thisarticle?category=${category}&title=${title}&id=${id}`)}
      style={styles.article}
    >
      <Text style={styles.articleText}>{titleLong}</Text>
    </Pressable>
  );
}

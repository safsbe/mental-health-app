import {View, Text, Pressable, StyleSheet, BackHandler} from 'react-native';
import {Image} from 'expo-image';
import {router, Stack, useLocalSearchParams} from 'expo-router';
import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Articles() {
  async function changeOrientation() {
    await ScreenOrientation.lockAsync(2); // Sets to ANY portrait => See https://docs.expo.dev/versions/latest/sdk/screen-orientation/#orientationlock
  }

  // @ts-ignore
  BackHandler.addEventListener('hardwareBackPress', function () {
    changeOrientation();
  });

  changeOrientation();

  const {category} = useLocalSearchParams<{category?: string}>(); // get the category
  let headerTitle = '';

  console.log({category});

  const ArticleList = [
    {
      category: 'selfcare',
      title: 'Mindful Pause',
      id: 0,
    },
    {
      category: 'selfcare',
      title: 'Understanding Sleep',
      id: 1,
    },
    {
      category: 'selfcare',
      title: 'Sleep Quality Checklist',
      id: 2,
    },
    {
      category: 'understandingyourself',
      title: 'Know Your Personality Type',
      id: 3,
    },
    {
      category: 'understandingyourself',
      title: 'Identify and Tame Your Emotions',
      id: 4,
    },
    {
      category: 'understandingyourself',
      title: 'What is Attachment Style',
      id: 5,
    },
    {
      category: 'understandingyourself',
      title: 'Distress Signs',
      id: 6,
    },
    {
      category: 'understandingyourself',
      title: 'Eustress – Good Stress',
      id: 7,
    },
    {
      category: 'aboutmentalhealth',
      title: 'Attention Deficit Hyperactivity Disorder (ADHD)',
      id: 8,
    },
    {
      category: 'aboutmentalhealth',
      title: 'Autism Spectrum Disorder (ASD)',
      id: 9,
    },
    {
      category: 'aboutmentalhealth',
      title: 'Bipolar',
      id: 10,
    },
    {
      category: 'aboutmentalhealth',
      title: 'What is Psychotherapy',
      id: 11,
    },
    {
      category: 'storiesfromothers',
      title: 'Helplines',
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
        }}
      />
      <View style={{gap: 10, marginTop: 20}}>
        {ArticleList.filter(x => x.category === category).map(
          ({category, title, id}, index) => (
            <ArticleEntry
              category={category}
              title={title}
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
  title,
  id,
}: {
  category: string;
  title: string;
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
        router.push(`/thisarticle?category=${category}&title=${title}&id=${id}`)
      } // If it shows an error, ignore it - it works
      //onPress={() => console.log(`/thisarticle?category=${category}&title=${title}&id=${id}`)}
      style={styles.article}
    >
      <Text style={styles.articleText}>{title}</Text>
    </Pressable>
  );
}

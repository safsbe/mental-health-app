import {View, Text, Pressable, StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {router, Stack, useLocalSearchParams} from 'expo-router';
import React from 'react';

export default function Articles() {
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
      title: 'Identify & Tame Your Emotions',
      id: 4,
    },
    {
      category: 'understandingyourself',
      title: 'Attachment Style',
      id: 5,
    },
    {
      category: 'understandingyourself',
      title: 'Distress signs',
      id: 6,
    },
    {
      category: 'understandingyourself',
      title: 'Eustress',
      id: 7,
    },
    {
      category: 'aboutmentalhealth',
      title: 'ADHD',
      id: 8,
    },
    {
      category: 'aboutmentalhealth',
      title: 'ASD',
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
          ({title, id}, index) => (
            <ArticleEntry key={index} title={title} id={`${id}`} />
          ),
        )}
      </View>
    </View>
  );
}

function ArticleEntry({title, id}: {title: string; id: string}) {
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
      // @ts-ignore
      onPress={() => router.push(`/thisarticle?title=${title}&id=${id}`)} // If it shows an error, ignore it - it works
      style={styles.article}
    >
      <Text style={styles.articleText}>{title}</Text>
    </Pressable>
  );
}

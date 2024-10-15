import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import {Image} from 'expo-image';
import {router, Stack, useLocalSearchParams} from 'expo-router';
import React from 'react';
import {WebView} from 'react-native-webview';
import {FontAwesome5} from '@expo/vector-icons';

export default function ArticleView() {
  const {title, id = 0} = useLocalSearchParams<{title: string; id?: string}>();

  console.log({title});
  console.log({id}, id);

  const articleList = [
    require('../../assets/articleAssets/selfcare/mindfulpause.html'),
    require('../../assets/articleAssets/selfcare/understandingsleep.html'),
    require('../../assets/articleAssets/selfcare/sleepqualitychecklist.html'),
    require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype.html'),
    require('../../assets/articleAssets/understandingyourself/identifyandtameyouremotions.html'),
    require('../../assets/articleAssets/understandingyourself/attachmentstyle.html'),
    require('../../assets/articleAssets/understandingyourself/distresssigns.html'),
    require('../../assets/articleAssets/understandingyourself/eustress.html'),
    require('../../assets/articleAssets/aboutmentalhealth/adhd.html'),
    require('../../assets/articleAssets/aboutmentalhealth/asd.html'),
    require('../../assets/articleAssets/aboutmentalhealth/bipolar.html'),
    require('../../assets/articleAssets/aboutmentalhealth/whatispsychotherapy.html'),
    require('../../assets/articleAssets/storiesfromothers/helplines.html'),
  ];

  return (
    <View style={{flex: 1}}>
      <Stack.Screen
        options={{
          title: title,
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <WebView
        style={styles.webview}
        source={articleList[id]}
        scrollEnabled={false} // None of these work lol
        nestedScrollEnabled={true} // None of these work lol
        overScrollMode="never" // None of these work lol
        bounces={false} // iOS feature
        scalesPageToFit={false} // None of these work lol
        androidLayerType="hardware"
        setBuiltInZoomControls={false}
        showsVerticalScrollIndicator={false}
        //onScroll={}
      />
      <View style={styles.navigationBar}>
        <Pressable style={styles.changePageButton}>
          <FontAwesome5 name="chevron-left" size={32} color="black" />
        </Pressable>
        <View style={styles.pageNumber}>
          <Text>Test2</Text>
        </View>
        <View style={styles.changePageButton}>
          <FontAwesome5 name="chevron-right" size={32} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webview: {
    maxHeight: '100%',
    flex: 1,
  },
  navigationBar: {
    maxHeight: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2B6C3',
  },
  changePageButton: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4E4D9',
    maxWidth: '20%',
    height: '80%',
  },
  pageNumber: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#D5C5B5',
    maxWidth: '25%',
    height: '80%',
  },
});

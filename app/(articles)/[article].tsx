import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  BackHandler,
  Animated,
  Button,
  Platform,
} from 'react-native';
import {Image} from 'expo-image';
import {Href, router, Stack, useLocalSearchParams} from 'expo-router';
import * as Linking from 'expo-linking';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {useRef, useMemo, useState} from 'react';
import {WebView} from 'react-native-webview';
import {FontAwesome6, Octicons} from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import {HeaderBackButton} from '@react-navigation/elements';
import PagerView, {
  PagerViewOnPageSelectedEventData,
  PageScrollStateChangedNativeEvent,
} from 'react-native-pager-view';
import {Drawer} from 'react-native-drawer-layout';
import {link} from 'fs';
import {setStatusBarNetworkActivityIndicatorVisible} from 'expo-status-bar';

export default function ArticleView() {
  const {
    category,
    title,
    id = 0,
  } = useLocalSearchParams<{category: string; title: string; id: string}>();

  // console.log({title}, {id});

  // async function changeToLandscapeOrientation() {
  //   await ScreenOrientation.lockAsync(5); // Sets to ANY landscape => See https://docs.expo.dev/versions/latest/sdk/screen-orientation/#orientationlock
  // }

  // async function changeToPortraitOrientation() {
  //   await ScreenOrientation.lockAsync(2); // Sets to ANY portrait => See https://docs.expo.dev/versions/latest/sdk/screen-orientation/#orientationlock
  // }

  // changeToLandscapeOrientation(); // will not need this with redesign

  const articleList = [
    {
      articleName: 'mindfulpause',
      pages: [
        [
          require('@/assets/articleAssets/selfhelp/mindfulpause/page1.html'), // does the @ work? idk need to test with compiled ver
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page11.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/mindfulpause/page12.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/mindfulpause/page12.html',
          },
        ],
      ],
    },
    {
      articleName: 'understandingsleep',
      pages: [
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/understandingsleep/page12.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/understandingsleep/page12.html',
          },
        ],
      ],
    },
    {
      articleName: 'sleepqualitychecklist',
      pages: [
        [
          require('../../assets/articleAssets/selfhelp/sleepqualitychecklist/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/sleepqualitychecklist/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/sleepqualitychecklist/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/sleepqualitychecklist/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/sleepqualitychecklist/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/sleepqualitychecklist/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/sleepqualitychecklist/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/sleepqualitychecklist/page4.html',
          },
        ],
      ],
    },
    {
      articleName: 'knowyourpersonality',
      pages: [
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/knowyourpersonality/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/knowyourpersonality/page9.html',
          },
        ],
      ],
    },
    {
      articleName: 'identifytameemotions',
      pages: [
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page11.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/identifytameemotions/page12.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/identifytameemotions/page12.html',
          },
        ],
      ],
    },
    {
      articleName: 'attachmentstyle',
      pages: [
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page11.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/attachmentstyle/page12.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/attachmentstyle/page12.html',
          },
        ],
      ],
    },
    {
      articleName: 'distresssigns',
      pages: [
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/distresssigns/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/distresssigns/page11.html',
          },
        ],
      ],
    },
    {
      articleName: 'eustress',
      pages: [
        [
          require('../../assets/articleAssets/aboutself/eustress/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page11.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutself/eustress/page12.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutself/eustress/page12.html',
          },
        ],
      ],
    },
    {
      articleName: 'adhd',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adhd/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adhd/page10.html',
          },
        ],
      ],
    },
    {
      articleName: 'asd',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/asd/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/asd/page10.html',
          },
        ],
      ],
    },
    {
      articleName: 'bipolar',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/bipolar/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/bipolar/page9.html',
          },
        ],
      ],
    },
    {
      articleName: 'whatispsychotherapy',
      pages: [
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/whatispsychotherapy/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/whatispsychotherapy/page10.html',
          },
        ],
      ],
    },
    {
      articleName: 'helplines',
      pages: [
        [
          require('../../assets/articleAssets/others/helplines/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page10.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page11.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page11.html',
          },
        ],
        [
          require('../../assets/articleAssets/others/helplines/page12.html'),
          {
            uri: 'file:///android_asset/articleAssets/others/helplines/page12.html',
          },
        ],
      ],
    },
    {
      articleName: 'selfcare',
      pages: [
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/selfcare/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/selfcare/page8.html',
          },
        ],
      ],
    },
    {
      articleName: 'theartoftaskprioritisation',
      pages: [
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/selfhelp/theartoftaskprioritisation/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/selfhelp/theartoftaskprioritisation/page10.html',
          },
        ],
      ],
    },
    {
      articleName: 'anxiety',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/anxiety/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/anxiety/page10.html',
          },
        ],
      ],
    },
    {
      articleName: 'anxiety',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/depression/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/depression/page8.html',
          },
        ],
      ],
    },
    {
      articleName: 'adjustment',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/adjustment/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/adjustment/page10.html',
          },
        ],
      ],
    },
    {
      articleName: 'ocd',
      pages: [
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page1.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page1.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page2.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page2.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page3.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page3.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page4.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page4.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page5.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page5.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page6.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page6.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page7.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page7.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page8.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page8.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page9.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page9.html',
          },
        ],
        [
          require('../../assets/articleAssets/aboutmentalhealth/ocd/page10.html'),
          {
            uri: 'file:///android_asset/articleAssets/aboutmentalhealth/ocd/page10.html',
          },
        ],
      ],
    },
  ];

  const categorySelectionHeaders = {
    selfhelp: ['TL:DR', 'What is it', 'How to Apply It'],
    aboutself: ['TL:DR', 'What is it', "What's Next"],
    aboutmentalhealth: [
      'TL:DR',
      'What is it',
      'Symptoms',
      'Impact on NS',
      'Treatment',
    ],
    others: ['TL:DR'],
  };

  const articleSectionPageNumbers = [
    {
      id: 0, // Mindful Pause
      collection: 'selfhelp',
      header: [0, 1, 4], // page numbers for respective sections listed above @ categorySelectionHeaders
    },
    {
      id: 13, // Self Care'
      collection: 'selfhelp',
      header: [0, 1, 5],
    },
    {
      id: 1, // Understanding Sleep
      collection: 'selfhelp',
      header: [0, 1, 7],
    },
    {
      id: 2, // Sleep Quality Checklist
      collection: 'selfhelp',
      header: [-1, -1, -1],
    },
    {
      id: 14, // The Art of Task Prioritisation
      collection: 'selfhelp',
      header: [0, 1, 4],
    },
    {
      id: 11, // What is Psychotherapy
      collection: 'selfhelp',
      header: [0, 1, 8],
    },
    {
      id: 3, // Know Your Personality Type
      collection: 'aboutself',
      header: [0, 1, 7],
    },
    {
      id: 4, // Identify and Tame Your Emotions
      collection: 'aboutself',
      header: [0, 1, 5],
    },
    {
      id: 5, // What is Attachment Style
      collection: 'aboutself',
      header: [0, 1, 10],
    },
    {
      id: 6, // Distress Signs
      collection: 'aboutself',
      header: [0, 1, 4],
    },
    {
      id: 7, // Eustress - Good Stress
      collection: 'aboutself',
      header: [0, 1, 5],
    },
    {
      id: 8, // ADHD
      collection: 'aboutmentalhealth',
      header: [0, 1, 3, 5, 7],
    },
    {
      id: 9, // ASD
      collection: 'aboutmentalhealth',
      header: [0, 1, 5, 6, 8],
    },
    {
      id: 10, // Bipolar
      collection: 'aboutmentalhealth',
      header: [0, 1, 4, 6, 7],
    },
    {
      id: 16, // Depression
      collection: 'aboutmentalhealth',
      header: [0, 1, 3, 4, 5],
    },
    {
      id: 15, // Anxiety
      collection: 'aboutmentalhealth',
      header: [0, 1, 4, 6, 7],
    },
    {
      id: 17, // Adjustment
      collection: 'aboutmentalhealth',
      header: [0, 1, 4, 5, 6],
    },
    {
      id: 18, // OCD
      collection: 'aboutmentalhealth',
      header: [0, 1, 3, 6, 7],
    },
    {
      id: 12, // Helplines
      collection: 'others',
      header: [0],
    },
  ];

  const ref = useRef<PagerView>(null);
  const [activePage, setActivePage] = useState(0);

  // @ts-ignore
  const articlePages = articleList[id].pages.length;

  // console.log(`Current Page: ${activePage + 1} | Total Pages: ${articlePages}`);

  const pageDisplay = `${activePage + 1} / ${articlePages}`;

  function NewPageDisplay({totalPages}: {totalPages: number}) {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          gap: 5,
          marginVertical: 15,
          maxHeight: 10,
          // backgroundColor: 'blue', // debug
          maxWidth: '80%',
        }}
      >
        {[...Array(totalPages).keys()].map((e, key) => (
          <View
            key={key}
            style={{
              display: 'flex',
              flex: 1,
            }}
          >
            {e <= activePage ? (
              <Pressable
                style={{flex: 1, borderRadius: 100, backgroundColor: '#765000'}}
                onPress={() => ref.current?.setPageWithoutAnimation(key)}
              />
            ) : (
              <Pressable
                style={{flex: 1, borderRadius: 100, backgroundColor: '#EEE5D4'}}
                onPress={() => ref.current?.setPageWithoutAnimation(key)}
              />
            )}
          </View>
        ))}
      </View>
    );
  }

  function Section({header, pageIndex}: {header: string; pageIndex: number}) {
    // console.log(pageIndex);

    return (
      <View
        style={
          activePage === pageIndex
            ? styles.sectionButtonActive
            : styles.sectionButton
        }
      >
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Text
            style={
              activePage === pageIndex
                ? styles.sectionButtonTextActive
                : styles.sectionButtonText
            }
            // @ts-ignore
            // onPress={() => router.navigate(`/thisarticle?category=${category}&title=${title}&page=${pageIndex}&id=${id}`)} style={styles.sectionTitleText}>{header}</Text>
            onPress={() => ref.current?.setPageWithoutAnimation(pageIndex)}
          >
            {header}
          </Text>
          {
            activePage > pageIndex ? (
              <Octicons
                name="check"
                size={24}
                color="#27B600"
                style={{paddingTop: 5, paddingHorizontal: 20}}
              />
            ) : (
              <Octicons
                name="check"
                size={24}
                color="#ffffff"
                style={{
                  opacity: 0,
                  paddingHorizontal: 20,
                }}
              />
            ) // Hidden anyways
          }
        </View>
      </View>
    );
  }

  // @ts-ignore
  const handleNavigationChange = newNavState => {
    const {url, target} = newNavState;
    if (!url) return;

    // console.log(target);
  };

  const filterOption = articleSectionPageNumbers.filter(x => x.id === +id)[0];

  // console.log(filterOption) // debug

  // Drawer

  const [open, setOpen] = useState(false);

  // bugged react-native-webview

  const [webkey, setWebkey] = useState(0);

  // End Drawer

  return (
    <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerPosition="right"
        drawerStyle={styles.drawer}
        renderDrawerContent={() => (
          // This shit is inside the drawer
          <View style={styles.sectionGroup}>
            <View style={styles.pageCompletedCounter}>
              <Text style={styles.pageCompletedCounterText}>
                <Text style={{fontWeight: 'bold'}}>
                  {activePage + 1} / {articlePages}
                </Text>{' '}
                Pages Completed
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                maxHeight: 10,
                width: '100%',
                borderTopWidth: 1,
                borderColor: '#A5A5A5',
                paddingVertical: 5,
                // backgroundColor: '#BBBBBB'
              }} // For the black line separating the sections
            ></View>
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                width: '100%',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              {
                // @ts-ignore
                categorySelectionHeaders[filterOption.collection].map(
                  (sectionTitle, index) => (
                    // @ts-ignore
                    <View
                      style={
                        activePage === filterOption.header[index]
                          ? styles.sectionContainerActive
                          : styles.sectionContainer
                      }
                    >
                      <Text
                        style={{
                          display: 'flex',
                          fontSize: 18,
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          marginLeft: 15,
                          marginRight: 10,
                        }}
                      >
                        {index + 1}
                      </Text>
                      <Section
                        header={sectionTitle}
                        key={index}
                        pageIndex={filterOption.header[index]}
                      />
                    </View> // For jumping to the right sections
                  ),
                )
              }
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  borderTopWidth: 1,
                  borderColor: '#A5A5A5',
                  paddingVertical: 5,
                  marginTop: 10,
                  // backgroundColor: '#BBBBBB'
                }} // For the black line separating the sections
              ></View>
            </View>
          </View>
        )}
      >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Stack.Screen
            options={{
              title: title,
              headerTitleStyle: {fontWeight: 'bold'},
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  // @ts-ignore
                  onPress={() =>
                    //changeToPortraitOrientation() &&
                    router.back()
                  }
                />
              ),
              headerRight: () => (
                <Pressable onPress={() => setOpen(prevOpen => !prevOpen)}>
                  <FontAwesome6 name="bars" size={20} color="black" />
                </Pressable>
              ),
            }}
          />
          {/* <View style={styles.sectionGroup}>
            {// @ts-ignore
            categorySelectionHeaders[filterOption.collection].map((sectionTitle, index) => (
              // @ts-ignore
              <Section header={sectionTitle} key={index} category={category} title={title} pageIndex={filterOption.header[index]} id={id}/> // For jumping to the right sections
            ))}
          </View> */}
          <NewPageDisplay totalPages={articlePages} />
          <PagerView
            initialPage={0}
            style={{flex: 1}}
            ref={ref}
            // @ts-ignore
            onPageSelected={e => {
              setActivePage(e.nativeEvent.position);
            }}
          >
            {
              // @ts-ignore
              articleList[id].pages.map((pageLinks, index) => (
                <View
                  style={{
                    flex: 1,
                  }}
                  key={`${index + 1}`}
                >
                  <WebView
                    onShouldStartLoadWithRequest={request => {
                      console.log(request.url);
                      // alert(request.url); // Debugging
                      if (request.url.startsWith('internal://')) {
                        let linkAddress = request.url
                          .replace('internal://', '')
                          .replaceAll('%20', ' ');
                        console.log(linkAddress);
                        if (linkAddress.startsWith('/thisarticle')) {
                          router.replace(linkAddress as Href<string>);
                          // previously set to router.push but that creates errors when returning
                        } else {
                          // changeToPortraitOrientation();
                          router.replace(linkAddress as Href<string>);
                        }
                      } else if (request.url.startsWith('https://')) {
                        Linking.openURL(request.url);
                        return false; // makes sure it doesnt open embedded in the app
                      } else if (request.url.startsWith('tel:')) {
                        Linking.openURL(request.url);
                        return false;
                      } else if (request.url.startsWith('http://')) {
                        return true;
                      } else if (request.url.startsWith('file://')) {
                        return true;
                      } else {
                        return false;
                      }
                      return true;
                    }}
                    originWhitelist={[
                      'file://*',
                      'https://*',
                      'internal://*',
                      'http://*',
                    ]}
                    // originWhitelist={['*']}
                    // key={`${index + 1}`}
                    collapsable={false}
                    style={styles.webview}
                    allowFileAccess={true}
                    allowingReadAccessToURL="true"
                    allowFileAccessFromFileURLs={true}
                    allowUniversalAccessFromFileURLs={true}
                    source={
                      Platform.OS === 'android' ? pageLinks[1] : pageLinks[0]
                    }
                    // source={pageLinks[0]} // Use this when prototyping to see immediate changes without rebuilding apk
                    limitsNavigationsToAppBoundDomains={true}
                    useWebKit={true}
                    cacheEnabled={true}
                    // pagingEnabled={true}
                    // @ts-ignore
                    onNavigationStateChange={handleNavigationChange} // doesnt do shit
                    scrollEnabled={false} // None of these work lol
                    overScrollMode="never" // None of these work lol
                    bounces={false} // iOS feature
                    scalesPageToFit={false} // None of these work lol
                    androidLayerType="hardware"
                    setBuiltInZoomControls={false}
                    showsVerticalScrollIndicator={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    //injectedJavaScriptBeforeContentLoaded={}
                    //onScroll={}
                  />
                </View>
              ))
            }
          </PagerView>
        </View>
      </Drawer>
    </View>
  );
}

const styles = StyleSheet.create({
  webview: {
    maxHeight: '100%',
    height: '100%',
    // backgroundColor: '#A6B2C1', // debug
  },
  navigationBar: {
    maxHeight: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#A2B6C3', // debug
  },
  changePageButton: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#B4E4D9', // debug
    maxWidth: '20%',
    height: '80%',
  },
  sectionGroup: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    // width: "15%",
    marginTop: 10,
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    // backgroundColor: '#C6C6C7', // debug
  },
  sectionContainerActive: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: 40,
    alignItems: 'flex-end',
    marginLeft: 10,
    gap: 5,
    backgroundColor: '#F0E1C3',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  sectionContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: 40,
    alignItems: 'flex-end',
    marginLeft: 10,
    gap: 5,
  },
  sectionButton: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: '#A5A5A5', // debug
  },
  sectionButtonActive: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: '#A5A5A5', // debug
  },
  sectionButtonText: {
    display: 'flex',
    flex: 1,
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sectionButtonTextActive: {
    display: 'flex',
    flex: 1,
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pageCompletedCounter: {
    display: 'flex',
    width: '100%',
    paddingBottom: 5,
  },
  pageCompletedCounterText: {
    textAlign: 'left',
    paddingLeft: '5%',
    fontSize: 16,
  },
  drawer: {
    width: '60%',
  },
});

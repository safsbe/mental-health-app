import {View, Text, Pressable, StyleSheet, ScrollView, BackHandler, Animated, Button, Platform } from 'react-native';
import {Image} from 'expo-image';
import {Href, router, Stack, useLocalSearchParams} from 'expo-router';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import React, {useRef, useMemo, useState} from 'react';
import {WebView} from 'react-native-webview';
import {FontAwesome6} from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { HeaderBackButton } from '@react-navigation/elements';
import PagerView, { PagerViewOnPageSelectedEventData, PageScrollStateChangedNativeEvent } from 'react-native-pager-view';
import {Drawer} from 'react-native-drawer-layout';
import { link } from 'fs';

export default function ArticleView() {
  const {category, title, id = 0} = useLocalSearchParams<{category: string, title: string, id: string}>();

  console.log({title});
  console.log({id});

  
  async function changeToLandscapeOrientation() {
    await ScreenOrientation.lockAsync(5); // Sets to ANY landscape => See https://docs.expo.dev/versions/latest/sdk/screen-orientation/#orientationlock
  }

  async function changeToPortraitOrientation() {
    await ScreenOrientation.lockAsync(2); // Sets to ANY portrait => See https://docs.expo.dev/versions/latest/sdk/screen-orientation/#orientationlock
  }

  changeToLandscapeOrientation();

  const articleList = [
    {
      articleName: "mindfulpause",
      pages: [
        [require('../../assets/articleAssets/selfcare/mindfulpause/page1.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page1.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page2.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page2.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page3.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page3.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page4.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page4.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page5.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page5.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page6.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page6.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page7.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page7.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page8.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page8.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page9.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page9.html'}],
        [require('../../assets/articleAssets/selfcare/mindfulpause/page10.html'), {uri: 'file:///android_asset/articleAssets/selfcare/mindfulpause/page10.html'}],
      ]
    },
    {
      articleName: "understandingsleep",
      pages: [
        [require('../../assets/articleAssets/selfcare/understandingsleep/page1.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page1.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page2.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page2.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page3.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page3.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page4.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page4.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page5.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page5.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page6.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page6.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page7.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page7.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page8.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page8.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page9.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page9.html'}],
        [require('../../assets/articleAssets/selfcare/understandingsleep/page10.html'), {uri: 'file:///android_asset/articleAssets/selfcare/understandingsleep/page10.html'}],
      ]
    },
    {
      articleName: "sleepqualitychecklist",
      pages: [
        [require('../../assets/articleAssets/selfcare/sleepqualitychecklist/page1.html'), {uri: 'file:///android_asset/articleAssets/selfcare/sleepqualitychecklist/page1.html'}],
        [require('../../assets/articleAssets/selfcare/sleepqualitychecklist/page2.html'), {uri: 'file:///android_asset/articleAssets/selfcare/sleepqualitychecklist/page2.html'}],
        [require('../../assets/articleAssets/selfcare/sleepqualitychecklist/page3.html'), {uri: 'file:///android_asset/articleAssets/selfcare/sleepqualitychecklist/page3.html'}],
        [require('../../assets/articleAssets/selfcare/sleepqualitychecklist/page4.html'), {uri: 'file:///android_asset/articleAssets/selfcare/sleepqualitychecklist/page4.html'}],
      ]
    },
    {
      articleName: "knowyourpersonalitytype",
      pages: [
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page1.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page1.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page2.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page2.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page3.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page3.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page4.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page4.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page5.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page5.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page6.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page6.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page7.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page7.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page8.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page8.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page9.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page9.html'}],
        [require('../../assets/articleAssets/understandingyourself/knowyourpersonalitytype/page10.html'), {uri: 'file:///android_asset/articleAssets/understandingyourself/knowyourpersonalitytype/page10.html'}],
      ]
    },
    require('../../assets/articleAssets/understandingyourself/identifyandtameyouremotions.html'),
    require('../../assets/articleAssets/understandingyourself/attachmentstyle.html'),
    require('../../assets/articleAssets/understandingyourself/distresssigns.html'),
    require('../../assets/articleAssets/understandingyourself/eustress.html'),
    require('../../assets/articleAssets/aboutmentalhealth/adhd.html'),
    require('../../assets/articleAssets/aboutmentalhealth/asd.html'),
    require('../../assets/articleAssets/aboutmentalhealth/bipolar.html'),
    require('../../assets/articleAssets/aboutmentalhealth/whatispsychotherapy.html'),
    //drequire('../../assets/articleAssets/storiesfromothers/helplines.html'),
    {
      articleName: "helplines",
      pages: [
        require('../../assets/articleAssets/storiesfromothers/helplines/page1.html'),
        require('../../assets/articleAssets/storiesfromothers/helplines/page2.html'),
        require('../../assets/articleAssets/storiesfromothers/helplines/page3.html'),
        require('../../assets/articleAssets/storiesfromothers/helplines/page4.html'),
        require('../../assets/articleAssets/storiesfromothers/helplines/page5.html'),
        require('../../assets/articleAssets/storiesfromothers/helplines/page6.html'),
      ]
    }
  ];

  const categorySelectionHeaders = {
    "selfcare": ['TL:DR', 'What is it', 'How to Apply It'],
    "understandingyourself": ['TL:DR', 'What is it', 'What\'s Next'],
    "aboutmentalhealth": ['TL:DR', 'What is it', 'Symptoms', 'Impact on NS', 'Treatment'],
    "storiesfromothers": ['TL:DR'],
  }


  const articleSectionPageNumbers = [
    {
      id: 0,
      collection: "selfcare",
      header: [0, 2, 4], // page numbers for respective sections listed above @ categorySelectionHeaders
    },
    {
      id: 1,
      collection: "selfcare",
      header: [0, 1, 7],
    },
    {
      id: 2,
      collection: "selfcare",
      header: [0, ],
    },
    {
      id: 3,
      collection: "understandingyourself",
      header: [],
    },
    {
      id: 4,
      collection: "understandingyourself",
      header: [],
    },
    {
      id: 5,
      collection: "understandingyourself",
      header: [],
    },
    {
      id: 6,
      collection: "understandingyourself",
      header: [],
    },
    {
      id: 7,
      collection: "understandingyourself",
      header: [],
    },
    {
      id: 8,
      collection: "aboutmentalhealth",
      header: [],
    },
    {
      id: 9,
      collection: "aboutmentalhealth",
      header: [],
    },
    {
      id: 10,
      collection: "aboutmentalhealth",
      header: [],
    },
    {
      id: 11,
      collection: "aboutmentalhealth",
      header: [],
    },
    {
      id: 12,
      collection: "storiesfromothers",
      header: [],
    },
  ]

  const ref = useRef<PagerView>(null);
  const [activePage, setActivePage] = useState(0);

  // @ts-ignore
  const articlePages = articleList[id].pages.length;

  console.log(`Current Page: ${activePage+1} | Total Pages: ${articlePages}`);

  const pageDisplay = `${activePage+1} / ${articlePages}`;

  function Section({header, pageIndex}: {header: string, pageIndex: number}) {

    console.log(pageIndex);

    return (
      <View style={activePage === pageIndex ? styles.sectionButtonActive : styles.sectionButton}>
        <Text style={activePage === pageIndex ? styles.sectionButtonTextActive : styles.sectionButtonText}
          // @ts-ignore
          // onPress={() => router.navigate(`/thisarticle?category=${category}&title=${title}&page=${pageIndex}&id=${id}`)} style={styles.sectionTitleText}>{header}</Text>
          onPress={() => ref.current?.setPageWithoutAnimation(pageIndex)}>{header}</Text>
      </View>
    )
  }

  // @ts-ignore
  const handleNavigationChange = (newNavState) => {
    const { url, target } = newNavState;
    if (!url) return;

    console.log(target);
  }

  const filterOption = articleSectionPageNumbers.filter(x => x.id === +id)[0];

  // console.log(filterOption) // debug

  // Drawer

  const [open, setOpen] = useState(false);

  // End Drawer

  // Deep linking between Webview and React



  // End Deep linking

  return (
    <View style={{flex: 1, flexDirection: "row", gap: 10}}>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerPosition='right'
        drawerStyle={styles.drawer}
        renderDrawerContent={() => ( 
          // This shit is inside the drawer
          <View style={styles.sectionGroup}>
            {// @ts-ignore
            categorySelectionHeaders[filterOption.collection].map((sectionTitle, index) => (
              // @ts-ignore
              <Section header={sectionTitle} key={index} pageIndex={filterOption.header[index]}/> // For jumping to the right sections
            ))}
            <Section header={"End"} key={"end"} pageIndex={articleList[+id].pages.length - 1} />
          </View>
        )}>
        <View style={{flex: 1, flexDirection: "row", gap: 10}}>
          <Stack.Screen 
            options={{
              title: title,
              headerTitleStyle: {fontWeight: 'bold'},
              headerLeft: (props) => (
                <HeaderBackButton
                  {...props}
                  // @ts-ignore 
                  onPress={() => changeToPortraitOrientation() && router.back()}
                />
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => setOpen((prevOpen) => !(prevOpen))}>
                    <FontAwesome6 name="bars" size={20} color="black" />
                </Pressable>
              ),
            }} />
          {/* <View style={styles.sectionGroup}>
            {// @ts-ignore
            categorySelectionHeaders[filterOption.collection].map((sectionTitle, index) => (
              // @ts-ignore
              <Section header={sectionTitle} key={index} category={category} title={title} pageIndex={filterOption.header[index]} id={id}/> // For jumping to the right sections
            ))}
          </View> */}
          <PagerView 
            initialPage={0} 
            style={{flex: 1}}
            ref={ref}
            // @ts-ignore
            onPageSelected={(e) => {setActivePage(e.nativeEvent.position)}}>
            { // @ts-ignore
            articleList[id].pages.map((pageLinks, index) => (
              <WebView
                onShouldStartLoadWithRequest={(request) => {
                  // console.log(request.url);
                  alert(request.url);
                  if (request.url.startsWith('internal://')) {
                    let linkAddress = request.url.replace('internal://', '').replaceAll('%20', ' ');
                    console.log(linkAddress);
                    if (linkAddress.startsWith('/thisarticle')) {
                      router.push(linkAddress as Href<string>)
                    } else {
                      changeToPortraitOrientation();
                      router.replace(linkAddress as Href<string>)
                    }
                  };
                  return false;
                }}
                originWhitelist={['*']}
                key={`${index+1}`}
                collapsable={false}
                style={styles.webview}
                allowFileAccess={true}
                allowingReadAccessToURL='true'
                source={Platform.OS === 'android' ? pageLinks[1] : pageLinks[0]}
                //source={pageLinks[0]}
                // @ts-ignore
                onNavigationStateChange={handleNavigationChange}
                scrollEnabled={false} // None of these work lol
                overScrollMode="never" // None of these work lol
                bounces={false} // iOS feature
                scalesPageToFit={false} // None of these work lol
                androidLayerType="hardware"
                setBuiltInZoomControls={false}
                showsVerticalScrollIndicator={false}
                //injectedJavaScriptBeforeContentLoaded={}
                //onScroll={}
              />
            ))}
          </PagerView>
          <View>
            <View style={{backgroundColor: "#BBBBBB9E", position: "absolute", top: 5, right: 5, zIndex: 3, borderRadius: 5, padding: 1}}>
              <Text style={{fontSize: 16}}>{pageDisplay}</Text>
            </View>
          </View>
        </View>
      </Drawer>
    </View>
  );
}

const styles = StyleSheet.create({
  webview: {
    maxHeight: '100%',
    height: "100%",
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
  pageNumber: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#D5C5B5', // debug
    maxWidth: '25%',
    height: '80%',
  },
  sectionGroup: {
    flexDirection: 'row',
    height: "auto",
    // width: "15%",
    marginTop: 10,
    maxHeight: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    // backgroundColor: '#C6C6C7', // debug
  },
  sectionButton: {
    width: '90%',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    // backgroundColor: '#A5A5A5', // debug
  },
  sectionButtonActive: {
    backgroundColor: 'grey',
    width: '90%',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    // backgroundColor: '#A5A5A5', // debug
  },
  sectionButtonText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sectionButtonTextActive: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  drawer: {
    width: '20%',
  }
});

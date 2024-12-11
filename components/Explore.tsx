import {router} from 'expo-router';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Image} from 'expo-image';

export default function Explore() {
  const exploreImages = {
    SelfCare: require('../assets/explore-categories/self.svg'),
    UnderstandingYourself: require('../assets/explore-categories/understanding_yourself.svg'),
    MentalHealth: require('../assets/explore-categories/mental_health.svg'),
    StoriesFromOthers: require('../assets/explore-categories/others.svg'),
  };

  const styles = StyleSheet.create({
    exploreColumn: {
      flex: 1,
      flexDirection: 'column',
      gap: 10,
    },
    exploreRow: {
      flex: 1,
      flexDirection: 'row',
      gap: 10,
    },
  });

  return (
    <View style={styles.exploreColumn}>
      <View style={styles.exploreRow}>
        <Pressable
          onPress={() => router.push('/articles?category=selfcare')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDF1FE',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            Self Care
          </Text>
          <Image
            style={{flexGrow: 1}}
            source={exploreImages.SelfCare} 
          />
        </Pressable>
        <Pressable
          onPress={() =>
            router.push('/articles?category=understandingyourself')
          }
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDE5FF',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            Understanding Yourself
          </Text>
          <Image
            style={{flexGrow: 1}}
            source={exploreImages.UnderstandingYourself}
          />
        </Pressable>
      </View>
      <View style={styles.exploreRow}>
        <Pressable
          onPress={() => router.push('/articles?category=aboutmentalhealth')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDF7E5',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            About Mental Health
          </Text>
          <Image 
            style={{flexGrow: 1}}
            source={exploreImages.MentalHealth} 
          />
        </Pressable>
        <Pressable
          onPress={() => router.push('/articles?category=storiesfromothers')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#FFE7E7',
            height: 200,
            padding: 5,
          }}
        >
          <Text
            style={{textAlign: 'right', fontWeight: 'bold', color: '#2A4E4C'}}
          >
            Stories From Others
          </Text>
          <Image
            style={{flexGrow: 1}}
            source={exploreImages.StoriesFromOthers}
          />
        </Pressable>
      </View>
    </View>
  );
}

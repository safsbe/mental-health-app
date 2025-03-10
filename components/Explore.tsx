import {router} from 'expo-router';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {Image} from 'expo-image';

export default function Explore() {
  const exploreImages = {
    selfhelp: require('../assets/explore-categories/self.svg'),
    aboutself: require('../assets/explore-categories/understanding_yourself.svg'),
    MentalHealth: require('../assets/explore-categories/mental_health.svg'),
    others: require('../assets/explore-categories/others.png'),
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
          onPress={() => router.push('/articles?category=selfhelp')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDF1FE',
            height: 200,
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: '#765000'}}
          >
            About Self Help
          </Text>
          <Image style={{flexGrow: 1}} source={exploreImages.selfhelp} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/articles?category=aboutself')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#DDE5FF',
            height: 200,
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: '#765000'}}
          >
            About Self
          </Text>
          <Image style={{flexGrow: 1}} source={exploreImages.aboutself} />
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
            borderRadius: 10,
          }}
        >
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: '#765000'}}
          >
            About Mental Health
          </Text>
          <Image style={{flexGrow: 1}} source={exploreImages.MentalHealth} />
        </Pressable>
        <Pressable
          onPress={() => router.push('/articles?category=others')}
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#FFE7E7',
            height: 200,
            padding: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: '#765000'}}
          >
            Others
          </Text>
          <Image
            style={{flexGrow: 1, width: '120%', alignSelf: 'center'}}
            source={exploreImages.others}
          />
        </Pressable>
      </View>
    </View>
  );
}

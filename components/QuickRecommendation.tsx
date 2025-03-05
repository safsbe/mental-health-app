import {Image} from 'expo-image';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from 'react-native';
import {router} from 'expo-router';
import {
  rgbaArrayToRGBAColor,
  rgbaColor,
} from 'react-native-reanimated/lib/typescript/Colors';

export default function QuickRecommendation() {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 5,
      backgroundColor: '#FDF6E7',
    },
    header: {
      color: '#765000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    recommendationOptions: {
      paddingTop: 10,
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      width: '85%',
      alignSelf: 'center',
      gap: 15,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended</Text>
      <View style={styles.recommendationOptions}>
        <Option text="Log Your         Sleep" imageType={0} />
        <Option text="Log Your           Day" imageType={0} />
        <Option text="Try Deep     Breathing" imageType={1} />
      </View>
    </View>
  );
}

function Option({text, imageType}: {text: string; imageType: number}) {
  const imageOptions = [
    require('../assets/quickRecommendation/plusImage.png'),
    require('../assets/quickRecommendation/meditation.png'),
  ];

  const styles = StyleSheet.create({
    containerPlus: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 0.4,
      borderColor: '#765000',
    },
    containerMeditation: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#AEFFA1',
      borderRadius: 20,
      borderWidth: 0.4,
      borderColor: '#765000',
    },
    optionTextPlus: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      color: '#5D83FF',
    },
    optionTextMeditation: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
    },
    imagePlus: {
      marginTop: 16,
      width: 32,
      height: 32,
      alignSelf: 'center',
      objectFit: 'contain',
      verticalAlign: 'middle',
    },
    imageMeditation: {
      width: 64,
      height: 64,
      alignSelf: 'center',
      objectFit: 'contain',
    },
  });

  const imageSelectedOption =
    imageType == 0 ? imageOptions[0] : imageOptions[1];
  const imageStyle = imageType == 0 ? styles.imagePlus : styles.imageMeditation;
  const textStyle =
    imageType == 0 ? styles.optionTextPlus : styles.optionTextMeditation;
  const containerStyle =
    imageType == 0 ? styles.containerPlus : styles.containerMeditation;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={{
          flex: 1,
          display: 'flex',
          height: 'auto',
          paddingTop: 5,
          paddingBottom: 10,
          gap: 5,
        }}
        onPress={() =>
          imageType == 0
            ? router.push('/')
            : router.push('/meditation/meditation')
        }
      >
        <Text style={textStyle}>{text}</Text>
        <Image style={imageStyle} source={imageSelectedOption} />
      </TouchableOpacity>
    </View>
  );
}

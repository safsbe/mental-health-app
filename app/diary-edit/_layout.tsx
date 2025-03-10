import {ScrollView, View, Pressable, Text} from 'react-native';
import {router, Stack} from 'expo-router';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {HeaderBackButton} from '@react-navigation/elements';

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerLeft: props => (
          <HeaderBackButton {...props} onPress={() => router.back()} />
        ),
        headerTitle: props => (
          <Text
            {...props}
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#765000',
            }}
          >
            Edit Diary
          </Text>
        ),
      }}
    />
  );
}

import {ScrollView, View, Pressable, Text} from 'react-native';
import {router, Stack} from 'expo-router';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return <Stack screenOptions={{headerShown: true}} />;
}

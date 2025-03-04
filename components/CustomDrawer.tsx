import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {router} from 'expo-router';

export default function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={'Logout'}
        onPress={() => {
          DevLogoutUser();
        }}
      />
    </DrawerContentScrollView>
  );
}

function DevLogoutUser() {
  const removeUserData = async () => {
    await AsyncStorage.multiRemove([
      'alias',
      'authToken',
      'dob',
      'goals',
      'mood',
      'videoWatched',
    ]); // Remove all user info

    router.replace('/start'); // Navigate to login setup screen again
  };

  removeUserData();
}

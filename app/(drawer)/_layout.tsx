import Drawer from 'expo-router/drawer';
import CustomDrawer from '@/components/CustomDrawer';

export default function Layout() {
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="diary-edit"
        options={{
          drawerLabel: 'Diary',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
        }}
      />
    </Drawer>
  );
}

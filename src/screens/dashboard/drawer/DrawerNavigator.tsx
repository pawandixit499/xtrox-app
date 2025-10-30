import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../dashboardItems/home/Home';
import Notification from '../dashboardItems/notification/Notification';
import PremiseTable from '../dashboardItems/premise/Premise';


const Drawer = createDrawerNavigator();

const drawerScreens = [
  { name: 'Dashboard', component: Home, icon: '🏠' },
  { name: 'Notification', component: Notification, icon: 'ℹ️' },
  { name: 'Premises', icon: '🏠', component: PremiseTable },
];

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard"   screenOptions={{
        drawerStyle: {
          backgroundColor: '#1e3b95', 
          width: 250,               
        },
        drawerActiveTintColor: 'white',   
        drawerInactiveTintColor: '#FFFFFF', 
        drawerActiveBackgroundColor: '#000000',
        drawerLabelStyle: { fontSize: 16 }, 
      }}>
      {drawerScreens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ title: `${screen.icon} ${screen.name}` }}
        />
      ))}
    </Drawer.Navigator>
  );
}

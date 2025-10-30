import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import DrawerNavigator from './drawer/DrawerNavigator';
import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DashboardLayout = () => {
  const route = useRoute<any>();
  const companyId = route?.params?.company_id;
  console.log('Company ID in DashboardLayout:', route?.params);
  return <DrawerNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.6,
    backgroundColor: '#1E293B',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  sidebarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 5,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
  },
  topbarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default DashboardLayout;

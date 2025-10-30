import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/Login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import { CompleteCompanyRegistration } from '../screens/companyr_regisration/CompleteCompanyRegisration';
import EmailVerify from '../screens/emailverification/EmailVerify';
import ForgotPasswordScreen from '../screens/forgotpassword/ForgotpasswordScreeen';
import 'react-native-gesture-handler';
import { CreatePremise } from '../screens/dashboard/dashboardItems/premise/CreatePremise';
import PremiseDetailsScreen from '../screens/dashboard/dashboardItems/premise/report/PremiseDetailsScreen';
import FillReport from '../screens/dashboard/dashboardItems/premise/fillreport/FillReport';

const Stack = createNativeStackNavigator();

const CustomNavigationContainer = () => {
  const token = useSelector((state: any) => state.user.token);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={token ? 'Dashboard' : 'Login'}
      >
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : null}

        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Complete Profile" component={CompleteCompanyRegistration} />
        <Stack.Screen name="Create Premise" component={CreatePremise} />
        <Stack.Screen name="Email Verify" component={EmailVerify} />
        <Stack.Screen name="Forgot Password" component={ ForgotPasswordScreen} />
        <Stack.Screen name="Premise Details" component={ PremiseDetailsScreen} />
        <Stack.Screen name="Fill Report" component={ FillReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default CustomNavigationContainer;

import React, { useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './LoginScreen.style';
import Checkbox from '../../components/Checkbox';
import ButtonUi from '../../components/ButtonUi';
import PasswordInput from '../../components/PasswordInput';
import Link from '../../components/Link';
import Card from '../../components/Card';
import AuthBackground from '../../components/AuthBackground';
import EmailInput from '../../components/EmailInput';
import { axiosInstance } from '../../Service/api';
import { TOKEN_SECRET } from '../../Service/constant';
import { useDispatch } from 'react-redux';
import { setToken, setUserInfo } from '../../Stores/Slice/UserSlice';
import { Routes } from '../../modules/routes/Routes';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  const validateForm = () => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const login = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post('/login', {
        ...TOKEN_SECRET,
        username: email,
        password,
      });

      const { access_token, user, reload, company_id, reset_required } =
        res.data?.data || {};

      if (reset_required) {
      }

      if (reload) {
        setLoading(false);
        navigation.navigate(Routes.EmailVerify.name, {
          company_id: company_id,
        });
        return;
      }

      if (access_token) {
        dispatch(setToken(access_token));
        dispatch(setUserInfo(user));

        if (rememberMe) {
          await AsyncStorage.setItem('token', access_token);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          await AsyncStorage.setItem('savedEmail', email);
          await AsyncStorage.setItem('savedPassword', password);
        } else {
          await AsyncStorage.multiRemove([
            'token',
            'user',
            'savedEmail',
            'savedPassword',
          ]);
        }

        navigation.navigate('Dashboard', {
          company_id: res.data?.data?.user?.company?.id,
        });
      } else {
        Alert.alert('Login Failed! Invalid Credentials');
      }
    } catch (err: any) {
      Alert.alert('Login Failed! Invalid Credentials');
      console.log('Status:', err.response?.status);
      console.log('Error:', err.response?.data);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        const savedUser = await AsyncStorage.getItem('user');
        if (savedToken && savedUser) {
          dispatch(setToken(savedToken));
          dispatch(setUserInfo(JSON.parse(savedUser)));
          navigation.replace('Dashboard');
          return;
        }
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
      } catch (e) {
        console.log('AsyncStorage Error:', e);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthBackground>
        <Card
          style={{
            maxHeight: '90%',
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text style={styles.title}>Welcome to LIV</Text>
          <Text style={styles.subtitle}>Login in to continue</Text>

          <View style={styles.inputContainer}>
            <EmailInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              placeholder="Email"
              placeholderTextColor="#555"
              keyboardType="email-address"
            />
            {emailError ? (
              <Text style={{ color: 'red', fontSize: 13, marginTop: 5 }}>
                {emailError}
              </Text>
            ) : null}
          </View>

          <PasswordInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
          />
          {passwordError ? (
            <Text style={{ color: 'red', fontSize: 13, marginTop: 5 }}>
              {passwordError}
            </Text>
          ) : null}

          <View style={styles.optionsRow}>
            <Checkbox
              onChange={setRememberMe}
              value={rememberMe}
              label={'Remember Me'}
            />
            <Link
              text={'Forgot Password?'}
              onPress={() => navigation.replace('Forgot Password')}
            />
          </View>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <ButtonUi title="Login" onPress={login} loading={loading} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Are you a New Inspection Company and need an account?{' '}
              <Link text="Sign Up" onPress={() => navigation.navigate('Signup')} />
            </Text>
            <Text style={styles.signupSubText}>
              If you are a business owner and need to request an account, please
              fill out this form, our team will connect with you.
            </Text>
          </View>
        </Card>
      </AuthBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

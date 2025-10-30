import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthBackground from '../../components/AuthBackground';
import Card from '../../components/Card';
import Input from '../../components/Input';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import ButtonUi from '../../components/ButtonUi';
import PhoneInput from 'react-native-international-phone-number';
import Link from '../../components/Link';
import { styles } from './SignupScreen.style';
import { axiosInstance } from '../../Service/api';

const SignupScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState<any>('IN');
  const [loading, setLoading] = useState(false);

  const formattedPhoneNumber = () => {
    return `${countryCode?.idd?.root || ''}${phoneNumber}`.replace(/\s+/g, '');
  };
  const [errors, setErrors] = useState<any>({});
  const phoneInput = useRef<any>(null);

  const validate = () => {
    let valid = true;
    let newErrors: any = {};

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      valid = false;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (validate()) {
      const payload = {
        company: companyName,
        cpassword: confirmPassword,
        phone: formattedPhoneNumber(),
        email: email,
        password: password,
      };
      console.log(payload);
      setLoading(true);
      try {
        const result = await axiosInstance.post('/register', payload);
        console.log(result.data.data.company_id);
        if (result.data?.status === 'success') {
          ToastAndroid.show('Signup successful!', ToastAndroid.SHORT);
          navigation.replace('Email Verify', {
            company_id: result.data.data.company_id,
          });
        } else {
          throw new Error('Signup failed');
        }
      } catch (error: any) {
        console.log(error.response);

        if (error.response?.data?.errors) {
          const apiErrors: string[] = error.response.data.errors;
          apiErrors.forEach(err => {
            ToastAndroid.show(err, ToastAndroid.LONG);
          });
          setErrors((prev: any) => ({ ...prev, api: apiErrors.join('\n') }));
        } else {
          ToastAndroid.show(
            'Something went wrong. Please try again.',
            ToastAndroid.LONG,
          );
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthBackground>
        <View style={{ flex: 1, width: '100%' }}>
          <Card
            style={{
              maxHeight: '90%',
              justifyContent: 'center',
              height: '90%',
              padding: 20,
              margin: 20,
            }}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>Welcome to LIV</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>

              <Input
                value={companyName}
                onChangeText={(text: string) => {
                  setCompanyName(text);
                  setErrors((prev: any) => ({ ...prev, companyName: '' }));
                }}
                placeholder="Company Name"
              />
              {errors.companyName && (
                <Text style={localStyles.error}>{errors.companyName}</Text>
              )}

              <PhoneInput
                defaultCountry="IN"
                autoFocus={false}
                value={phoneNumber}
                onChangePhoneNumber={num => {
                  setPhoneNumber(num);
                  setErrors((prev: any) => ({ ...prev, phoneNumber: '' }));
                }}
                selectedCountry={countryCode}
                onChangeSelectedCountry={setCountryCode}
                phoneInputStyles={{
                  container: {
                    borderWidth: 0,
                    borderRadius: 30,
                    marginBottom: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 30,
                    elevation: 3,
                    paddingLeft: 15,
                    paddingRight: 10,
                  },
                  input: {
                    fontSize: 16,
                    color: '#333',
                    fontWeight: '500',
                    borderRadius: 30,
                  },
                  flagContainer: {
                    backgroundColor: 'white',
                    borderRadius: 30,
                  },
                }}
                placeholderTextColor="gray"
                placeholder="Enter Phone"
              />
              {errors.phoneNumber && (
                <Text style={localStyles.error}>{errors.phoneNumber}</Text>
              )}

              <EmailInput
                value={email}
                onChangeText={(text: string) => {
                  setEmail(text);
                  setErrors((prev: any) => ({ ...prev, email: '' }));
                }}
                placeholder="Email"
                placeholderTextColor="#555"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={localStyles.error}>{errors.email}</Text>
              )}

              <PasswordInput
                value={password}
                onChangeText={(text: string) => {
                  setPassword(text);
                  setErrors((prev: any) => ({ ...prev, password: '' }));
                }}
                placeholder="Password"
              />
              {errors.password && (
                <Text style={localStyles.error}>{errors.password}</Text>
              )}

              <PasswordInput
                value={confirmPassword}
                onChangeText={(text: string) => {
                  setConfirmPassword(text);
                  setErrors((prev: any) => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="Re-enter Password"
              />
              {errors.confirmPassword && (
                <Text style={localStyles.error}>{errors.confirmPassword}</Text>
              )}

              {errors.api && (
                <Text style={localStyles.error}>{errors.api}</Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Text>* By Signup, you agree to our </Text>
                <Link text="Terms & Condition" onPress={() => {}} />
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <ButtonUi
                  title={loading ? 'Please wait...' : 'Signup'}
                  onPress={!loading ? handleSignup : ()=>{}}
                  disabled={loading}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  alignContent: 'center',
                }}
              >
                <Text>Already have an account? </Text>
                <Link
                  text="Log In"
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </View>
      </AuthBackground>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default SignupScreen;

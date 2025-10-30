// ForgotPasswordScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Card from '../../components/Card';
import EmailInput from '../../components/EmailInput';
import ButtonUi from '../../components/ButtonUi';
import AuthBackground from '../../components/AuthBackground';
import { axiosInstance } from '../../Service/api';

const ForgotPasswordScreen = ({navigation}:{navigation:any}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {}, [resendTimer]);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async() => {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    try{
      const result:any= await axiosInstance.post('/forgot-password',{email})
      console.log(result?.data);
      const res=result?.data
      if(res.status==='success'){
        setError('');
        setSent(true);
        Alert.alert('Success', res?.data||'Password reset link sent to your email.');
      navigation.replace('Login',{email:email});
      }
     
     
    }catch(e:any){
      console.log(e.response);
    }
   
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setSent(false);
    }
  };

  return (
    <AuthBackground>
      <Card style={styles.card}>
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subheading}>
          Enter your email to receive a password reset code.
        </Text>
        <EmailInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <ButtonUi
          title={'Send Code'}
          onPress={sent ? handleResend : handleSubmit}
          disabled={loading || (sent && resendTimer > 0)}
          buttonStyle={styles.button}
        />
         <ButtonUi
          title="Back to Login"
          onPress={()=>navigation.replace('Login')}
          disabled={loading || (sent && resendTimer > 0)}
          buttonStyle={styles.button}
        />
      </Card>
    </AuthBackground>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  card: {
    maxHeight: '90%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: '#111827',
  },
  subheading: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: { marginBottom: 12 },
  error: { color: 'red', fontSize: 12, marginBottom: 8, textAlign: 'center' },
  button: { marginTop: 10, width: '100%' },
});

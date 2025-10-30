import React, { useState } from 'react'
import { View, StyleSheet, Text, Alert, TextInput, ActivityIndicator } from 'react-native'
import ButtonUi from '../../components/ButtonUi'
import { axiosInstance } from '../../Service/api'
import AuthBackground from '../../components/AuthBackground'
import Card from '../../components/Card'
import Input from '../../components/Input'

const EmailVerify = ({ route, navigation }:{route:any,navigation:any}) => {
  const { company_id} = route.params 

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)

  const resendCode = async () => {
    console.log(company_id);
    try {
      setLoading(true)
      const response = await axiosInstance.post('/register/resend-code', { id :company_id})
      console.log(response);
    } catch (error:any) {  
      setLoading(false)
      Alert.alert("Error", "Something went wrong")
      console.log(error?.response)
    }finally{
      setLoading(false)
    }
  }

  const verifyCode = async () => {
    if (!code) return Alert.alert("Error", "Enter the verification code")
      console.log(code);
      console.log(company_id);
      
    try {
      setLoading(true)
      const response = await axiosInstance.post('/register/verify-code', { code,id:company_id })
      setLoading(false)
      console.log(response);
      if(response?.data?.status === 'success'){
        navigation.navigate("Complete Profile",{company_id:company_id})
      }
    } catch (error:any) {
      setLoading(false)
      Alert.alert("Error", "Something went wrong")
      console.log(error?.response)
    }finally{
      setLoading(false)
    }
  }

  return (
    <AuthBackground>
        <Card 
         style={{
            maxHeight: '90%',
            height: 300,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
        <Input
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />

        <ButtonUi
          title={loading ? 'Verifying...' : 'Verify Code'}
          onPress={verifyCode}
          buttonStyle={{ width: '100%', marginBottom: 10 }}
          disabled={loading}
        />

        <ButtonUi
          title={loading ? 'Sending...' : 'Resend Code'}
          onPress={resendCode}
          buttonStyle={{ width: '100%' }}
          disabled={loading}
        />

        {loading && <ActivityIndicator size="small" color="#000" style={{ marginTop: 10 }} />}
        </Card>
    </AuthBackground>
  )
}

export default EmailVerify
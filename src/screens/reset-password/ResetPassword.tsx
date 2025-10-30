import React, { useState } from 'react'
import AuthBackground from '../../components/AuthBackground'
import { Text } from 'react-native'
import Card from '../../components/Card'
import PasswordInput from '../../components/PasswordInput'

const ResetPassword = () => {
    const [password,setPassword]=React.useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
  return (
    <AuthBackground>
       <Card>
        <Text>ResetPassword</Text>
        <PasswordInput placeholder='Password' value={password} onChangeText={setPassword}/>
        <PasswordInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword}/>
       </Card>
        
    </AuthBackground>
  )
}

export default ResetPassword
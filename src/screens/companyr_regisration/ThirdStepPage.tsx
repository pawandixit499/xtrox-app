import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import CustomDropDown from '../../components/CustomDropDown';
import ButtonUi from '../../components/ButtonUi';
import Card from '../../components/Card';
import { axiosInstance } from '../../Service/api';
import { useFormContext } from './formContext/CompanyFormContext';
import { useRoute } from '@react-navigation/native';

const ThirdStepPage = ({
  navigation,
  currentStep,
  totalSteps,
  goToStep,
}: {
  navigation?: any;
  currentStep: any;
  totalSteps: any;
  goToStep: any;
}) => {
  const { formData } = useFormContext();
  const route = useRoute<any>();
  const companyId = route?.params?.company_id;

  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cid, setCid] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const cardTypes = [
    { value: 'debit', label: 'Debit Card' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'prepaid', label: 'Prepaid Card' },
    { value: 'virtual', label: 'Virtual Card' },
    { value: 'gift', label: 'Gift Card' },
    { value: 'business', label: 'Business/Corporate Card' },
    { value: 'charge', label: 'Charge Card' },
    { value: 'fleet', label: 'Fleet Card' },
  ];

  const expiryMonths = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const expiryYears = Array.from({ length: 15 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  const getCompanyDetails = async () => {
    try {
      const result = await axiosInstance.get('/company-profile/find', {
        params: { id: companyId },
      });
      const data = result?.data;
      setCid(data?.id || null);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
    if (!cardType) newErrors.cardType = 'Please select card type';
    if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, '')))
      newErrors.cardNumber = 'Card number must be 16 digits';
    if (!expiryMonth) newErrors.expiryMonth = 'Select expiry month';
    if (!expiryYear) newErrors.expiryYear = 'Select expiry year';
    if (!cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    if (errors[field]) {
      setErrors((prev: any) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    switch (field) {
      case 'nameOnCard':
        setNameOnCard(value);
        break;
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'cvv':
        setCvv(value);
        break;
    }
  };

  const handleDropdownChange = (field: string, value: string) => {
    if (errors[field]) {
      setErrors((prev: any) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    switch (field) {
      case 'cardType':
        setCardType(value);
        break;
      case 'expiryMonth':
        setExpiryMonth(value);
        break;
      case 'expiryYear':
        setExpiryYear(value);
        break;
    }
  };

  const handleSkipAndContinue = async (skip:boolean) => {
    if(!skip){
      if (!validateForm()) return;
    }
    const payload = {
      id: cid,
      step_1: formData.step_1,
      step_2: formData.step_2,
      step_3: {
        id: cid,
        cc_type: cardType,
        cc_name: nameOnCard,
        cc_number: cardNumber,
        cc_exp_month: expiryMonth,
        cc_exp_year: expiryYear,
        cc_cvc: cvv,
      },
      stepNumber: 3,
    };

    try {
      setLoading(true);
      const result = await axiosInstance.post('company-profile/post', payload);

      if (result?.status === 200) {
        Alert.alert('Success', 'Information saved successfully!');
        navigation.navigate('Login');
      }
    } catch (err: any) {
      console.log('Error:', err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) getCompanyDetails();
  }, [companyId]);

  return (
    <Card style={{ maxHeight: '90%', justifyContent: 'center', height: '90%', padding: 20, margin: 20 }}>
      <View style={styles.container}>
        <Text style={styles.formTitle}>Card Information</Text>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Name on Card</Text>
          <Input
            value={nameOnCard}
            placeholder="Enter name on card"
            onChangeText={text => handleInputChange('nameOnCard', text)}
          />
          {errors.nameOnCard && <Text style={styles.errorText}>{errors.nameOnCard}</Text>}
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Card Type</Text>
          <CustomDropDown
            data={cardTypes}
            placeholder="Select card type"
            value={cardType}
            onChange={(item: any) => handleDropdownChange('cardType', item.value)}
          />
          {errors.cardType && <Text style={styles.errorText}>{errors.cardType}</Text>}
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Card Number</Text>
          <Input
            value={cardNumber}
            placeholder="Enter card number"
            keyboardType="numeric"
            onChangeText={text => handleInputChange('cardNumber', text)}
          />
          {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputBox, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Expiry Month</Text>
            <CustomDropDown
              data={expiryMonths}
              placeholder="Select month"
              value={expiryMonth}
              onChange={(item: any) => handleDropdownChange('expiryMonth', item.value)}
            />
            {errors.expiryMonth && <Text style={styles.errorText}>{errors.expiryMonth}</Text>}
          </View>

          <View style={[styles.inputBox, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Expiry Year</Text>
            <CustomDropDown
              data={expiryYears}
              placeholder="Select year"
              value={expiryYear}
              onChange={(item: any) => handleDropdownChange('expiryYear', item.value)}
            />
            {errors.expiryYear && <Text style={styles.errorText}>{errors.expiryYear}</Text>}
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>CVV</Text>
          <Input
            value={cvv}
            placeholder="Enter CVV"
            keyboardType="numeric"
            maxLength={4}
            onChangeText={text => handleInputChange('cvv', text)}
          />
          {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
        </View>

        <View style={styles.inputBox}>
          <ButtonUi
            title={loading ? <ActivityIndicator color="#fff" /> : 'Save & Continue'}
            onPress={()=>handleSkipAndContinue(false)}
            buttonStyle={{ width: '100%' }}
          />
        </View>

        <View style={styles.inputBox}>
          <ButtonUi
             title={loading ? <ActivityIndicator color="#fff" /> : 'Skip & Continue'}
            onPress={()=>handleSkipAndContinue(true)}
            buttonStyle={{ width: '100%' }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  inputBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    fontWeight: '600',
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default ThirdStepPage;

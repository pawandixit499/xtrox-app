import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import EmailInput from '../../components/EmailInput';
import PhoneInput from 'react-native-international-phone-number';
import ButtonUi from '../../components/ButtonUi';
import { axiosInstance } from '../../Service/api';
import { useRoute } from '@react-navigation/native';
import { useFormContext } from './formContext/CompanyFormContext';

const SecondStepPage = ({
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
  const { formData, updateStepData } = useFormContext();
  const route = useRoute<any>();
  const companyId = route?.params?.company_id;

  const [cid, setCid] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState<any>('IN');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    title: '',
    primaryEmail: '',
    phone: '',
    apiError: '',
  });

  const formattedPhoneNumber = () => {
    if (typeof countryCode === 'object' && countryCode?.idd?.root) {
      return `${countryCode.idd.root}${phone}`.replace(/\s+/g, '');
    }
    return phone;
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: any = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!primaryEmail.trim()) newErrors.primaryEmail = 'Email is required.';
    else if (!isValidEmail(primaryEmail)) newErrors.primaryEmail = 'Invalid email format.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCompanyDetails = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance.get('/company-profile/find', {
        params: { id: companyId },
      });
      const data = result?.data;

      if (data) {
        setCid(data?.id || null);
        setFirstName(data?.contact_first_name || '');
        setLastName(data?.contact_last_name || '');
        setTitle(data?.contact_title || '');
        setPrimaryEmail(data?.contact_email || '');
        setPhone(data?.contact_phone ? data.contact_phone.replace(/^\+\d+/, '') : '');
      }
    } catch (error: any) {
      setErrors(prev => ({
        ...prev,
        apiError:
          error?.response?.data?.message || 'Failed to fetch company details. Please try again.',
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndNext = async () => {
    if (!validateForm()) return;

    const payload = {
      id: cid,
      step_2: {
        id: cid,
        contact_last_name: lastName,
        contact_first_name: firstName,
        contact_email: primaryEmail,
        contact_phone: formattedPhoneNumber(),
        contact_title: title,
      },
      step_3: {
        id: cid,
        cc_type: null,
        cc_name: null,
        cc_number: null,
        cc_exp_month: null,
        cc_exp_year: null,
        cc_cvc: null,
      },
      stepNumber: 2,
    };

    try {
      setLoading(true);
      setErrors(prev => ({ ...prev, apiError: '' }));
      const result = await axiosInstance.post('company-profile/post', payload);

      if (result?.status === 200) {
        updateStepData('step_2', payload.step_2);
        if (currentStep < totalSteps - 1) goToStep(currentStep + 1);
      } else {
        setErrors(prev => ({ ...prev, apiError: 'Unexpected server response.' }));
      }
    } catch (err: any) {
      setErrors(prev => ({
        ...prev,
        apiError: err?.response?.data?.message || 'Something went wrong while saving data.',
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) getCompanyDetails();
  }, [companyId]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.formTitle}>Personal Information</Text>

        <Input
          value={firstName}
          placeholder="Enter First Name"
          onChangeText={text => {
            setFirstName(text);
            setErrors(prev => ({ ...prev, firstName: '' }));
          }}
        />
        {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

        <Input
          value={lastName}
          placeholder="Enter Last Name"
          onChangeText={text => {
            setLastName(text);
            setErrors(prev => ({ ...prev, lastName: '' }));
          }}
        />
        {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

        <Input
          value={title}
          placeholder="Enter Title"
          onChangeText={text => {
            setTitle(text);
            setErrors(prev => ({ ...prev, title: '' }));
          }}
        />
        {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

        <EmailInput
          value={primaryEmail}
          placeholder="Enter Email"
          onChangeText={text => {
            setPrimaryEmail(text);
            setErrors(prev => ({ ...prev, primaryEmail: '' }));
          }}
        />
        {errors.primaryEmail ? <Text style={styles.errorText}>{errors.primaryEmail}</Text> : null}

        <PhoneInput
          defaultCountry="IN"
          autoFocus={false}
          value={phone}
          onChangePhoneNumber={num => {
            setPhone(num);
            setErrors(prev => ({ ...prev, phone: '' }));
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
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

        {errors.apiError ? (
          <Text style={[styles.errorText, { textAlign: 'center', marginTop: 5 }]}>
            {errors.apiError}
          </Text>
        ) : null}

        <ButtonUi
          title={loading ? <ActivityIndicator color="#fff" /> : 'Next'}
          buttonStyle={{ width: '100%', marginTop: 20 }}
          onPress={handleSaveAndNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 5,
  },
});

export default SecondStepPage;

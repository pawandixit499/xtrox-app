import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../components/Input';
import EmailInput from '../../components/EmailInput';
import CustomDropDown from '../../components/CustomDropDown';
import Checkbox from '../../components/Checkbox';
import ButtonUi from '../../components/ButtonUi';
import { useRoute } from '@react-navigation/native';
import { axiosInstance } from '../../Service/api';
import * as ImagePicker from 'react-native-image-picker';
import { MultiSelect } from 'react-native-element-dropdown';
import { useFormContext } from './formContext/CompanyFormContext';

const FirstStepPage = ({ navigation, currentStep, totalSteps, goToStep }: { navigation?: any; currentStep: any; totalSteps: any; goToStep: any }) => {
  const { formData, updateStepData } = useFormContext();
  const route = useRoute<any>();
  const companyId = route?.params?.company_id;

  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<any>(null);

  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<string>('231'); // Default country as string
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [install, setInstall] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [timeZone, setTimeZone] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [hearAboutUsComment, setHearAboutUsComment] = useState('');
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [jurisdictions, setJurisdictions] = useState<any[]>([]);
  const [selectedAhj, setSelectedAhj] = useState<any[]>([]);
  const [cid, setCid] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});

  // Countries array with string value types for matching
  const countries = [{ value: '231', label: 'United States' }];
  const timeZones = [
    { label: 'Eastern', value: 'Eastern' },
    { label: 'Central', value: 'Central' },
    { label: 'Mountain', value: 'Mountain' },
    { label: 'Pacific', value: 'Pacific' },
  ];
  const hearAboutUss = [
    { label: 'AHJ', value: '1' },
    { label: 'Email', value: '2' },
    { label: 'Phone Call', value: '3' },
    { label: 'Letter in Mail', value: '4' },
    { label: 'Other', value: '0' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) goToStep(currentStep + 1);
  };

  const pickImage = async () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, res => {
      if (res?.assets?.length) setLogo(res.assets[0]);
    });
  };

  const getCompanyDetails = async () => {
    try {
      const result = await axiosInstance.get('/company-profile/find', { params: { id: companyId } });
      const data = result?.data;
      setCid(data?.id || '');
      setCompanyName(data?.name || '');
      setEmail(data?.email || '');
      setCountry(data?.country_id !== undefined ? String(data.country_id) : '231'); // Default to '231' if no data
      setState(data?.state_id !== undefined ? String(data.state_id) : '');
      setCity(data?.city !== undefined ? String(data.city) : '');
      setAddressLine1(data?.address_line_1 || '');
      setAddressLine2(data?.address_line_2 || '');
      setZipCode(data?.postal_code || '');
      setTimeZone(data?.timezone || '');
      setInstall(data?.service_type?.install || false);
      setMaintenance(data?.service_type?.test_and_maintenance || false);
      setHearAboutUs(data?.how_did_you_hear_about_us?.toString() || '');
      setHearAboutUsComment(data?.how_did_you_hear_about_us_comment || '');
      setLogo(data?.logo ? { uri: data.logo } : null);
    } catch (err) {
      console.log(err);
      // Set default country if fetch fails
      setCountry('231');
    }
  };

  const getStates = async () => {
    try {
      const result = await axiosInstance.get('company-profile/get/state?country_id=231');
      if (result?.data?.status === 'success') {
        const stateData = result.data.data.map((s: any) => ({ label: s.name, value: String(s.id) }));
        setStates(stateData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCities = async () => {
    if (!state) return;
    try {
      const result = await axiosInstance.get('company-profile/get/city', { params: { state_id: state } });
      if (result?.data?.status === 'success') {
        const cityData = result.data.data.map((c: any) => ({ label: c.name, value: String(c.id) }));
        setCities(cityData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getServiceAreas = async () => {
    try {
      const result = await axiosInstance.get('/state/service-area');
      const fsa = result?.data?.data.map((s: any) => ({ label: s.name, value: String(s.id) }));
      setServiceAreas(fsa);
    } catch (err) {
      console.log(err);
    }
  };

  const getAhj = async (params = {}) => {
    const response = await axiosInstance.get('/company-profile/get/ahj', { params });
    return response.data;
  };

  const getAhjJurisdictionList = async (statesArr: any[]) => {
    if (!statesArr.length) {
      setJurisdictions([]);
      setSelectedAhj([]);
      return;
    }
    try {
      const res = await getAhj({ state_id: statesArr[0] });
      if (res?.status === 'success') {
        const formatted = res.data.map((item: any) => ({ label: item.name, value: String(item.id) }));
        setJurisdictions(formatted);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!country) newErrors.country = 'Country is required';
    if (!state) newErrors.state = 'State is required';
    if (!city) newErrors.city = 'City is required';
    if (!zipCode.trim()) newErrors.zipCode = 'Postal code is required';
    if (!timeZone) newErrors.timeZone = 'Time zone is required';
    if (!hearAboutUs) newErrors.hearAboutUs = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const payload = {
      id: cid,
      stepNumber: 1,
      step_1: {
        id: cid,
        name: companyName,
        email,
        country_id: country,
        state_id: state,
        city,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        postal_code: zipCode,
        phone: '+919956560357',
        service_type: { install, test_and_maintenance: maintenance },
        service_area: selectedAreas,
        ahj_id: selectedAhj,
        timezone: timeZone,
        how_did_you_hear_about_us: hearAboutUs,
        how_did_you_hear_about_us_comment: hearAboutUs === '0' ? hearAboutUsComment : '',
      },
    };
    try {
      const result = await axiosInstance.post('company-profile/post', payload);
      if (result?.status === 200) {
        updateStepData('step_1', payload.step_1);
        Alert.alert('Success', 'Company information saved successfully!');
        handleNext();
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      getAhjJurisdictionList([state]);
      getCities();
    }
  }, [state]);

  useEffect(() => {
    getCompanyDetails();
    getStates();
    getServiceAreas();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Company Information</Text>

        <TouchableOpacity onPress={pickImage} style={styles.logoContainer}>
          {logo ? <Image source={{ uri: logo.uri }} style={styles.logo} /> : <Text style={{ color: '#888' }}>Upload Company Logo</Text>}
        </TouchableOpacity>

        <Input placeholder="Enter Company Name" value={companyName} onChangeText={setCompanyName} />
        {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}

        <EmailInput placeholder="Email / Username" value={email} onChangeText={setEmail} />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Input placeholder="Postal Code" maxLength={8} value={zipCode} onChangeText={setZipCode} />
        {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}

        <CustomDropDown
          data={countries}
          placeholder="Select Country"
          value={country}
          onChange={(i: any) => setCountry(i.value)}
        />
        {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

        <CustomDropDown data={states} placeholder="Select State" value={state} onChange={(i: any) => setState(i.value)} />
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

        <CustomDropDown data={cities} placeholder="Select City" value={city} onChange={(i: any) => setCity(i.value)} />
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

        <Input placeholder="Address Line 1" value={addressLine1} onChangeText={setAddressLine1} />
        <Input placeholder="Address Line 2" value={addressLine2} onChangeText={setAddressLine2} />

        <View style={styles.checkboxGroup}>
          <Checkbox label="Install" value={install} onChange={setInstall} />
          <Checkbox label="Test & Maintenance" value={maintenance} onChange={setMaintenance} />
        </View>

        <MultiSelect
          style={styles.dropdown}
          data={serviceAreas}
          labelField="label"
          valueField="value"
          placeholder="Select Service Areas"
          value={selectedAreas}
          onChange={item => setSelectedAreas(item)}
          selectedStyle={styles.selectedItem}
          selectedTextStyle={styles.selectedText}
          maxHeight={200}
        />

        <MultiSelect
          style={styles.dropdown}
          data={jurisdictions}
          labelField="label"
          valueField="value"
          placeholder="Select AHJ Jurisdictions"
          value={selectedAhj}
          onChange={items => setSelectedAhj(items)}
          selectedStyle={styles.selectedItem}
          selectedTextStyle={styles.selectedText}
        />

        <CustomDropDown data={timeZones} placeholder="Select Time Zone" value={timeZone} onChange={(i: any) => setTimeZone(i.value)} />
        {errors.timeZone && <Text style={styles.errorText}>{errors.timeZone}</Text>}

        <CustomDropDown data={hearAboutUss} placeholder="How did you hear about us?" value={hearAboutUs} onChange={(i: any) => setHearAboutUs(i.value)} />
        {errors.hearAboutUs && <Text style={styles.errorText}>{errors.hearAboutUs}</Text>}

        {hearAboutUs === '0' && <Input placeholder="Please specify" value={hearAboutUsComment} onChangeText={setHearAboutUsComment} />}

        <ButtonUi title={loading ? <ActivityIndicator color="#fff" /> : 'Next'} buttonStyle={{ width: '100%', marginTop: 20 }} onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  selectedItem: { backgroundColor: '#e6f0ff' },
  selectedText: { color: '#0055ff' },
  logo: { width: 100, height: 100, borderRadius: 10 },
  checkboxGroup: { marginVertical: 12, flexDirection: 'row', justifyContent: 'space-between' },
  errorText: { color: 'red', fontSize: 13, marginBottom: 8 },
});

export default FirstStepPage;

import React, { useState } from 'react';
import {
  Switch,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import CustomDropDown from '../../../../../components/CustomDropDown';
import DatePicker from 'react-native-date-picker';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/ButtonUi';
import * as DocumentPicker from '@react-native-documents/picker';
import Icon from '@react-native-vector-icons/fontawesome';
import { axiosInstance } from '../../../../../Service/api';

const FillReport = () => {
  // Existing states
  const [system, setSystem] = useState('');
  const [inspectionDate, setInspectionDate] = useState(new Date());
  const [reportType, setReportType] = useState('');
  const [contact, setContact] = useState('');
  const [jobId, setJobId] = useState('');
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDeficiencies, setIsDeficiencies] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState('');
  const [isRepeatative, setIsRepeatative] = useState(false);
  const [follwUp, setFollowUp] = useState(false);
  const [open, setOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [ahjSystem, setAhjSystem] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [openServiceDate, setOpenServiceDate] = useState(false);

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [contactType, setContactType] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [preferredComm, setPreferredComm] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');

  // Error states
  const [errors, setErrors] = useState<any>({});

  const systems = [
    { label: 'System 1', value: 'system1' },
    { label: 'System 2', value: 'system2' },
    { label: 'System 3', value: 'system3' },
  ];
  const reportTypes = [
    { label: 'Type 1', value: 'type1' },
    { label: 'Type 2', value: 'type2' },
    { label: 'Type 3', value: 'type3' },
  ];
  const statuses = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  const contactTypes = [
    { label: 'Owner', value: 'owner' },
    { label: 'Manager', value: 'manager' },
    { label: 'Technician', value: 'technician' },
  ];
  const preferredComms = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'SMS', value: 'sms' },
  ];

  const handlePickDocument = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });
      if (results && results.length > 0) {
        setFile(results[0]);
      }
    } catch (err: any) {
      if (!err?.message?.includes('User canceled')) {
        console.error('DocumentPicker error:', err);
      }
    }
  };

  const validateReportForm = () => {
    const newErrors: any = {};

    if (!system) newErrors.system = 'Please select a system.';
    if (!inspectionDate)
      newErrors.inspectionDate = 'Please select inspection date.';
    if (!reportType) newErrors.reportType = 'Please select report type.';
    if (!contact) newErrors.contact = 'Please select a contact.';
    if (!jobId.trim()) newErrors.jobId = 'Job ID is required.';

    if (isDeficiencies) {
      if (!title.trim()) newErrors.title = 'Title is required.';
      if (!description.trim())
        newErrors.description = 'Description is required.';
      if (!classification)
        newErrors.classification = 'Classification is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSystemForm = () => {
    const newErrors: any = {};
    if (!ahjSystem) newErrors.ahjSystem = 'Please select AHJ system.';
    if (!lastServiceDate)
      newErrors.lastServiceDate = 'Please select last service date.';
    if (!status) newErrors.status = 'Please select status.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = () => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;

    if (!contactType) newErrors.contactType = 'Please select contact type.';
    if (!contactName.trim()) newErrors.contactName = 'Name is required.';
    if (!contactMobile.trim()) {
      newErrors.contactMobile = 'Mobile number is required.';
    } else if (!phoneRegex.test(contactMobile)) {
      newErrors.contactMobile = 'Invalid mobile number format.';
    }
    if (!preferredComm)
      newErrors.preferredComm = 'Select preferred communication.';
    if (!contactEmail.trim()) {
      newErrors.contactEmail = 'Email address is required.';
    } else if (!emailRegex.test(contactEmail)) {
      newErrors.contactEmail = 'Invalid email address.';
    }
    if (!mailingAddress.trim())
      newErrors.mailingAddress = 'Mailing address is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReport = async () => {
    if (!validateReportForm()) return;
    const demoPayload = {
      model: {
        system_type: '9#470#67516',
        actual_inspection_date: '2025-10-29T18:30:00.000Z',
        filling_type: 1,
        contact_id: null,
        contact_ids: [36590],
        renewal_plan_id: null,
        file_type: null,
        file_data: [
          {
            path: 'tmp/161c49f4-be62-4ac7-98c0-4f8bf4d27525',
            name: 'breport.pdf',
            type: 'application/pdf',
          },
        ],
        template_id: null,
        form_values: null,
        report_type: 0,
        attached_document: [
          {
            path: 'tmp/ad823a46-6964-4489-8d5e-e6a3db87337f',
            name: '21-07-2025.pdf',
            type: 'application/pdf',
          },
        ],
        premise_id: 57853,
        signature: '',
        ahj_group_id: null,
        ahj_id: 40,
        inspector_id: null,
        clone_flag: false,
        job_id: '000',
        clone_report_id: null,
        chargeable: null,
        emailReport: 0,
        is_fire_alarm_monitored: null,
        alarm_company: null,
        acceptance_test: null,
        show_signature_blocks: 2,
        show_only_some_signatures: 1,
        is_internal_post_paid: null,
        ahj_product_id: null,
        filling_start_ts: '2025-10-30T02:19:28.528Z',
        filling_end_ts: '2025-10-30T02:24:55.783Z',
      },
      formValue: {
        deficiency: [],
      },
      update_reinspection_date: null,
      reinspection_date: null,
      includeReport: false,
      includeDeficiencyImages: false,
      customEmail: '',
      allRecipients: '["pawan@mightcode.com"]',
    };
    const payload = {
      system,
      inspectionDate,
      reportType,
      contact,
      jobId,
      isInstalled,
      isDeficiencies,
      deficiencies: isDeficiencies
        ? { title, description, classification, isRepeatative, file }
        : null,
      follwUp,
      additionalFile: file,
    };
    console.log('✅ Report Payload:', payload);

    try {
      const response = await axiosInstance.post('/fill-report', demoPayload);
      console.log('Response from API:', response.data);
    } catch (error: any) {
      console.error('Error submitting report:', error.response);
    }
  };

  const handleSubmitSystem = async () => {
    const demoPayload = {
      id: null,
      premise_id: 57854,
      ahj_system_type_id: 452,
      status: 1,
      last_date_of_service: '2025-10-22T18:30:00.000Z',
      in_activation_reason: '',
    };
    if (!validateSystemForm()) return;

    const payload = { ahjSystem, lastServiceDate, status };
    console.log('✅ System Payload:', payload);

    try {
      const response = await axiosInstance.post(
        '/premise-ahj-system-type',
        demoPayload,
      );
      console.log('Response from API:', response);
      setModalVisible(false);
    } catch (error: any) {
      console.error('Error adding AHJ system:', error.response);
    }
  };

  const handleSubmitContact = () => {
    if (!validateContactForm()) return;

    const payload = {
      contactType,
      contactName,
      contactMobile,
      preferredComm,
      contactEmail,
      mailingAddress,
    };
    console.log('✅ Contact Payload:', payload);
  
    const demoPayload = {
      id: null,
      first_name: 'Aman',
      email: 'aman32@mightcode.com',
      phone_number: '+1456789',
      emergency_phone_number: '+1456786789',
      address: 'mohan23@mightcode.com',
      type: 1,
      premise_id: 57846,
      ahj_id: 48,
      premises_ids: [57846],
      is_default: false,
    };
    try {
      const response = axiosInstance.post('/address', demoPayload);
      console.log('Response from API:', response);
      setContactModalVisible(false);
    } catch (error: any) {
      console.error('Error adding contact:', error.response);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.heading}>Fill Report</Text>

        {/* System Dropdown */}
        <View style={styles.dropdownWithButton}>
          <View style={{ flex: 1 }}>
            <CustomDropDown
              placeholder="Please Select System"
              value={system}
              onChange={(i: any) => setSystem(i.value)}
              data={systems}
            />
            {errors.system && <Text style={styles.error}>{errors.system}</Text>}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Inspection Date */}
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Input
            placeholder="Inspection Date"
            value={inspectionDate.toLocaleDateString()}
            editable={false}
            onChangeText={() => {}}
          />
        </TouchableOpacity>
        {errors.inspectionDate && (
          <Text style={styles.error}>{errors.inspectionDate}</Text>
        )}

        <DatePicker
          modal
          open={open}
          date={inspectionDate}
          onConfirm={date => {
            setOpen(false);
            setInspectionDate(date);
          }}
          onCancel={() => setOpen(false)}
          mode="date"
        />

        {/* Report Type */}
        <CustomDropDown
          placeholder="Please Select Report Type"
          value={reportType}
          onChange={(i: any) => setReportType(i.value)}
          data={reportTypes}
        />
        {errors.reportType && (
          <Text style={styles.error}>{errors.reportType}</Text>
        )}

        {/* Contact Dropdown */}
        <View style={styles.dropdownWithButton}>
          <View style={{ flex: 1 }}>
            <CustomDropDown
              placeholder="Premise contact for email verification"
              value={contact}
              onChange={(i: any) => setContact(i.value)}
              data={systems}
            />
            {errors.contact && (
              <Text style={styles.error}>{errors.contact}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setContactModalVisible(true)}
          >
            <Icon name="plus" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Job ID */}
        <Input
          placeholder="Job ID"
          value={jobId}
          onChangeText={text => setJobId(text)}
        />
        {errors.jobId && <Text style={styles.error}>{errors.jobId}</Text>}

        {/* Switches */}
        <Text style={styles.label}>Is this a newly installed system?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isInstalled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={() => setIsInstalled(!isInstalled)}
          value={isInstalled}
        />

        {/* Deficiency Section */}
        <View style={styles.deficiencySection}>
          <View style={styles.deficiencyHeader}>
            <Text style={styles.label}>
              Are there any outstanding deficiencies?
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDeficiencies ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={() => setIsDeficiencies(!isDeficiencies)}
              value={isDeficiencies}
            />
          </View>

          {isDeficiencies && (
            <>
              <Input
                placeholder="Title"
                value={title}
                onChangeText={text => setTitle(text)}
              />
              {errors.title && <Text style={styles.error}>{errors.title}</Text>}

              <Input
                placeholder="Description"
                value={description}
                onChangeText={text => setDescription(text)}
              />
              {errors.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}

              <CustomDropDown
                placeholder="Classification"
                value={classification}
                onChange={(i: any) => setClassification(i.value)}
                data={systems}
              />
              {errors.classification && (
                <Text style={styles.error}>{errors.classification}</Text>
              )}

              <Text style={styles.label}>Is this a repeat violation?</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isRepeatative ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={() => setIsRepeatative(!isRepeatative)}
                value={isRepeatative}
              />

              <Text style={styles.subHeading}>File Upload</Text>
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={handlePickDocument}
              >
                <Text>{file ? file.name : 'Choose File'}</Text>
              </TouchableOpacity>

              <Button title="Add Deficiency" onPress={handleSubmitReport} />
            </>
          )}
        </View>

        {/* Follow up */}
        <Text style={styles.label}>Schedule Follow Up?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={follwUp ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={() => setFollowUp(!follwUp)}
          value={follwUp}
        />

        {/* File upload */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.subHeading}>Upload Additional Documents</Text>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={handlePickDocument}
          >
            <Text>{file ? file.name : 'Choose File'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title={'Submit Report'} onPress={handleSubmitReport} />
        </View>
      </View>

      {/* --- SYSTEM MODAL --- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={22} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add AHJ System</Text>

            <CustomDropDown
              placeholder="Select an AHJ System"
              value={ahjSystem}
              onChange={(i: any) => setAhjSystem(i.value)}
              data={systems}
            />
            {errors.ahjSystem && (
              <Text style={styles.error}>{errors.ahjSystem}</Text>
            )}

            <TouchableOpacity onPress={() => setOpenServiceDate(true)}>
              <Input
                placeholder="Last Date of Service"
                value={lastServiceDate.toLocaleDateString()}
                editable={false}
                onChangeText={() => {}}
              />
            </TouchableOpacity>
            {errors.lastServiceDate && (
              <Text style={styles.error}>{errors.lastServiceDate}</Text>
            )}

            <DatePicker
              modal
              open={openServiceDate}
              date={lastServiceDate}
              onConfirm={date => {
                setOpenServiceDate(false);
                setLastServiceDate(date);
              }}
              onCancel={() => setOpenServiceDate(false)}
              mode="date"
            />

            <CustomDropDown
              placeholder="Select Status"
              value={status}
              onChange={(i: any) => setStatus(i.value)}
              data={statuses}
            />
            {errors.status && <Text style={styles.error}>{errors.status}</Text>}

            <View style={{ marginTop: 20 }}>
              <Button title="Save" onPress={handleSubmitSystem} />
            </View>
          </View>
        </View>
      </Modal>

      {/* --- CONTACT MODAL --- */}
      <Modal visible={contactModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setContactModalVisible(false)}
            >
              <Icon name="close" size={22} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>New Contact</Text>

            <CustomDropDown
              placeholder="Contact Type"
              value={contactType}
              onChange={(i: any) => setContactType(i.value)}
              data={contactTypes}
            />
            {errors.contactType && (
              <Text style={styles.error}>{errors.contactType}</Text>
            )}

            <Input
              placeholder="Name *"
              value={contactName}
              onChangeText={text => setContactName(text)}
            />
            {errors.contactName && (
              <Text style={styles.error}>{errors.contactName}</Text>
            )}

            <Input
              placeholder="Mobile * (eg: +1 201-555-0123)"
              value={contactMobile}
              onChangeText={text => setContactMobile(text)}
            />
            {errors.contactMobile && (
              <Text style={styles.error}>{errors.contactMobile}</Text>
            )}

            <CustomDropDown
              placeholder="Preferred Communication Type"
              value={preferredComm}
              onChange={(i: any) => setPreferredComm(i.value)}
              data={preferredComms}
            />
            {errors.preferredComm && (
              <Text style={styles.error}>{errors.preferredComm}</Text>
            )}

            <Input
              placeholder="Email Address *"
              value={contactEmail}
              onChangeText={text => setContactEmail(text)}
            />
            {errors.contactEmail && (
              <Text style={styles.error}>{errors.contactEmail}</Text>
            )}

            <Input
              placeholder="Mailing Address"
              value={mailingAddress}
              onChangeText={text => setMailingAddress(text)}
            />
            {errors.mailingAddress && (
              <Text style={styles.error}>{errors.mailingAddress}</Text>
            )}

            <View style={{ marginTop: 20 }}>
              <Button title="Save" onPress={handleSubmitContact} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },

  // ========== Main Card ==========
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
    textAlign: 'center',
  },

  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },

  // ========== Dropdown + Add Button ==========
  dropdownWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },

  addButton: {
    backgroundColor: '#2563EB',
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ========== Error Text ==========
  error: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },

  // ========== Deficiency Section ==========
  deficiencySection: {
    marginTop: 16,
    paddingVertical: 10,
  },

  deficiencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  uploadBtn: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 12,
  },

  // ========== Modal Styles ==========
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 4,
  },

  // ========== Buttons ==========
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  secondaryButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default FillReport;

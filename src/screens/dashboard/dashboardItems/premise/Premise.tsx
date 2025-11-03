import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { axiosInstance } from '../../../../Service/api';

const columns = [
  'ID',
  'Name',
  'Address',
  'Address Line 2',
  'Jurisdiction',
  'Ref.Num',
  'Building No',
  'Building License',
  'Postal Code',
  'Latitude',
  'Longitude',
  'Status',
  'Fire Watch',
  'Fire Watch Notice Sent At',
  'Created At',
  'Updated At',
  'Action',
];

const PremiseTable = ({ navigation }: { navigation: any }) => {
  const [premises, setPremises] = useState<any[]>([]);

  const handleCreatePremise = () => {
    navigation.navigate('Create Premise');
  };

  const handleNamePress = (premiseId: number) => {
    Alert.alert(
      'Premise Selected',
      `You selected premise with ID: ${premiseId}`,
    );
    navigation.navigate('Premise Details', { premiseId });
  };

  const getPremises = async () => {
    try {
      const result = await axiosInstance.get('premise/premise-list', {
        params: {
          with: [
            'ahj',
            'city',
            'systemtype',
            'premiseAhjOccupancyType.ahjOccupancyType.occupancyType:id,name',
            'ahjZone:id,name',
            'managedBy',
            'premiseAhjLabels.ahjLabel',
            'premiseAhjSystemTypes',
            'premiseAhjSystemTypes.ahjSystemType.systemType',
            'contactsPremises',
          ],
          orderField: 'created_at',
          orderBy: 'desc',
          should_sort: true,
        },
      });
      console.log('result of premise list', result?.data);
      setPremises(result?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPremises();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Premise Reports</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreatePremise}
        >
          <Text style={styles.createButtonText}>+ Create Premise</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator nestedScrollEnabled>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            {columns.map((col, index) => (
              <Text key={index} style={[styles.cell, styles.headerCell]}>
                {col}
              </Text>
            ))}
          </View>

          <ScrollView
            style={{ maxHeight: '100%' }}
            nestedScrollEnabled
            showsVerticalScrollIndicator
          >
            {premises.map((item: any, rowIndex: number) => (
              <View
                key={item.id}
                style={[
                  styles.row,
                  {
                    backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  },
                ]}
              >
                <Text style={styles.cell}>{item.id}</Text>
                <TouchableOpacity
                  style={styles.cell}
                  onPress={() => {
                    console.log(item);
                    handleNamePress(item.id);
                  }}
                >
                  <Text style={styles.linkText}>{item.premise_name}</Text>
                </TouchableOpacity>

                <Text style={styles.cell}>{item.address_line_1}</Text>
                <Text style={styles.cell}>{item.address_line_2 || '-'}</Text>
                <Text style={styles.cell}>{item.jurisdiction_id || '-'}</Text>
                <Text style={styles.cell}>{item.reference_number}</Text>
                <Text style={styles.cell}>{item.building_number || '-'}</Text>
                <Text style={styles.cell}>{item.building_license || '-'}</Text>
                <Text style={styles.cell}>{item.postal_code}</Text>
                <Text style={styles.cell}>{item.latitude}</Text>
                <Text style={styles.cell}>{item.longitude}</Text>
                <Text style={styles.cell}>
                  {item.status === 2 ? 'Active' : 'Inactive'}
                </Text>
                <Text style={styles.cell}>
                  {item.on_fire_watch ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.cell}>
                  {item.fire_watch_notice_sent_at || '-'}
                </Text>
                <Text style={styles.cell}>
                  {item.created_at?.split('T')[0]}
                </Text>
                <Text style={styles.cell}>
                  {item.updated_at?.split('T')[0]}
                </Text>

                <TouchableOpacity onPress={() => console.log('View', item.id)}>
                  <Text style={[styles.cell, { color: '#007bff' }]}>View</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default PremiseTable;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f4',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerRow: {
    backgroundColor: '#007bff',
  },
  cell: {
    width: 180,
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

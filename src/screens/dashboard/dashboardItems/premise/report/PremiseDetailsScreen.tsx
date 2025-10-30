import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Button from '../../../../../components/ButtonUi';
import Card from '../../../../../components/Card';

const PremiseDetailsScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [activeTab, setActiveTab] = useState('Premise Details');
  const { premiseId } = route.params;
  const tabs = [
    'Premise Details',
    'Inspection Reports',
    'Outstanding Deficiency',
    'Contacts Details',
    'Map View',
    'System Type Details',
    'AHJ Details',
    'Email Log',
  ];

  return (
    <Card style={{ flex: 1, padding: 10, margin: 10 }}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.contentBox}>
          {activeTab === 'Premise Details' ? (
            <>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.editButton]}>
                  <Text style={styles.buttonText}>Edit Premise</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.fillButton]}
                  onPress={() =>
                    navigation.navigate('Fill Report', { premiseId })
                  }
                >
                  <Text style={styles.buttonText}>Fill Report</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.contentText}>
                This is the Premise Details section. You can view and edit
                premise information here.
              </Text>
              <Button
                title={'Back'}
                onPress={() => navigation.navigate('Home')}
              />
            </>
          ) : (
            <Text style={styles.contentText}>
              {activeTab} content will appear here.
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  fillButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexGrow: 0,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  contentBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#555',
  },
});

export default PremiseDetailsScreen;

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const ReportTable = () => {
  const data = Array.from({ length: 10 }).map((_, i) => ({
    id: `IDVC${i + 1}`,
    systemType: i % 2 === 0 ? 'Solar Power' : 'Wind Turbine',
    createdOn: `2025-10-${(i % 30) + 1}`,
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    impairment: i % 3 === 0 ? 'Low Output' : 'None',
    paymentStatus: i % 2 === 0 ? 'Paid' : 'Pending',
    zone: ['North', 'South', 'East', 'West'][i % 4],
  }));

  const tiles = [
    { id: 1, title: 'Critical Alerts', color: '#dc3545' }, 
    { id: 2, title: 'Pending Reviews', color: '#0dcaf0' }, 
    { id: 3, title: 'Active Systems', color: '#198754' }, 
    { id: 4, title: 'Awaiting Payment', color: '#ffc107' }, 
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ---------------------- First Table ---------------------- */}
        <View>
          <Text style={styles.sectionTitle}>Reports Pending for AHJ approval</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} nestedScrollEnabled={true}>
            <View style={{ width: 1100 }}>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Report IDvc</Text>
                <Text style={[styles.cell, styles.headerCell]}>System Type</Text>
                <Text style={[styles.cell, styles.headerCell]}>Created On</Text>
                <Text style={[styles.cell, styles.headerCell]}>Status</Text>
                <Text style={[styles.cell, styles.headerCell]}>Impairment</Text>
                <Text style={[styles.cell, styles.headerCell]}>Payment Status</Text>
                <Text style={[styles.cell, styles.headerCell]}>Zone</Text>
              </View>

              <ScrollView style={{ height: 400 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={true}>
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.row,
                      { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' },
                    ]}
                  >
                    <Text style={styles.cell}>{item.id}</Text>
                    <Text style={styles.cell}>{item.systemType}</Text>
                    <Text style={styles.cell}>{item.createdOn}</Text>
                    <Text style={styles.cell}>{item.status}</Text>
                    <Text style={styles.cell}>{item.impairment}</Text>
                    <Text style={styles.cell}>{item.paymentStatus}</Text>
                    <Text style={styles.cell}>{item.zone}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        {/* ---------------------- Second Table ---------------------- */}
        <View>
          <Text style={styles.sectionTitle}>Reports Pending Correction</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true} nestedScrollEnabled={true}>
            <View style={{ width: 1100 }}>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Report IDvc</Text>
                <Text style={[styles.cell, styles.headerCell]}>System Type</Text>
                <Text style={[styles.cell, styles.headerCell]}>Created On</Text>
                <Text style={[styles.cell, styles.headerCell]}>Status</Text>
                <Text style={[styles.cell, styles.headerCell]}>Impairment</Text>
                <Text style={[styles.cell, styles.headerCell]}>Payment Status</Text>
                <Text style={[styles.cell, styles.headerCell]}>Zone</Text>
              </View>

              <ScrollView style={{ height: 400 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={true}>
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.row,
                      { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' },
                    ]}
                  >
                    <Text style={styles.cell}>{item.id}</Text>
                    <Text style={styles.cell}>{item.systemType}</Text>
                    <Text style={styles.cell}>{item.createdOn}</Text>
                    <Text style={styles.cell}>{item.status}</Text>
                    <Text style={styles.cell}>{item.impairment}</Text>
                    <Text style={styles.cell}>{item.paymentStatus}</Text>
                    <Text style={styles.cell}>{item.zone}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        {/* ---------------------- Tiles Section ---------------------- */}
        <View style={styles.tileContainer}>
          {tiles.map((tile) => (
            <TouchableOpacity
              key={tile.id}
              style={[styles.tile, { backgroundColor: tile.color }]}
              activeOpacity={0.8}
              onPress={() => console.log(`${tile.title} clicked`)} 
            >
              <Text style={styles.tileTitle}>{tile.title}</Text>
              <Text style={styles.tileSubtitle}>More Info →</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportTable;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f4',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    width: 150,
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  headerCell: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  tile: {
    width: screenWidth / 2 - 20, 
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  tileTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tileSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
});

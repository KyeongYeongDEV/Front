import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';

export type NavigateList = {
  HospitalAlarm: undefined;
};

const HospitalAlarmListScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigateList>>();

  const flatListRef = useRef<FlatList>(null);
  
  // TODO: useMemo 사용
  const alarms = [
    { id: '1', date: '2024/01/15', time: '09:30', hospitalName: '복음병원',hospitalAlarmDetail : '정형외과 김ㅇㅇ 전문의'},
    { id: '2', date: '2024/01/15', time: '09:30', hospitalName: '복음병원',hospitalAlarmDetail : '정형외과 김ㅇㅇ 전문의'},
    { id: '3', date: '2024/01/15', time: '09:30', hospitalName: '복음병원',hospitalAlarmDetail : '정형외과 김ㅇㅇ 전문의'},
    { id: '4', date: '2024/01/15', time: '09:30', hospitalName: '복음병원',hospitalAlarmDetail : '정형외과 김ㅇㅇ 전문의'},
    { id: '5', date: '2024/01/15', time: '09:30', hospitalName: '복음병원',hospitalAlarmDetail : '정형외과 김ㅇㅇ 전문의'},
  ];

  const renderAlertItem = ({item}: {item : { id: number; date: string; time: string; hospitalName: string, hospitalAlarmDetail : string}}) => (
    <View style={styles.alertItem}>
      <Text style={styles.alertText}>
        {item.date} {item.time}
      </Text>
      <Text style={styles.alertInfo}>{item.hospitalName}</Text>
      <Text style={styles.alertInfo}>{item.hospitalAlarmDetail}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>수정하기 버튼</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <Text style={styles.header}>복약 알림 정보</Text>
      <View style={styles.test}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('HospitalAlarm')}
        >
          <Text style={styles.addButtonText}>+</Text>
          <Text style={styles.addButtonSubtitle}>알림 추가하기 버튼</Text>
        </TouchableOpacity>
        <FlatList
          ref={flatListRef} 
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={renderAlertItem}
          style={styles.alertList}
        />
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  notchArea: {
    height: StatusBar.currentHeight || 1, // 노치 높이
    backgroundColor: 'transparent', // 터치 영역
  },
  test: { padding: 20, flex : 1 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B4B4B',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#6E83B7',
    paddingVertical: 15,
    paddingHorizontal: 25, // FlatList와 동일한 가로 패딩 (FlatList의 padding과 일치)
    padding:20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButtonSubtitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  alertList: {
    flex: 1,
  },
  alertItem: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 17,
    marginBottom: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  alertText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4B4B4B',
    textAlign: 'center',
  },
  alertInfo: {
    fontSize: 20,
    color: '#4B4B4B',
    marginBottom: 10,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E83B7',
  },
});

export default HospitalAlarmListScreen;
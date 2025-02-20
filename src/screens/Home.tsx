import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { PillAlarmDayDataType, PillAlarmDayResponseType } from '../types/pillAlarm';
import { hospitalAlarmDayDataType, hospitalAlarmDayResponseType } from '../types/hospitalAlarm';

export type HomeList = {
  PillAlarm: undefined;
  HospitalAlarm: undefined;
  SearchPill: undefined;
  PillAlarmList: undefined;
  HospitalAlarmList: undefined;
};

const HomeScreen = () => {
  const url = "http://52.78.204.121:8080"; // API 서버 URL
  const navigation = useNavigation<NavigationProp<HomeList>>();

  
  const [userName, setUserName] = useState<string>('최경영');
  const [userId, setUserId] = useState<number>(1);
  const [pillAlarms, setPillAlarms] = useState<PillAlarmDayDataType>();
  const [hospitalAlarms, setHospitalAlarms] = useState<hospitalAlarmDayDataType>();
  // const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
  const today = '2025-02-03' ;

  useEffect(() => {
    fetchPillAlarms();
    fetchHospitalAlarms();
    fetchUserInfo(); 
  }, []);

  /** 📌 복약 알람 데이터 가져오기 */
  const fetchPillAlarms = async () => {
    try {
      const response : PillAlarmDayResponseType = await axios.get(`${url}/alarm/pill/day/${userId}/${today}`);
      if (response.data.success) {
        setPillAlarms(response.data.data);
      }
    } catch (error) {
      console.error("📌 복약 알람 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  /** 📌 병원 예약 알람 데이터 가져오기 */
  const fetchHospitalAlarms = async () => {
    try {
      const response : hospitalAlarmDayResponseType= await axios.get(`${url}/alarm/hospital/day/${userId}/${today}`);
      if (response.data.success) {
        setHospitalAlarms(response.data.data);
      }
    } catch (error) {
      console.error("📌 병원 예약 알람 데이터를 가져오는 중 오류 발생:", error);
    }
  };
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${url}/user/${userId}`);

      if (response.data.success) {
        setUserName(response.data.data.userName);
      }
    } catch (error) {
      console.error("📌 사용자 데이터를 가져오는 중 오류 발생:", error);
    }
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>안녕하세요! {userName}님</Text>

        {/* 날짜 및 예정된 알람 정보 */}
        <View style={styles.card}>
          <Text style={styles.date}>{today}</Text>

          {/* 📌 복약 알림 */}
          <View style={styles.infoRow}>
            <Image source={require('../assets/pill.jpg')} style={styles.icon} />
            {pillAlarms?.dailyPillAlarmCount > 0 ? (
              <>
                <View>
                  <Text style={styles.infoText}>
                    {pillAlarms?.alarms[0].hourTime}시 {pillAlarms?.alarms[0].minTime}분
                  </Text>
                  <Text style={styles.infoText}>
                    {pillAlarms?.alarms[0].pillAlarmDetail}
                  </Text>

                  <Text style={styles.infoText}>
                    총 {pillAlarms?.dailyPillAlarmCount}건 복약 알림
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.infoText}>예정된 복약 없음</Text>
            )}
          </View>

          <View style={styles.divider} />

          {/* 📌 병원 방문 알림 */}
          <View style={styles.infoRow}>
            <Image source={require('../assets/hospital.png')} style={styles.icon} />
            {hospitalAlarms?.dailyHospitalAlarmCount > 0 ? (
                      <View>
                  <Text style={styles.infoText}>
                    {hospitalAlarms?.alarms[0].hourTime}시 {hospitalAlarms?.alarms[0].minTime}분
                  </Text>
                  <Text style={styles.infoText}>
                    {hospitalAlarms?.alarms[0].hospitalName} {hospitalAlarms?.alarms[0].hospitalAlarmDetail} 예정 
                  </Text>
                  
                  <Text style={styles.infoText}>
                    총 {hospitalAlarms?.dailyHospitalAlarmCount} 건 병원 방문 예정
                  </Text>
                </View>
            ) : (
              <Text style={styles.infoText}>예정된 병원 방문 없음</Text>
            )}
          </View>
        </View>

        {/* 내가 저장한 병원/약 */}
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/pill.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>내가 저장한 병원/약</Text>
        </TouchableOpacity>

        {/* 주변 가까운 병원 알아보기 */}
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/hospital.png')} style={styles.icon} />
          <Text style={styles.buttonText}>주변 가까운 병원 알아보기</Text>
        </TouchableOpacity>

        {/* 알림 추가/삭제 버튼 */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('PillAlarmList')}
          >
            <Image source={require('../assets/pill.jpg')} style={styles.icon} />
            <Text style={styles.smallCardTitle}>복약 알림</Text>
            <Text style={styles.smallCardSubtitle}>복약 알림 추가/삭제하기</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.smallCard}
            onPress={() => navigation.navigate('HospitalAlarmList')}
          >
            <Image source={require('../assets/hospital.png')} style={styles.icon} />
            <Text style={styles.smallCardTitle}>병원 방문 알림</Text>
            <Text style={styles.smallCardSubtitle}>병원 알림 추가/삭제하기</Text>
          </TouchableOpacity>
        </View>

        {/* 약 정보 검색하기 */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('SearchPill')}
        >
          <Image source={require('../assets/pill.jpg')} style={styles.icon} />
          <Text style={styles.buttonText}>약 정보 검색하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

/** 📌 스타일 정의 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: '1%',
    textAlign: 'left',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '5%',
    flex: 0.35,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  date: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6E83B7',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: '3%',
  },
  infoText: {
    fontSize: 18,
    color: '#4B4B4B',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: 10,
    marginBottom: '3%',
    flex: 0.13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E83B7',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
    flex: 0.15,
  },
  smallCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: '4%',
    marginHorizontal: '1.5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B4B4B',
    marginTop: '2%',
  },
  smallCardSubtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: '2%',
  },
  
});

export default HomeScreen;

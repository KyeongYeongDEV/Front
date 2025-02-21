import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';

type navigationType = {
  Main: undefined;
  PillAlarmList : undefined;
};

const PillAlarmScreen = () => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [pillInfo, setPillInfo] = useState('');
  const [addMemo, setAddMemo] = useState('');

  const navigation = useNavigation<NavigationProp<navigationType>>();

  const handleConfirmDate = (selectedDate) => {
    setDate((prevDate) => {
      const updatedDate = new Date(prevDate);
      updatedDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      return updatedDate;
    });
    setDatePickerVisible(false);
  };

  const handleConfirmTime = (selectedTime) => {
    setDate((prevDate) => {
      const updatedDate = new Date(prevDate);
      updatedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      return updatedDate;
    });
    setTimePickerVisible(false);
  };

  const handleAddAlert = () => {
    Alert.alert(
      '복약 알림 추가됨',
      `날짜: ${date.toLocaleDateString('ko-KR')}\n시간: ${date.toLocaleTimeString(
        'ko-KR',
        { hour: '2-digit', minute: '2-digit' }
      )}\n복약 정보: ${pillInfo}`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.header}>복약 알림 추가</Text>

          {/* 날짜 선택 */}
          <View style={styles.section}>
            <Text style={styles.label}>날짜를 선택해주세요.</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={styles.dateText}>
                {date.toLocaleDateString('ko-KR')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 시간 선택 */}
          <View style={styles.section}>
            <Text style={styles.label}>시간을 선택해주세요.</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setTimePickerVisible(true)}
            >
              <Text style={styles.dateText}>
                {date.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 복약 정보 */}
          <View style={styles.section}>
            <Text style={styles.label}>복약 정보를 입력해주세요.</Text>
            <TextInput
              style={styles.input}
              placeholder="예) 감기약 2알, 타이레놀 1알"
              value={pillInfo}
              onChangeText={setPillInfo}
            />
          </View>

          {/* 추가 메모 */}
          <View style={styles.section}>
            <Text style={styles.label}>추가 메모</Text>
            <TextInput
              style={styles.textArea}
              placeholder="이곳을 눌러 입력해주세요."
              value={addMemo}
              onChangeText={setAddMemo}
              multiline
            />
          </View>

          {/* 완료 버튼 */}
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              handleAddAlert();
              navigation.goBack();
            }}
          >
            <Text style={styles.completeButtonText}>알림 추가 완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F8F8' },
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#4B4B4B', marginBottom: 20, textAlign:'center' },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#6E83B7', marginBottom: 10 },
  dateButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  dateText: { fontSize: 16, color: '#4B4B4B' },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  completeButton: {
    backgroundColor: '#6E83B7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default PillAlarmScreen;
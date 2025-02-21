import React from 'react';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import HospitalAlarmScreen from '../screens/hospitalAlarm';
import HospitalAlarmListScreen from '../screens/hospitalAlarmList';
import PillAlarmScreen from '../screens/pillAlarm';
import PillAlarmListScreen from '../screens/pillAlarmList'
import SearchPillScreen from '../screens/searchPill';
import PillDetailScreen from '../screens/pillDetail';
import { FavoritesProvider } from '../context/favorites';


export type RootStackParamList = {
  Home: undefined;
  HospitalAlarm: undefined;
  PillAlarm: undefined;
  LogIn: undefined;
  SignUp: undefined;
  PillAlarmList : undefined
  HospitalAlarmList : undefined;
  SearchPill: undefined;
  PillDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AfterLogin = () => {
  return <Text>로그인 후 페이지</Text>;
};

const BeforeLogin = () => {
  return (
    <FavoritesProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Home' }} 
          />
          <Stack.Screen
            name="PillAlarm"
            component={PillAlarmScreen}
            options={{ title: 'PillAlarmScreen' }}
          />
          <Stack.Screen
            name="PillAlarmList"
            component={PillAlarmListScreen}
            options={{ title: 'PillAlarmListScreen' }}
          />
          <Stack.Screen
            name="HospitalAlarm"
            component={HospitalAlarmScreen}
            options={{ title: 'HospitalAlarm' }}
          />
          <Stack.Screen
            name="HospitalAlarmList"
            component={HospitalAlarmListScreen}
            options={{ title: 'HospitalAlarmListScreen' }}
          />
          <Stack.Screen
            name="SearchPill"
            component={SearchPillScreen}
            options={{ title: 'SearchPillScreen' }}
          />
          <Stack.Screen
            name="PillDetail"
            component={PillDetailScreen}
            options={{ title: 'PillDetailScreen' }}
          />
      </Stack.Navigator>
    </FavoritesProvider>
  );
};

const RootStack = () => {
  const isLoggedIn = 0;
  //TODO : 함수명 바꿀 것
  return (
    <NavigationContainer>
      {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
    </NavigationContainer>
  );
};

export default RootStack;
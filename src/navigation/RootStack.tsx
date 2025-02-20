import React from 'react';
import Home from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



export type RootStackParamList = {
  Home: undefined;
  HospitalAlarm: undefined;
  PillAlarm: undefined;
  LogIn: undefined;
  SignUp: undefined;
  SearchPill: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AfterLogin = () => {
  return <Text>로그인 후 페이지</Text>;
};

const BeforeLogin = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
};

const AppInner = () => {
  const isLoggedIn = 0;
  //TODO : 함수명 바꿀 것
  return (
    <NavigationContainer>
      {isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
    </NavigationContainer>
  );
};

export default AppInner;


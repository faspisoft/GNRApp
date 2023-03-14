import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import * as Sharing from 'expo-sharing';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './Screens/Splash';
import LoginScreen from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import SearchVehicle from './Screens/SearchVehicle';
import BookListScreen from './Screens/BookingList';
import BookingDetail from './Screens/BookingDetails'
import Booking from './Screens/Booking';
import ChPassScreen from './Screens/ChPass';
import PendingBookingList from './Screens/PendingList';
import PendingBookingDetail from './Screens/PendingBookingDetailsList';
import HistoryListLoading from './Screens/HistoryListLoading';
import  HistoryList from './Screens/HistoryList';
import Cam from './Screens/cam';
import DriverList from './Screens/DriverList';
import AddDriver from './Screens/AddDriver';

const Stack = createNativeStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="Splash" component={SplashScreen}/> */}

         <Stack.Screen name="Login" component={LoginScreen} /> 
         <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SearchVehicle" component={SearchVehicle} />
        <Stack.Screen name="BookingList" component={BookListScreen}/>
        <Stack.Screen name="Booking" component={Booking}/>
        <Stack.Screen name="BookingDetail" component={BookingDetail}/>   
        <Stack.Screen name="ChPass" component={ChPassScreen}/>
        <Stack.Screen name="HistoryListLoading" component={HistoryListLoading}/>
        {/* <Stack.Screen name="PendingSearchVehicle" component={PendingSearchVehicle}/> */}
        <Stack.Screen name="PendingBookingList" component={PendingBookingList} />
        <Stack.Screen name="PendingBookingDetail" component={PendingBookingDetail} />
        <Stack.Screen name="Camera" component={Cam} />
        <Stack.Screen name="DriverList" component={DriverList} />
        <Stack.Screen name="AddDriver" component={AddDriver} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  
});

export default App;
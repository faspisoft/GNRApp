import React, { Component,useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TextInput, Image, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal, PixelRatio, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from '../assets/logout.png';
import searchIcon from '../assets/search.png';
import {baseUrl} from '../package.json';
const fontFactor = PixelRatio.getFontScale();

// export default class DriverList extends Component {
//     constructor(props) {
//         super(props);
//         this.fullData = [];
//         this.state = {
//             DriverList: [],
//             isLoading: false,
//         }
//     }
const DriverList=({navigation})=>{

    const [DriverList,setDriverlist]=React.useState([]);
    const [isLoading,setisLoading]=React.useState(false);
    // componentDidMount() {
    //     this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //         this.fetchDriverList();
    //       });
    // }
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          fetchDriverList()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    

    // componentWillUnmount() {
    //     this._unsubscribe();
    //   }

  const  fetchDriverList = async () => {
       const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl + "/GetDrivers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                "platform": "Android",
            },
            redirect: 'follow'

        }).then(response => response.text()).then(async responseText => {
            // this.setState({ isLoading: false });
            setisLoading(false)
            try {
                let respObject = JSON.parse(responseText);
                if (!respObject.Message) {
                    fullData = respObject;
                    console.log(respObject,"======data");
                    // this.setState({ DriverList: respObject });
                    setDriverlist(respObject)
                } else {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    Alert.alert("GNR Transport", respObject.Message);
                }

            } catch (error) {
                // this.setState({ isLoading: false });
                setisLoading(false)
                //console.log("1", error);
                alert("There is some problem. Please try again");
            }
        })
            .catch(error => {
                //console.log("2", error);
                // this.setState({ isLoading: false });
                setisLoading(false)
                alert("There is some problem. Please try againmkj");
            });
    }





 const   FlatListHeader = () => {
        return (
            <View
                style={{
                    height: 40,
                    width: "100%",
                    backgroundColor: "#dddddd",//"#b5f5bf",
                    flexDirection: 'row'
                }}>
                <Text style={{ fontSize: 13 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 1, color: "#000000" }}>Driver Code</Text>
                <Text style={{ fontSize: 13 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 2, color: "#000000" }}>Name</Text>
                <Text style={{ fontSize: 13 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>DL Number</Text>
            </View>
        );
    }
    // render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
                <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    <Header showBack={true} title={"Driver List"} rightIcon={logout}  />
                    <TouchableOpacity style={{ marginTop: 20, width: 150, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('AddDriver')}>
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>Add Driver</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: "row", borderWidth: 0.5, borderColor: "#333333", alignItems: 'center', marginTop: 20 }}>
                        <TextInput style={{ color: "#000", height: 40, padding: 10, flex: 1 }} placeholder="Search..." placeholderTextColor="#333333" onChangeText={(text) => filterLeder(text)}></TextInput>
                        <Image style={{ width: 25, height: 25, marginRight: 0, tintColor: "#000000", marginRight: 10 }} source={searchIcon}></Image>
                    </View> */}
                    <FlatList
                        data={DriverList}
                        ListHeaderComponent={FlatListHeader}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            // <TouchableOpacity onPress={() => { this.setState({ selectedLedger: item }); global.navigation.navigate('BookingDetail', { 'BookingDetail': item }) }}>
                                <View style={{ paddingTop: 10, paddingBottom: 10, width: '100%', backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA", flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 14 / fontFactor, flex: 1, color: "#000000" }}>{item.DriverCode}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 14 / fontFactor, flex: 1, color: "#000000" }}>{item.DriverName}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 14 / fontFactor, flex: 1, color: "#000000" }}>{item.DLNumber}</Text>
                                </View>
                            // </TouchableOpacity>
                        }
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isLoading}>
                        <View style={{ flex: 1, backgroundColor: "#ffffffee", alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#F60000" />
                            <Text style={{ fontSize: 20 / fontFactor, fontWeight: 'bold', color: "#434343", margin: 15 }}>Loading....</Text>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        )
    // }
}


export default DriverList;

// import React, { Component } from 'react'
// import { ActivityIndicator, FlatList, StyleSheet, TextInput, Image, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal, PixelRatio, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Header from './Header';
// import logout from '../assets/logout.png';
// import searchIcon from '../assets/search.png';
// import {baseUrl} from "../package.json";
// const fontFactor = PixelRatio.getFontScale();

// export default class DriverList extends Component {
//     constructor(props) {
//         super(props);
//         this.fullData = [];
//         this.state = {
//             DriverList: [],
//             isLoading: false,
//         }
//     }
//     componentDidMount() {
//         this._unsubscribe = this.props.navigation.addListener('focus', () => {
//             this.fetchDriverList();
//           });
//     }
    
//     componentWillUnmount() {
//         this._unsubscribe();
//       }
//     fetchDriverList = async () => {
//         global.token = await AsyncStorage.getItem('AUTH');
//         fetch(baseUrl + "/api/ApiDriver", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Auth": global.token,
//                 "platform": "Android",
//             },
//             redirect: 'follow'

//         }).then(response => response.text()).then(async responseText => {
//             this.setState({ isLoading: false });
//             try {
//                 let respObject = JSON.parse(responseText);
//                 if (!respObject.Message) {
//                     this.fullData = respObject;
//                     //console.log(respObject);
//                     this.setState({ DriverList: respObject });
//                 } else {
//                     this.setState({ isLoading: false });
//                     Alert.alert("GNR Transport", respObject.Message);
//                 }

//             } catch (error) {
//                 this.setState({ isLoading: false });
//                 //console.log("1", error);
//                 alert("There is some problem. Please try again");
//             }
//         })
//             .catch(error => {
//                 //console.log("2", error);
//                 this.setState({ isLoading: false });
//                 alert("There is some problem. Please try again");
//             });
//     }
//     FlatListHeader = () => {
//         return (
//             <View
//                 style={{
//                     height: 40,
//                     width: "100%",
//                     backgroundColor: "#dddddd",//"#b5f5bf",
//                     flexDirection: 'row'
//                 }}>
//                 <Text style={{ fontSize: 13 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 1, color: "#000000" }}>Driver Code</Text>
//                 <Text style={{ fontSize: 13 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 2, color: "#000000" }}>Name</Text>
//                 <Text style={{ fontSize: 13 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>DL Number</Text>
//             </View>
//         );
//     }
//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
//                 <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
//                     <Header showBack={true} title={"Driver List"} rightIcon={logout} openModeModel={this.openModeModel} />
//                     <TouchableOpacity style={{ marginTop: 20, width: 150, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() =>navigation.navigate('AddDriver')}>
//                         <Text style={{ color: "#ffffff", alignSelf: "center" }}>Add Driver</Text>
//                     </TouchableOpacity>
//                     <View style={{ flexDirection: "row", borderWidth: 0.5, borderColor: "#333333", alignItems: 'center', marginTop: 20 }}>
//                         <TextInput style={{ color: "#000", height: 40, padding: 10, flex: 1 }} placeholder="Search..." placeholderTextColor="#333333" onChangeText={(text) => this.filterLeder(text)}></TextInput>
//                         <Image style={{ width: 25, height: 25, marginRight: 0, tintColor: "#000000", marginRight: 10 }} source={searchIcon}></Image>
//                     </View>
//                     <FlatList
//                         data={this.state.DriverList}
//                         ListHeaderComponent={this.FlatListHeader}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item, index }) =>
//                             // <TouchableOpacity onPress={() => { this.setState({ selectedLedger: item }); global.navigation.navigate('BookingDetail', { 'BookingDetail': item }) }}>
//                                 <View style={{ paddingTop: 10, paddingBottom: 10, width: '100%', backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA", flexDirection: 'row', alignItems: 'center' }}>
//                                     <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 14 / fontFactor, flex: 1, color: "#000000" }}>{item.DriverCode}</Text>
//                                     <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 14 / fontFactor, flex: 1, color: "#000000" }}>{item.DriverName}</Text>
//                                     <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 14 / fontFactor, flex: 1, color: "#000000" }}>{item.DLNumber}</Text>
//                                 </View>
//                             // </TouchableOpacity>
//                         }
//                     />
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={this.state.isLoading}>
//                         <View style={{ flex: 1, backgroundColor: "#ffffffee", alignItems: 'center', justifyContent: 'center' }}>
//                             <ActivityIndicator size="large" color="#F60000" />
//                             <Text style={{ fontSize: 20 / fontFactor, fontWeight: 'bold', color: "#434343", margin: 15 }}>Loading....</Text>
//                         </View>
//                     </Modal>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

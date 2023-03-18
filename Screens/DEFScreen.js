import React, { Component,useEffect } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, TextInput, Image, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal, PixelRatio, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from '../assets/logout.png';
import searchIcon from '../assets/search.png';
import {baseUrl} from '../package.json';
const fontFactor = PixelRatio.getFontScale();


const DEFScreen=({navigation})=>{



    // let dateStr = "20230316";
    // let formattedDate = `${dateStr.slice(0, 4)}/${dateStr.slice(4, 6)}/${dateStr.slice(6)}`;
    //  console.log(formattedDate);
    const [DefList,setDefList]=React.useState([]);
    const [isLoading,setisLoading]=React.useState(false);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          fetchDefList()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    

    

  const  fetchDefList = async () => {
       const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl + "//api/ApiDefIssue", {
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
                    setDefList(respObject)
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
                {/* <Text style={{ fontSize: 13 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 1, color: "#000000" }}>Date</Text> */}
                <Text style={{ fontSize: 13 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 2, color: "#000000" }}>PumpName</Text>
                <Text style={{ fontSize: 13 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>Vehicle No</Text>
                <Text style={{ fontSize: 13 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>Quantity</Text>
            </View>
        );
    }
    // render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
                <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    <Header showBack={true} title={"DEF List"} rightIcon={logout}  />
                    <TouchableOpacity style={{ marginTop: 20, width: 150, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate("AddDEF")}>
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>Add DEF</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={DefList}
                        ListHeaderComponent={FlatListHeader}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            // <TouchableOpacity onPress={() => { navigation.navigate('DefDetails', { 'DefDetails': item.Id }) }}>
                                <View style={{ paddingTop: 10, paddingBottom: 10, width: '100%', backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA", flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 10 / fontFactor, flex: 1, color: "#000000" }}>{formattedDate}</Text> */}
                                    <Text style={{ marginLeft:10, alignSelf: "center", fontSize: 12 / fontFactor, flex: 1, color: "#000000" }}>{item.PumpName}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 12 / fontFactor, flex: 1, color: "#000000" }}>{item.VehicleNo}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 12 / fontFactor, flex: 1, color: "#000000" }}>{item.Quantity}</Text>
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


export default DEFScreen;


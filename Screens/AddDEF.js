import React, { Component,useEffect,useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from '../assets/logout.png';
import moment from 'moment';
import CalendarPopUp from './CalenderPopUp';
import {baseUrl} from "../package.json";
import ListModel from './ListModel';
const fontFactor = PixelRatio.getFontScale();


const AddDef=({navigation})=>{

    // console.log( moment(new Date()).format('YYYYMMDD'),"Date")
    const [isLoading,setisLoading]=useState(false)
    const [Date,setDate]=useState()
    const [quantity,setQuantity]=useState(false)
    const [isDisabled,setisDisabled]=useState(false)
    const [isOpenCalender,setisOpenCalender]=useState(false)
    const [selectedPumpId1,setselectedPumpId1]=React.useState('');
    const [PumpList1,setPumpList1]=React.useState([]);
    const [SelectedPumpNo1,setSelectedPumpNo1]=React.useState('');
    const [openPumpList1,setopenPumpList1]=React.useState(false);
    const [VehicleList,setVehicleList]=React.useState([]);
    const [openVehicleList,setopenVehicleList]=React.useState(false);
    const [SelectedVehicleNo,setSelectedVehicleNo]=React.useState();
    const [selectedVehicleId,setselectedVehicleId]=React.useState();
    const [LrNo,setLRNo]=React.useState();


    // console.log("Date")
    
  const  onDateChange = (date) => {
        setDate(moment(date).format('YYYYMMDD'))
        setisOpenCalender(false)
        setisLoading(false)
    }
 
    const    onVehicleSelection = (params) => {
        // this.setState({ selectedVehicleId: params.value, SelectedVehicleNo: params.label, openVehicleList: false });
        setselectedVehicleId(params.value)
        setSelectedVehicleNo(params.label)
        setopenVehicleList(false)
        // this.fetchSaleList(selectedVehicleId);
    }
    const   onVehicleSelectionCancel = () => {
        // this.setState({ openVehicleList: false });
        setopenVehicleList(false)
    }
    const   onPumpSelectionCancel1 = () => {
        // this.setState({ openPumpList1: false });
          setopenPumpList1(false)
    }
    const  onPumpSelection1 = (params) => {
        // this.setState({ selectedPumpId1: params.value, SelectedPumpNo1: params.label, openPumpList1: false });
        setselectedPumpId1(params.value)
        setSelectedPumpNo1(params.label)
        setopenPumpList1(false)
    }
    const  fetchPumpList = async () => {
        // this.setState({ isLoading: true })
        setisLoading(true)
      
      fetch(baseUrl+ "/api/ApiPump", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "platform": "Android",
            },
            redirect: 'follow'
        }).then(response => response.text()).then(async responseText => {
            setisLoading(false)
            try {
                let respObject = JSON.parse(responseText);
                if (respObject.Message) {
                    setisLoading(false)
                    alert(respObject.Message);
                    navigation.goBack();
                } else {
                    fullData = respObject;
                     List = [];
                     selectedType = '';
                    respObject.forEach(object => {
                        // console.log("object",object)
                        let dropdownObject = { label:object.PumpName, value:object.PumpId };
                        List.push(dropdownObject)
                    });
                    setPumpList1(List)
                }
            } catch (error) {
                setisLoading(false)
                console.log("1", error);
                alert("There is some problem. Please try again");
            }
        })
            .catch(error => {
                console.log("2", error);
                setisLoading(false)
                alert("There is some problem. Please try again");
            });
    }
    const  fetchVehicleList = async () => {
        // this.setState({ isLoading: true })
        setisLoading(true)
        // console.log(global.token);
        const  token = await AsyncStorage.getItem('AUTH');
        // console.log("token",token)
        fetch(baseUrl+ "/api/ApiVehicle", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                // "Mode": this.state.Mode,
                "platform": "Android",
                // "ToDate": this.state.toDate
            },
            redirect: 'follow'

        }).then(response => response.text()).then(async responseText => {

            // this.setState({ isLoading: false });
            setisLoading(false)
            try {
                let respObject = JSON.parse(responseText);
                if (respObject.Message) {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    alert(respObject.Message);
                    navigation.goBack();
                } else {
                    fullData = respObject;
                    var List = [];
                    let selectedType = '';
                    respObject.forEach(object => {
                        let dropdownObject = { label: object.VehicleNo, value: object.VehicleId };
                        List.push(dropdownObject)
                    });
                    // this.setState({ VehicleList: List });
                    setVehicleList(List)
                }
            } catch (error) {
                // this.setState({ isLoading: false });
                setisLoading(false)
                console.log("1", error);
                alert("There is some problem. Please try again");
            }
        })
            .catch(error => {
                console.log("2", error);
                // this.setState({ isLoading: false });
                setisLoading(false)
                alert("There is some problem. Please try again");
            });
    }

    useEffect(() => {
        const loadData=()=>{
            fetchVehicleList()
            fetchPumpList()
        }
        loadData()
        }, [])

   const SaveDEF = async() => {
       
        setisLoading(true)
        const token = await AsyncStorage.getItem('AUTH');
          let body = {
            Date: moment(Date).format('YYYYMMDD'),
            PumpId: selectedPumpId1,
            VehicleId: selectedVehicleId,
            EnteredById: 1,
            EntryDate: 20230202,
            EntryTime: 170948,
            LrNo:LrNo,
            Quantity: quantity,
            DateV: "0001-01-01T00:00:00",
            PumpName: null,
            VehicleNo: null
        }
        console.log(body,"body===","quan")
  await  fetch("http://gnr.marwariplus.com//api/ApiDefIssue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
            
            },
            body:JSON.stringify(body),
            redirect: 'follow'
        }).then(response => response.text())
            .then(responseText => {
                // this.setState({ isLoading: false });
                setisLoading(false)
                try {
                    var respObject = JSON.parse(responseText);
                    console.log(respObject.Message,"Message")
                    if (respObject.Message == "Saved Successfully.") {
                        Alert.alert(
                            'Marwari Software',
                            respObject.Message,
                            [
                              { text:  "Ok", onPress: () => navigation.goBack(null)},
                            ]);               
                        setisDisabled(true)
                    }
                  else{
                    alert(respObject.Message);
                  }
                } catch (error) {
                    alert("1.There is some problem. Please try again");
                }
            })
            .catch(error => {
                // this.setState({ isLoading: false });
                setisLoading(false)
                alert("2.There is some problem. Please try again");
            });
    }
    // render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
              
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                        <Header showBack={true} title={"GNR"} rightIcon={logout} />
                        <Text style={{ color: "#b22222", alignSelf: "center", marginTop: 10, fontSize: 20, textDecorationLine: 'underline' }}>Fill DEF Details</Text>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Select Date</Text>
                            <TouchableOpacity onPress={() => setisOpenCalender(true)}>
                            <Text editable={false} style={[styles.TextInputStyle]} >{moment(Date).format('DD MMM YYYY')}</Text>
                            </TouchableOpacity>
                        </View>
                    
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Pump Name</Text>
                                <TouchableOpacity onPress={() => setopenPumpList1(true)}>
                                    <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedPumpNo1}</TextInput>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Vehicle No.</Text>
                            <TouchableOpacity onPress={() => setopenVehicleList(true)}>
                            <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedVehicleNo}</TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Quantity</Text>
                            <TextInput style={[styles.TextInputStyle]} keyboardType="numeric"   onChangeText={(num) => setQuantity(num)}/>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>LR No</Text>
                            <TextInput style={[styles.TextInputStyle]} keyboardType="numeric"   onChangeText={(num) => setLRNo(num)}/>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, marginStart: 10 }}>
                            <TouchableOpacity style={{ width: '90%', borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginStart: 15, alignSelf: 'center', justifyContent: 'center' }} disabled={isDisabled} onPress={() => SaveDEF()}>
                                <Text style={{ color: "#ffffff", alignSelf: "center" }}>Save DEF</Text>
                            </TouchableOpacity>
                        </View>
                        <CalendarPopUp isOpenToCalender={isOpenCalender} heading="Select Date" onToDateChange={onDateChange} selectedDate={Date} />
                        <ListModel PartyList={PumpList1} openPartyModel={openPumpList1} onPartySelection={ onPumpSelection1} onCancel={onPumpSelectionCancel1} heading={"Fuel Station List"} />
                        <ListModel PartyList={VehicleList} openPartyModel={openVehicleList} onPartySelection={onVehicleSelection} onCancel={onVehicleSelectionCancel} heading={"Vehicle List"} />
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
                </ScrollView>
            </SafeAreaView>
        )
    }
// }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    lableStyle: {
        color: "#434343",
        marginLeft: 15,
        fontSize: 14 / fontFactor
    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 5,
        width: "80%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInputStyle: {
        fontSize: 14 / fontFactor,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        borderWidth: 1,
        height: 40,
        padding: 10,
        backgroundColor: "#fff",
        color: "#000000",
        borderColor: "#11245a",
        textAlignVertical: "center"
    },
    TextInput: {
        backgroundColor: "#fff",
        borderRadius: 10,
        height: 50,
        width: "100%",
        color: "#000"
    },
    StText: {
        fontSize: 20,
        fontWeight: "500",
        color: "coral",
    },
    buttonContainer: {
        margin: 20
    },
    btnText: {
        marginTop: 10,
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#009A22",
        backgroundColor: "#009A22",
        height: 30,
        marginBottom: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    images: {
        marginTop: 10,
        width: 200,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
      },
      camcontainer: {
       width:"100%",
       height:"100%"
    
      },
      fixedRatio: {
        flex: 1,
        // aspectRatio: 1,
      
      },
      button: {
        flex: 0.1,
        padding: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
capturebtn:{
    backgroundColor:"#009A22",
    height:50,
    alignItems:"center",
    textAlign:"center",
}     
});

export default AddDef;
import React, { Component } from 'react'
import { ActivityIndicator, Alert, BackHandler, FlatList, Picker, Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio, Platform } from 'react-native';
import Header from './Header';
import logout from '../assets/logout.png';
import receipt from '../assets/receipt.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import CalendarPopUp from './CalenderPopUp';
import {baseUrl} from "../package.json";
// import RNFetchBlob from 'rn-fetch-blob';// 'react-native-fetch-blob'
const fontFactor = PixelRatio.getFontScale();




// export default class HistoryList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             openModel: false,
//             SrName: '',
//             fromDate: moment(new Date()).format('YYYYMMDD'),
//             toDate: moment(new Date()).format('YYYYMMDD'),
//             isOpenCalender1: false,
//             isOpenCalender2: false,
//             isLoading: false,
//             PendingList: [],
//             selectedPump: '',
//             pump_id: '',
//             image:'',
//         }
//     }

const HistoryList=()=>{

const [openModel,setopenModel]=React.useState(false)
const [SrName,setSrName]=React.useState("")
const [fromDate,setfromDate]=React.useState(moment(new Date()).format('YYYYMMDD'))
const [toDate,settoDate]=React.useState(moment(new Date()).format('YYYYMMDD'))
const [isOpenCalender1,setisOpenCalender1]=React.useState(false)
const [isOpenCalender2,setisOpenCalender2]=React.useState(false)
const [isLoading,setisLoading]=React.useState(false)
const [PendingList,setPendingList]=React.useState([])
const [selectedPump,setselectedPump]=React.useState("")
const [pump_id,setpump_id]=React.useState("")
const [image,setimage]=React.useState("")




 const   onToDateChange = (date) => {
        // this.setState({
        //     toDate: moment(date).format('YYYYMMDD'),
        //     isOpenCalender2: false,
        //     isLoading: false
        // });
        settoDate( moment(date).format('YYYYMMDD'))
        setisOpenCalender2(false)
        setisLoading(false)
    }
 const   onFromDateChange = (date) => {
        // this.setState({
        //     fromDate: moment(date).format('YYYYMMDD'),
        //     isOpenCalender1: false,
        //     isLoading: false
        // });
        setfromDate(moment(date).format('YYYYMMDD'))
        setisOpenCalender1(false)
        setisLoading(false)
    }
    // async componentDidMount() {
    //     let nm = await AsyncStorage.getItem('SRNAME');
    //     let pump_id = await AsyncStorage.getItem('SID');
    //     this.setState({ pump_id: pump_id });
    //     this.setState({ SrName: nm });
    //     this.fetchBookingList(pump_id);
    // }

useEffect(async() => {
    let nm = await AsyncStorage.getItem('SRNAME');
        let pump_id = await AsyncStorage.getItem('SID');
        //  this.setState({ pump_id: pump_id });
        setpump_id(pump_id)
        //  this.setState({ SrName: nm });
        setSrName(nm)

        fetchBookingList(pump_id);
   
}, [])



 const   fetchBookingList = async (pid) => {
        console.log(global.url, global.token, pid);
        // this.setState({ isLoading: true })
        setisLoading(true)
        fetch(baseUrl + "/api/ApiPumpDetail/" + pid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Auth":token,
                "FromDate": fromDate,
                'ToDate': toDate,
                'Pending': 0,
                "platform": Platform.OS,
            },
            redirect: 'follow'

        }).then(response => response.text()).then(async responseText => {
            // this.setState({ isLoading: false });
            setisLoading(false)
            try {
                let respObject = JSON.parse(responseText);
                if (!respObject.Message) {
                    fullData = respObject;
                    console.log(respObject);
                    // this.setState({ PendingList: respObject });
                    setPendingList(respObject)
                } else {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    alert(respObject.Message);
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
    FlatListHeader = () => {
        return (
            <View
                style={{
                    height: 40,
                    width: "100%",
                    backgroundColor: "#dddddd",//"#b5f5bf",
                    flexDirection: 'row'
                }}>
                <Text style={{ fontSize: 12 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 1, color: "#000000" }}>Date</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 2, color: "#000000" }}>Vehicle Number</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 2, color: "#000000" }}>LR Number</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>Diesel</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>Advance</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>DEF</Text>
            </View>
        );
    }
    // getDetail(itemId) {
    //     global.navigation.navigate('ShowSlip',{ItemId:itemId});
        
    // }
    // SearchHistory(){
    //     this.fetchBookingList(this.state.pump_id);
    // }
    // render() {
        // in line 155  openModeModel={this.openModeModel}
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    
                        <Header showBack={true} title={"History List"} rightIcon={logout} />
                        {/* <Text style={[styles.HeadText, { fontSize: 20 / fontFactor, fontWeight: 'bold', color: '#000000', marginTop: 20, marginStart: 20 }]}></Text> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 2, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>From Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender1(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(fromDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 2, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>To Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender2(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(toDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={{ marginTop: 20, width: 50, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() =>SearchHistory() }>
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Go</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CalendarPopUp isOpenToCalender={isOpenCalender1} heading="Select Date" onToDateChange={onFromDateChange} selectedDate={fromDate} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender2} heading="Select Date" onToDateChange={onToDateChange} selectedDate={toDate} />
                        <FlatList
                            data={PendingList}
                            ListHeaderComponent={FlatListHeader}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                
                                    <View style={{ paddingTop: 10, paddingBottom: 10, width: '100%', backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA", flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
                                        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.VehicleNo}</Text>
                                        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.GRNumber}</Text>
                                        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.Diesel}</Text>
                                        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.Advance}</Text>
                                        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.Def}</Text>
                                        <TouchableOpacity onPress={() => {getDetail(item.Id.toString()); }}>
                                        <Image style={{ width: 25, height: 25, marginRight: 0, marginRight: 10 }} source={receipt}></Image>
                                        </TouchableOpacity>
                                    </View>
                                }
                        />


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isLoading}>
                            <View style={{ flex: 1, backgroundColor: "#ffffffee", alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="green" />
                                <Text style={{ fontSize: 20 / fontFactor, fontWeight: 'bold', color: "#434343", margin: 15 }}>Loading....</Text>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    export default HistoryList

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
    TextStyle: {
        fontSize: 13 / fontFactor,
        //fontWeight: 'bold',
        color: '#000000',
        marginLeft: 10,
        marginTop: 5
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
    HeadText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    images: {
        marginTop: 10,
        width: 200,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
});

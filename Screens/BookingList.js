import React,{useEffect} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio } from 'react-native';
import Header from './Header';
import logout from '../assets/logout.png';
import searchIcon from '../assets/search.png';
import moment from 'moment';
import ListModel from './ListModel';
import CalendarPopUp from './CalenderPopUp';
import filter from 'lodash.filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from "../package.json";


const fontFactor = PixelRatio.getFontScale();

const BookingList=({route,navigation})=>{


// export default class BookingList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.fullData = [];
//         this.state = {
//             isOpenCalender: false,
//             isLoading: false,
//             toDate: moment(new Date()).format('YYYYMMDD'),
//             SelectedVehicleNo: this.props.route.params.VehicleNo,
//             SelectedVehicleId: this.props.route.params.VehicleId,
//             openVehicleList: false,
//             BookingList: [], 
//         }
//     }


const [isOpenCalender,setisOpenCalender]=React.useState(false);
const [isLoading,setisLoading]=React.useState(false);
const [toDate,settoDate]=React.useState('YYYYMMDD');
const [SelectedVehicleNo,setSelectedVehicleNo]=React.useState(route.params.VehicleNo);
const [selectedVehicleId,setselectedVehicleId]=React.useState(route.params.VehicleId);
const [openVehicleList,setopenVehicleList]=React.useState(false);

const [BookingList,setBookingList]=React.useState([]);



    // componentDidMount() {
    //     // console.log(this.props.route.params.VehicleNo)
    //     this.fetchBookingList(this.props.route.params.VehicleNo);
    //     console.log("Params=",this.props.route.params);
    // }
   const fetchBookingList = async (vno) => {
        // console.log(global.url + "/api/ApiSearchVehicle");
        // this.setState({ isLoading: true })
        // console.log("VehicleNo",vno)
        setisLoading(true)
        // console.log(token)
      const  token = await AsyncStorage.getItem('AUTH');
        // console.log(token);
        // console.log(global.token);
        // fetch(global.url + "/api/ApiBooking", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Auth": global.token,
        //         "platform": "Android",
        //     },
        //     redirect: 'follow'
        fetch(baseUrl + "/api/ApiSearchVehicle", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                "VehicleNo": vno,
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
                    //  console.log("BookingList",respObject);
                    // this.setState({ BookingList: respObject });
                    setBookingList(respObject)
                    // console.log(BookingList)
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

// console.log(BookingList)

    useEffect(() => {
        fetchBookingList(route.params.VehicleNo)
    }, [])
    
    
    
 const   contains = ({ ItemName }, query) => {
        // console.log({ ItemName })
        if (ItemName && ItemName.toLowerCase().includes(query)) {
            return true
        }
        return false
    }

  const  filterLeder = (text) => {
        const formattedQuery = text.toLowerCase()
        const data = filter(this.fullData, Ledger => {
            return contains(Ledger, formattedQuery);
        })
        // this.setState({ BookingList: data });
        setBookingList(data)
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
                <Text style={{ fontSize: 12 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 1, color: "#000000" }}>Date</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginLeft: 10, alignSelf: "center", flex: 2, color: "#000000" }}>GR Number</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>Item</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>From</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>To</Text>
                <Text style={{ fontSize: 12 / fontFactor, marginEnd: 10, alignSelf: "center", flex: 2, textAlign: 'center', color: "#000000" }}>Veicle No</Text>
            </View>
        );
    }



    // render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
                <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    <Header showBack={true} title={"Booking List"} rightIcon={logout}  />
              <View style={{flexDirection:"row"}}>
                     <TouchableOpacity style={{marginLeft:35, margin: 20, width: 100, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('Booking',{Vno:route.params.VehicleNo, Vid:route.params.VehicleId})}>
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>Add Booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 20, width: 100, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('OtherExpence',{Vno:route.params.VehicleNo, Vid:route.params.VehicleId})}>
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>Other Expence</Text>
                    </TouchableOpacity>
               </View>
                   
                    <View style={{ flexDirection: "row", borderWidth: 0.5, borderColor: "#333333", alignItems: 'center', marginTop: 20 }}>
                        <TextInput style={{ color: "#000", height: 40, padding: 10, flex: 1 }} placeholder="Search..." placeholderTextColor="#333333" onChangeText={(text) =>filterLeder(text)}></TextInput>
                        <Image style={{ width: 25, height: 25, marginRight: 0, tintColor: "#000000", marginRight: 10 }} source={searchIcon}></Image>
                    </View>
                    <FlatList
                        data={BookingList}
                        ListHeaderComponent={FlatListHeader}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
    
    
                <TouchableOpacity onPress={() => { navigation.navigate('BookingDetail', { 'BookingDetail': item }) }}>
                                <View style={{ paddingTop: 10, paddingBottom: 10, width: '100%', backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA", flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{moment(item.Date.toString()).format('DD MMM YYYY')}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.GRNumber}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.ItemName}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.FromStationName}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.ToStationName}</Text>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11 / fontFactor, flex: 1, color: "#000000" }}>{item.VehicleNo}</Text>
                                    {/* <Text style={{  marginLeft: 15, alignSelf: "center", fontSize: 11/fontFactor, textAlign:'right',color:"#000000",marginEnd:10,color:item.Amount>0?"#8B0000":"#228B22"}}>{item.Amount>0?'₹'+this.format(item.Amount)+' Dr':'₹'+(this.format(item.Amount*-1)+' Cr')}</Text> */}
                                </View>
                </TouchableOpacity>}
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
    }

    export default BookingList;
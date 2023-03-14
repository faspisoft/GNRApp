import React,{useEffect} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio } from 'react-native';
import Header from './Header';
import logout from '../assets/logout.png';
import searchIcon from '../assets/search.png';
import moment from 'moment';
import ListModel from './ListModel';
// import CalendarPopUp from './CalenderPopUp';
import filter from 'lodash.filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from "../package.json";


const SearchVehicle=({navigation,route})=>{
 
const [isOpenCalender,setisOpenCalender]=React.useState(false);
const [isLoading,setisLoading]=React.useState(false);
const [SelectedVehicleNo,setSelectedVehicleNo]=React.useState('');
const [openVehicleList,setopenVehicleList]=React.useState(false);
const [VehicleList,setVehicleList]=React.useState([]);
const [selectedVehicleId,setselectedVehicleId]=React.useState('');

// console.log("baseUrl",baseUrl)
    const  onVehicleSelection = (params) => {
        // this.setState({ selectedVehicleId: params.value, SelectedVehicleNo: params.label, openVehicleList: false });
        // this.fetchSaleList(selectedVehicleId);
        // console.log(params.value)
        setselectedVehicleId(params.value)
        setSelectedVehicleNo(params.label)
        setopenVehicleList(false)
    }
  const  onVehicleSelectionCancel = () => {
        // this.setState({ openVehicleList: false });
        setopenVehicleList(false)
    }
 

// useEffect(()=>{

    const  fetchVehicleList = async () => {
          // this.setState({ isLoading: true })
          setisLoading(false)
          
          var token = await AsyncStorage.getItem('AUTH');
         fetch(baseUrl+"/api/ApiVehicle", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Auth": token,
                  // "Mode": Mode,
                  "platform": "Android",
                  // "ToDate": toDate
              },
              redirect: 'follow'
    
          }).then(response => response.text()).then(async responseText => {
          //  console.log("response",responseText)
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
                    //  console.log(respObject)
                      let List = [];
                    //   console.log("resobj",respObject)
                      respObject.forEach(object => {
                          let dropdownObject =  {label:object.VehicleNo, value:object.VehicleId };
                          List.push(dropdownObject)
                             
                          // console.log("label",dropdownObject.label)
                          // console.log("Vehiclelist",List)
                          // console.log(dropdownObject.value)
                      });
         
                          setVehicleList(List)
                        //   console.log("vehicle",VehicleList)
                        //   console.log("List",List)
                      // this.setState({ VehicleList: List });
                    //   console.log("Vehicle List",VehicleList)
                    //console.log(this.state.VehicleList);
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
      };
     
      useEffect(()=>{
        fetchVehicleList()
      },[])
   
// },[])

    // componentDidMount() {
    //     this.fetchVehicleList();
    //


// useEffect(()=>{
//      fetchVehicleList()
// },[])

  const  _Search = async () => {
    
        navigation.navigate('BookingList',{VehicleNo:SelectedVehicleNo,VehicleId:selectedVehicleId});
    }
        // alert(this.state.VehicleNo)
        // this.setState({ isLoading: true })
        // global.token = await AsyncStorage.getItem('AUTH');
        // fetch(global.url + "/api/ApiSearchVehicle", {e
        //     method: "GET",

        //     headers: {
        //         "Content-Type": "application/json",
        //         "Auth": global.token,
        //         "VehicleNo": this.state.VehicleNo,
        //         "platform": "Android",
        //     },
        //     redirect: 'follow'

        // }).then(response => response.text()).then(async responseText => {
        //     this.setState({ isLoading: false });
        //     try {
        //         let respObject = JSON.parse(responseText);
        //         if (!respObject.Message) {
        //             this.fullData = respObject;
        //             console.log(respObject);
        //             this.setState({ BookingList: respObject });
        //         } else {
        //             this.setState({ isLoading: false });
        //             alert(respObject.Message);
        //         }

        //     } catch (error) {
        //         this.setState({ isLoading: false });
        //         console.log("1", error);
        //         alert("There is some problem. Please try again");
        //     }
        // })
        //     .catch(error => {
        //         console.log("2", error);
        //         this.setState({ isLoading: false });
        //         alert("There is some problem. Please try again");
        //     });
    // console.log("SearchVehicle",VehicleList)
    // render() {
        // console.log(VehicleList)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
                <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    <Header showBack={true} title={"GNR"} rightIcon={logout}  />
                    <Text style={{ color: "#b22222", alignSelf: "center", marginTop: 30, fontSize: 20, textDecorationLine:'underline' }}>Search Vehicle For Booking</Text>
                    {/* <View style={{ marginLeft: 10, marginTop: 35 }}>
                        <Text style={{ marginLeft: 15 }}>Enter Vehicle No</Text>
                        <TextInput style={[styles.TextInputStyle]} placeholderTextColor="#ccc" placeholder="Vehicle No" onChangeText={(old) => { this.setState({ VehicleNo: old }); }} />
                    </View> */}
                    <View style={{marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Enter Vehicle No.</Text>
                            <TouchableOpacity onPress={() => setopenVehicleList(true)}>
                                <TextInput style={[styles.TextInputStyle]} placeholderTextColor="#ccc" placeholder="Vehicle No" editable={false}>{SelectedVehicleNo}</TextInput>
                            </TouchableOpacity>
                        </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, marginStart: 10 }}>
                        <TouchableOpacity style={{ width: '90%', borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginStart: 15, alignSelf: 'center', justifyContent: 'center' }} onPress={() =>_Search()}>
                            <Text style={{ color: "#ffffff", alignSelf: "center" }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity style={{ marginTop: 190, width: 150, borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginBottom: 5, alignSelf: 'center', justifyContent: 'center' }} onPress={() => global.navigation.navigate('Booking')}>
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>Skip</Text>
                    </TouchableOpacity> */}
                    <ListModel PartyList={VehicleList} openPartyModel={openVehicleList} onPartySelection={onVehicleSelection} onCancel={onVehicleSelectionCancel} heading={"Vehicle List"} />
                    {/* <FlatList
                    data={[{key:VehicleList.value}]}
                    renderItem={({VehicleList}) => <Text style={{ item: {
                        padding: 10,
                        fontSize: 18,
                        height: 44,
                      },}}>{VehicleList}</Text>}
                    
                    /> */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isLoading}>
                        <View style={{ flex: 1, backgroundColor: "#ffffffee", alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#F60000" />
                            <Text style={{ fontSize: 20 , fontWeight: 'bold', color: "#434343", margin: 15 }}>Loading....</Text>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        )
                }
    // }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    dropdown: {
        height: 40,
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 5,
        backgroundColor: 'white',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: "#000",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#000",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#000",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: 'white',
        color: "#000",
    },
    lableStyle: {
        color: "#434343",
        marginLeft: 15,
        fontSize: 14 
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
        fontSize: 14 ,
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
});

export default SearchVehicle;
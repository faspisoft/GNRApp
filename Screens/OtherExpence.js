import React,{useEffect,useRef} from 'react';
import { Alert, ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio ,Button} from 'react-native';
import Header from './Header';
import logout from '../assets/logout.png';
// import searchIcon from '../assets/search.png';
import moment from 'moment';
import ListModel from './ListModel';
import CalendarPopUp from './CalenderPopUp';
// import filter from 'lodash.filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import VersionInfo from 'react-native-version-info';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { version } from '../package.json';
import {baseUrl} from '../package.json';
import {manipulateAsync,FlipType,SaveFormat} from "expo-image-manipulator";
// const [hasCameraPermission,setHasCameraPermission]=React.useState();
// import { Button } from 'react-native-share';
// import RNFetchBlob from "rn-fetch-blob";
// import { AppRegistry, Platform } from 'react-native';
const fontFactor = PixelRatio.getFontScale();


const Booking=({navigation,route})=>{

  
const [isDisabled,setIsdisabled]=React.useState(false);
const [isOpenCalender,setIsOpencalender]=React.useState(false);
const [isOpenCalender1,setIsOpenCalender1]=React.useState(false);
const [isOpenCalender2,setIsOpenCalender2]=React.useState(false);
const [toDate,settoDate]=React.useState( moment(new Date()).format('YYYYMMDD'));
const [Date1,setDate1]= React.useState(moment(new Date()).format('YYYYMMDD'));
const [Date2,setDate2]=React.useState(moment(new Date()).format('YYYYMMDD'));
const [SelectedVehicleNo,setSelectedVehicleNo]=React.useState(route.params.Vno);//route.params.Vno
const [openVehicleList,setopenVehicleList]=React.useState(false);
const [VehicleList,setVehicleList]=React.useState([]);
const [selectedVehicleId,setselectedVehicleId]=React.useState(route.params.Vid);//route.params.Vid
///////////////////////////////////////////////////////////////
const [SelectedPumpNo1,setSelectedPumpNo1]=React.useState('');
const [openPumpList1,setopenPumpList1]=React.useState(false);
const [PumpList1,setPumpList1]=React.useState([]);
const [selectedPumpId1,setselectedPumpId1]=React.useState('');
//////////////////////////////////////////////////////
const[selectedPumpId2,setselectedPumpId2]=React.useState('');
const [SelectedPumpNo2,setSelectedPumpNo2]=React.useState('');
const [openPumpList2,setopenPumpList2]=React.useState(false);
const [PumpList2,setPumpList2]=React.useState([]);
////////////////////////////////////////////////////
const [selectedItemId,setselectedItemId]=React.useState(6)
const [SelectedItemNo,setSelectedItemNo]=React.useState("Empty");
const [openItemList,setopenItemList]=React.useState(false)
const [ItemList,setItemList]=React.useState([])
//////////////////////////////////////////////////////
const [selectedFromId,setselectedFromId]=React.useState(365)
const [SelectedFromNo,setSelectedFromNo]=React.useState('other expenses ')
const [openFromList,setopenFromList]=React.useState(false)
const [FromList,setFromList]=React.useState([])
////////////////////////////////////////////
const [selectedToId,setselectedToId]=React.useState(365)
const [SelectedToNo,setSelectedToNo]=React.useState('other expenses ')
const [openToList,setopenToList]=React.useState(false)
const [ToList,setToList]=React.useState([])
const [GRNo,setGrNo]=React.useState("0")
const [LDWT,setLDWT]=React.useState("0")
const [Fuel1,setFuel1]=React.useState('')
const [Advance1,setAdvance1]=React.useState('')
const [Fuel2,setFuel2]=React.useState('')
const [Advance2,setAdvance2]=React.useState('')

const [DEF1,setDEF1]=React.useState('')
const [DEF2,setDEF2]=React.useState('')
const [Remark,setRemark]=React.useState('')
const [isLoading,setisLoading]=React.useState(false)
const [Mode,setMode]=React.useState(Mode)
const [LedgerList,setLedgerList]=React.useState([])
const [selectedLedger,setselectedLedger]=React.useState('')
const [openModel,setopenModel]=React.useState(false)
const [ewaybill,setewaybill]=React.useState('')
const [emawayValid,setemawayValid]=React.useState(moment(new Date()).format('YYYYMMDD'))


const [DriverId,setDriverId]=React.useState('')
const [isFocus,setisFocus]=React.useState(false)
const [DriverList,setDriverList]=React.useState([])
const [filePath,setfilePath]=React.useState('')
const [filePath2,setfilePath2]=React.useState('')
const [fileData,setfileData]=React.useState(null)
const [fileData2,setfileData2]=React.useState(null)
const [fileUri,setfileUri]=React.useState('')
const [fileUri2,setfileUri2]=React.useState('')
const [FirmList,setFirmList]=React.useState([])
const [FirmId,setFirmId]=React.useState(5)
const [imageUri,setImageUri]=React.useState(null);
const [imageUri2,setImageUri2]=React.useState(null);
const [cameraPermission1, setCameraPermission1] = React.useState(null);
const [cameraPermission2, setCameraPermission2] = React.useState(null);
// const [galleryPermission, setGalleryPermission] = React.useState(null);
const [camera, setCamera] = React.useState(null);
// const [baseUrl,setBaseUrl]=React.useState("http://192.168.1.181")
// const [baseUrl,setBaseUrl]=React.useState("http://GNR.marwariplus.com")

const [type, setType] = React.useState(Camera.Constants.Type.back);
// console.log(LDWT)
// console.log(`camerb1 ${cameraPermission} camb2 ${cameraPermission1}`)


// console.log(`${fileData2} PhotoInvoice`)



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
    const  onPumpSelection1 = (params) => {
        // this.setState({ selectedPumpId1: params.value, SelectedPumpNo1: params.label, openPumpList1: false });
        setselectedPumpId1(params.value)
        setSelectedPumpNo1(params.label)
        setopenPumpList1(false)
    }
    const   onPumpSelectionCancel1 = () => {
        // this.setState({ openPumpList1: false });
          setopenPumpList1(false)
    }
    const   onPumpSelection2 = (params) => {
        setselectedPumpId2(params.value)
        setSelectedPumpNo2(params.label)
        setopenPumpList2(false)
        // this.setState({ selectedPumpId2: params.value, SelectedPumpNo2: params.label, openPumpList2: false });
    }
    const  onPumpSelectionCancel2 = () => {
        setopenPumpList2(false)
        // this.setState({ openPumpList2: false });
    }
    const onItemSelection = (params) => {
        setselectedItemId(params.value)
        setSelectedItemNo(params.label)
        setopenItemList(false)
        // this.setState({ selectedItemId: params.value, SelectedItemNo: params.label, openItemList: false });
        // this.getDiesalAdvance();
    }
    const  onItemSelectionCancel = () => {
        setopenItemList(false)
        // this.setState({ openItemList: false });
    }
    const  onFromSelection = (params) => {
        setselectedFromId(params.value)
        setSelectedFromNo(params.label)
        setopenFromList(false)
        // this.setState({ selectedFromId: params.value, SelectedFromNo: params.label, openFromList: false });
        // this.getDiesalAdvance();
    }
    const  onFromSelectionCancel = () => {
        setopenFromList(false)
        // this.setState({ openFromList: false });
    }
    const onToSelection = (params) => {
        setselectedToId(params.value)
        setSelectedToNo(params.label)
        setopenToList(false)
        // this.setState({ selectedToId: params.value, SelectedToNo: params.label, openToList: false });
        // this.getDiesalAdvance();
    }
    const   onToSelectionCancel = () => {
        setopenToList(false)
        // this.setState({ openToList: false });
    }
    const   openModeModel = () => {
        // this.setState({
        //     openModel: true
        // })
        setopenModel(true)
    }
    const   onToDateChange = (date) => {
        // this.setState({
        //     toDate: moment(date).format('YYYYMMDD'),
        //     isOpenCalender: false,
        //     isLoading: false
        // });
        settoDate(moment(date).format('YYYYMMDD'))
        setIsOpencalender(false)
        setisLoading(false)
    }
    const  onDate1Change = (date) => {
        // this.setState({
        //     Date1: moment(date).format('YYYYMMDD'),
        //     isOpenCalender1: false,
        //     isLoading: false
        // });
        setDate1(moment(date).format('YYYYMMDD'))
        setIsOpenCalender1(false)
        setisLoading(false)
    }
    const  onDate2Change = (date) => {
        // this.setState({
        //     Date2: moment(date).format('YYYYMMDD'),
        //     isOpenCalender2: false,
        //     isLoading: false
        // });
        setDate2(moment(date).format('YYYYMMDD'))
        setIsOpenCalender2(false)
        setisLoading(false)
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
                alert("There is some problem. Please try again ");
            }
        })
            .catch(error => {
                console.log("2", error);
                // this.setState({ isLoading: false });
                setisLoading(false)
                alert("There is some problem. Please try again");
            });
    }

    const  fetchPumpList = async () => {
        // this.setState({ isLoading: true })
        setisLoading(true)
        // console.log(global.token);
        // const token = await AsyncStorage.getItem('AUTH');
      fetch(baseUrl+ "/api/ApiPump", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Auth": token,
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
                     List = [];
                     selectedType = '';
                    respObject.forEach(object => {
                        // console.log("object",object)
                        let dropdownObject = { label:object.PumpName, value:object.PumpId };
                        List.push(dropdownObject)
                    });
                    setPumpList1(List)
                    setPumpList2(List)
                    // this.setState({ PumpList1: List });
                    // this.setState({ PumpList2: List });
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

    const  fetchItemList = async () => {
        // this.setState({ isLoading: true })
        setisLoading(true)
        // console.log(global.token);
       const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl+ "/api/ApiItem", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Auth": global.token,
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
                    let List = [];
                    let selectedType = '';
                    respObject.forEach(object => {
                        let dropdownObject = { label: object.Name, value: object.ItemId };
                        List.push(dropdownObject)
                    });
                    // this.setState({ ItemList: List });
                    setItemList(List)
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
    const  fetchFromList = async () => {
        // this.setState({ isLoading: true })
        setisLoading(true)
        // console.log(global.token);
       const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl+ "/api/BookingStation", {
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
                if (respObject.Message) {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    alert(respObject.Message);
                    navigation.goBack(nu);
                } else {
                    fullData = respObject;
                    let List = [];
                    let selectedType = '';
                    respObject.forEach(object => {
                        let dropdownObject = { label: object.Name, value: object.StationId };
                        List.push(dropdownObject)
                    });
                    // this.setState({ FromList: List });
                    setFromList(List)
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

    // console.log(ToList)
    // console.log(FromList)
    const   fetchToList = async () => {
        // this.setState({ isLoading: true })
        setisLoading(true)
        // console.log(global.token);
        const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl+ "" + "/api/ApiStation", {
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
                if (respObject.Message) {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    // alert(respObject.Message);
                    navigation.goBack(null);
                } else {
                    fullData = respObject;
                    let List = [];
                    let selectedType = '';
                    respObject.forEach(object => {
                        let dropdownObject = { label: object.Name, value: object.StationId };
                        List.push(dropdownObject)
                    });
                    // this.setState({ FromList: List });
                    // this.setState({ ToList: List });
                    // setFromList(List)
                    setToList(List)
                   
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

    // const  getData = async () => {
    //     // this.state.selectedFromId = await AsyncStorage.getItem('SID');
    //     // this.state.SelectedFromNo = await AsyncStorage.getItem('SNAME');
    //     //console.log(this.props.route.params);
    // }
    const fetchDriverList = async () => {
        const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl+ "" + "/Drivers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                "platform": "Android",
            },
            redirect: 'follow'

        }).then(response => response.text()).then(async responseText => {
            try {
                let respObject = JSON.parse(responseText);
                if (respObject.Message) {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    alert(respObject.Message);
                    navigation.goBack(null);
                } else {
                   fullData = respObject;
                    let List = [];
                    let selectedType = '';
                    respObject.forEach(object => {
                        let dropdownObject = { label: object.DriverName, value: object.DriverId };
                        List.push(dropdownObject)
                    });
                    // this.setState({ DriverList: List });
                    setDriverList(List)
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

    const fetchFirmList = async () => {
       const token = await AsyncStorage.getItem('AUTH');
        fetch(baseUrl+ "/api/apitransport", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                "platform": "Android",
            },
            redirect: 'follow'
        }).then(response => response.text()).then(async responseText => {
            try {
                let respObject = JSON.parse(responseText);
                if (respObject.Message) {
                    // this.setState({ isLoading: false });
                setisLoading(false)
                    alert(respObject.Message);
                     navigation.goBack(null);
                } else {
                    fullData = respObject;
                    let List = [];
                    let selectedType = '';
                    respObject.forEach(object => {
                        let dropdownObject = { label: object.Name, value: object.Id };
                        List.push(dropdownObject)
                    });
                    // this.setState({ FirmList: List });
                    setFirmList(List)
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


//     const getDiesalAdvance =  async ()=> {
//         const token = await AsyncStorage.getItem('AUTH');
//     if(LDWT.trim()!=='' &&  selectedFromId!=='' &&  selectedToId!=='' &&  selectedItemId!==''){        
//         fetch(baseUrl+ "" + "/api/ApiDieselAdvance", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Auth": token,
//                 "VehicleId":selectedVehicleId,
//                 "LoadingWeight": parseFloat(LDWT.trim()).toFixed(2),
//                 "FromStationId": selectedFromId,
//                 "ToStationId": selectedToId,
//                 "ItemId": selectedItemId,
//                 "platform": "Android",
//             },
//             redirect: 'follow'
    
//         })
//             .then(response => response.text())
//             .then(responseText => {
//                 // setState({ isLoading: false });
//                 setisLoading(false)
//                 try {
//                     console.log(responseText);
//                     var respObject = JSON.parse(responseText);
//                     setFuel1(parseFloat(respObject.AllowedDiesel))
//                     setAdvance1(parseFloat(respObject.AllowedAdvance))
//                     // this.setState({Fuel1: parseFloat(respObject.AllowedDiesel)});
//                     // this.setState({Advance1:parseFloat(respObject.AllowedAdvance)});
    
//                 } catch (error) {
//                     alert("Error in Fetching Diesal Advance 1");
//                 }
//             })
//             .catch(error => {
//                 alert("Error in Fetching Diesal Advance 2");
//             });
//     }
// }

    // componentDidMount() {
    //     console.log("Version===", VersionInfo.appVersion);
    //     //this.getData();
    //     this.fetchVehicleList();
    //     this.fetchPumpList();
    //     this.fetchItemList();
    //     this.fetchFromList();
    //     this.fetchToList();
    //     this.fetchDriverList();
    //    this.fetchFirmList();
    // }
 
    useEffect(() => {
        const loadData=()=>{
            fetchVehicleList()
            fetchPumpList()
            fetchItemList()
            fetchFromList()
            fetchToList()
            fetchDriverList()
            fetchFirmList()
        }
        loadData()
        }, [])

     
    
    const  SaveBooking =async () => {
        // console.log(fileData);
        if (selectedFromId === '') {
            Alert.alert("Marwari Software", "Please Select From Station");
        } else if (selectedToId === '') {
            Alert.alert("Marwari Software", "Please Select To Station");
        } else if (selectedItemId === '') {
            Alert.alert("Marwari Software", "Please Select Item");
        } else {
            // this.setState({ isDisabled: true });
            setIsdisabled(true)
            setisLoading(true)
            // this.setState({ isLoading: true });
            let body = {
                Advance: Advance1,
                Advance2: Advance2.trim(),
                Date: moment(toDate).format('YYYYMMDD'),
                Diesel: parseFloat(Fuel1).toFixed(2),
                Diesel2: parseFloat(Fuel2.trim()).toFixed(2),
                GRNumber: GRNo.trim(),
                PumpId: selectedPumpId1,
                PumpId2: selectedPumpId2,
                VehicleID: selectedVehicleId,
                LoadingWeight: parseFloat(LDWT.trim()).toFixed(2),
                FromStationId: selectedFromId,
                ToStationId: selectedToId,
                ItemId: selectedItemId,
                Remark: Remark,
                Def: DEF1,
                Def2: DEF2,
                EntryDate1: Date1,
                EntryDate2: Date2,
                DriverId: DriverId,
                TransportId:FirmId,
                ewaybill: ewaybill,
                ewayValid: (ewaybill === '' ? 0 : moment(emawayValid).format('YYYYMMDD')),
                AppVersion: version,
            }
            console.log("Body",body)
         
            const token = await AsyncStorage.getItem('AUTH');
            fetch( baseUrl + "/api/ApiBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth":token,
                    // "Mode": this.state.Mode,
                    "platform": "Android",
                },
                body: JSON.stringify(body),
                redirect: 'follow'
            })
                .then(response => response.text())
                .then(responseText => {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    try {
                        console.log(responseText);
                        var respObject = JSON.parse(responseText);
                        console.log(respObject)
                        if (respObject.Message == "Saved Successfully.") {
                            alert(respObject.Message);
                            navigation.goBack(null);
                            // this.setState({ isLoading: false });
                            setisLoading(false)
                            navigation.navigate('SearchVehicle', { Vid: route.params.Vid, Vno: route.params.Vno });
                        } else {
                            alert(respObject.Message);
                            // console.log("ResponseObject",respObject.Message)
                            // this.setState({ isDisabled: false });
                            setIsdisabled(false)
                        }

                    } catch (error) {
                        alert("There is some problem. Please try again");
                        // this.setState({ isDisabled: false });
                        setIsdisabled(false)
                    }
                })
                .catch(error => {
                    // this.setState({ isLoading: false });
                    setisLoading(false)
                    alert("There is some problem. Please try again");
                    // this.setState({ isDisabled: false });
                    setIsdisabled(false)
                });
        }
    }
    
    

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                   
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                        <Header showBack={true} title={"GNR"} rightIcon={logout} openModeModel={openModeModel} />
                        <Text style={{ color: "#b22222", alignSelf: "center", marginTop: 10, fontSize: 20, textDecorationLine: 'underline' }}>Other Expence</Text>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 5 }}>Firm Name</Text>
                            <Dropdown
                              disable={true}
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={FirmList}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                searchPlaceholder="Search..."
                                value={FirmId}
                                onFocus={() => setisFocus(true)}
                                onBlur={() => setisFocus(false)}
                            
                                onChange={item => {
                                    // this.setState({ FirmId: item.value });
                                    // this.setState({ isFocus: false })
                                    setFirmId(item.value)
                                    setisFocus(false)

                                }}
                            // renderLeftIcon={() => (
                            //     <AntDesign
                            //         style={styles.icon}
                            //         color={this.state.isFocus ? 'blue' : 'black'}
                            //         name="Safety"
                            //         size={20}
                            //     />
                            // )}
                            />
                        </View>
                      
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Booking Date</Text>
                            {/* <TouchableOpacity onPress={() => this.setState({ isOpenCalender: true })}> */}
                            <Text editable={false} style={[styles.TextInputStyle]} >{moment(toDate).format('DD MMM YYYY')}</Text>
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Vehicle No.</Text>
                            {/* <TouchableOpacity onPress={() => this.setState({ openVehicleList: true })}> */}
                            <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedVehicleNo}</TextInput>
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 5 }}>Driver Name</Text>
                            <Dropdown
                               disable={true}
                                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={DriverList}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                searchPlaceholder="Search..."
                                value={DriverId}
                                onFocus={() => setisFocus(true)}
                                onBlur={() => setisFocus(false)}
                                onChange={item => {
                                    // this.setState({ DriverId: item.value });
                                    // this.setState({ isFocus: false })
                                 setDriverId(item.value)
                                 setisFocus
                                }}
                            // renderLeftIcon={() => (
                            //     <AntDesign
                            //         style={styles.icon}
                            //         color={this.state.isFocus ? 'blue' : 'black'}
                            //         name="Safety"
                            //         size={20}
                            //     />
                            // )}
                            />
                        </View>
                   
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>G.R Number</Text>
                                {/* <TextInput keyboardType='numeric' style={[styles.TextInputStyle]} onChangeText={(grnos) => { this.setState({ GRNo: grnos }); }} /> */}
                                <TextInput keyboardType='numeric' style={[styles.TextInputStyle]} editable={false} selectTextOnFocus={false}>{GRNo}</TextInput>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Loading Weight</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" editable={false} selectTextOnFocus={false}>{LDWT}</TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>From Station</Text>
                                {/* <TouchableOpacity onPress={() => setopenFromList(true)} > */}
                                    <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedFromNo}</TextInput>
                                {/* </TouchableOpacity> */}
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>To Station</Text>
                                {/* <TouchableOpacity onPress={() => setopenToList(true)}> */}
                                    <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedToNo}</TextInput>
                                {/* </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Item</Text>
                            {/* <TouchableOpacity onPress={() => setopenItemList(true)}> */}
                            <Text style={[styles.TextInputStyle]}>{SelectedItemNo}</Text>
                             
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Fuel Station-1</Text>
                                <TouchableOpacity onPress={() => setopenPumpList1(true)}>
                                    <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedPumpNo1}</TextInput>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Fuel Station-2</Text>
                                <TouchableOpacity onPress={() => setopenPumpList2(true)}>
                                    <TextInput style={[styles.TextInputStyle]} editable={false}>{SelectedPumpNo2}</TextInput>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Fuel-1</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(fuel) =>setFuel1(fuel)}>{Fuel1}</TextInput>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Fuel-2</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(fuel) => setFuel2(fuel)} />
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Advance-1</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(adv) => setAdvance1(adv)} >{Advance1}</TextInput>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Advance-2</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(adv) => { setAdvance2(adv) }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>DEF-1</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(def) => setDEF1(def) } />
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>DEF-2</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(def) =>setDEF2(def)} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Date-1</Text>
                                <TouchableOpacity onPress={() => setIsOpenCalender1(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(Date1).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Text style={styles.lableStyle}>Date-2</Text>
                                <TouchableOpacity onPress={() => setIsOpenCalender2(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(Date2).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Remark (If Any)</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(rem) => setRemark(rem)} />
                        </View>
                       
                        <View style={{ flexDirection: 'row', marginTop: 20, marginStart: 10, marginBottom: 10 }}>
                            <TouchableOpacity style={{ width: '90%', borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginStart: 15, alignSelf: 'center', justifyContent: 'center' }} disabled={isDisabled} onPress={() =>SaveBooking()}>
                                <Text style={{ color: "#ffffff", alignSelf: "center" }}>     Save     </Text>
                            </TouchableOpacity>
                        </View>
                        <CalendarPopUp isOpenToCalender={isOpenCalender} heading="Select Date" onToDateChange={onToDateChange}  />           
                        <CalendarPopUp isOpenToCalender={isOpenCalender1} heading="Select Date" onToDateChange={onDate1Change} selectedDate={Date1} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender2} heading="Select Date" onToDateChange={onDate2Change} selectedDate={Date2} />
                        <ListModel PartyList={VehicleList} openPartyModel={openVehicleList} onPartySelection={onVehicleSelection} onCancel={onVehicleSelectionCancel} heading={"Vehicle List"} />
                        <ListModel PartyList={PumpList1} openPartyModel={openPumpList1} onPartySelection={ onPumpSelection1} onCancel={onPumpSelectionCancel1} heading={"Fuel Station List"} />
                        <ListModel PartyList={PumpList2} openPartyModel={openPumpList2} onPartySelection={onPumpSelection2} onCancel={onPumpSelectionCancel2} heading={"Fuel Station List"} />
                        <ListModel PartyList={ItemList} openPartyModel={openItemList} onPartySelection={onItemSelection} onCancel={onItemSelectionCancel} heading={"Item List"} />
                        <ListModel PartyList={FromList} openPartyModel={openFromList} onPartySelection={onFromSelection} onCancel={onFromSelectionCancel} heading={"From Station List"} />
                        <ListModel PartyList={ToList} openPartyModel={openToList} onPartySelection={onToSelection} onCancel={onToSelectionCancel} heading={"To Station List"} />
                        {/* <ChooseModel isOpenModelModel={this.state.openModel} callBackMethod={this.changeMode}></ChooseModel> */}
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


    export default Booking;
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
        borderColor: 'blue',
    },
    lableStyle: {
        color: "#000",
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



//Line no 1107 selectedDate={BookingDate}
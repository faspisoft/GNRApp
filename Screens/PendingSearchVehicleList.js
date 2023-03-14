// import { StatusBar } from "expo-status-bar";
// import React,{useEffect} from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   ScrollView,
//   SafeAreaView,
//   Modal,
//   PixelRatio,
//   Alert,
// } from "react-native";
// import Header from "./Header";
// import logout from "../assets/logout.png";
// import ListModel from "./ListModel";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const fontFactor = PixelRatio.getFontScale();

// // export default class PendingListSearchVehicle extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.fullData = [];
// //     this.state = {
// //       isOpenCalender: false,
// //       isLoading: false,
// //       SelectedVehicleNo: "", //this.props.route.params.Vno,
// //       openVehicleList: false,
// //       VehicleList: [],
// //       selectedVehicleId: "", //this.props.route.params.Vid,
// //     };
// //   }
// const PendingListSearchVehicle=({navigation})=>{

//     const [isOpenCalender,setisOpenCalender]=React.useState(false)
//     const [isLoading,setisLoading]=React.useState(false)
//     const [SelectedVehicleNo,setSelectedVehicleNo]=React.useState("")
//     const [openVehicleList,setopenVehicleList]=React.useState(false)
//     const [VehicleList,setVehicleListt]=React.useState([])
//     const [selectedVehicleId,setselectedVehicleId]=React.useState("")
    


// const  onVehicleSelection = (params) => {
//     // this.setState({
//     //   selectedVehicleId: params.value,
//     //   SelectedVehicleNo: params.label,
//     //   openVehicleList: false,
//     // });
//     setselectedVehicleId(params.value)
//     setSelectedVehicleNo(params.label)
// setopenVehicleList(false)
//   };
//  const onVehicleSelectionCancel = () => {
//     // this.setState({ openVehicleList: false });
//     setopenVehicleList(false)
//   };

//  const fetchPendingMsgList = async () => {
//     // this.setState({ isLoading: true });
//     setisLoading(true)
//     // console.log(token);
//     const token = await AsyncStorage.getItem("AUTH");
//   await  fetch(""http://GNR.marwariplus.com"+ ""+ "/api/ApiPendingMsgList", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Auth":token,
//         platform: "Android",
//       },
//       redirect: "follow",
//     })
//       .then((response) => response.text())
//       .then(async (responseText) => {
//         // this.setState({ isLoading: false });
//         setisLoading(false)
//         try {
//           let respObject = JSON.parse(responseText);
//           if (respObject.Message) {
//             // this.setState({ isLoading: false });
//             setisLoading(false)
//             alert(respObject.Message);
//             navigation.goBack();
//           } else {
//             fullData = respObject;
//             // console.log("response",respObject)
//             let List = [];
//             respObject.forEach((object) => {
//               // console.log("object",object)
//               let dropdownObject = {
//                 label: object.VehicleNo,
//                 value: object.VehicleId,
//               };
//               List.push(dropdownObject);
//             });
//             // this.setState({ VehicleList: List });
//             setVehicleListt(List)
//             // console.log("VehicleList",VehicleList)
//             //console.log(this.state.VehicleList);
//           }
//         } catch (error) {
//           // this.setState({ isLoading: false });
//           setisLoading(false)
//           console.log("1", error);
//           alert("There is some problem. Please try again");
//         }
//       })
//       .catch((error) => {
//         console.log("2", error);
//         // this.setState({ isLoading: false });
//         setisLoading(false)
//         alert("There is some problem. Please try again");
//       });
//   };
// //   componentDidMount() {
// //     this.fetchVehicleList();
// //   }

// useEffect(() => {
//   fetchPendingMsgList();
// }, [])

//  const _Search = async () => {
//     if (SelectedVehicleNo !== "")
//      navigation.navigate("PendingBookingList", {
//         VehicleNo: SelectedVehicleNo,
//         VehicleId: selectedVehicleId,
//       });
//     else Alert.alert("Marwari Software", "Please Enter Vehicle No.");
//   };

// //   render() {
//     return (
//       <SafeAreaView
//         style={{ flex: 1, backgroundColor: "#009A22", paddingTop: 30 }}
//       >
//         <StatusBar style="inverted" />
//         <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
//           <Header
//             showBack={true}
//             title={"GNR"}
//             rightIcon={logout}
//             // openModeModel={openModeModel}
//           />
//           <Text
//             style={{
//               color: "#b22222",
//               alignSelf: "center",
//               marginTop: 11,
//               fontSize: 15,
//             }}
//           >
//             Search Vehicle For Pending Booking
//           </Text>
//           <View style={{ marginTop: 10 }}>
//             <Text style={{ color: "#000", textAlign: "left", marginLeft: 15 }}>
//               Enter Vehicle No.
//             </Text>
//             <TouchableOpacity
//               onPress={() => setopenVehicleList(true)}
//             >
//               <TextInput
//                 style={[styles.TextInputStyle]}
//                 placeholderTextColor="#ccc"
//                 placeholder="Vehicle No"
//                 editable={false}
//               >
//                 {SelectedVehicleNo}
//               </TextInput>
//             </TouchableOpacity>
//           </View>
//           <View style={{ marginTop: 30, marginStart: 10 }}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => _Search()}
//             >
//               <Text
//                 style={{ fontSize: 24, color: "#ffffff", alignSelf: "center" }}
//               >
//                 Search
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <ListModel
//             PartyList={VehicleList}
//             openPartyModel={openVehicleList}
//             onPartySelection={onVehicleSelection}
//             onCancel={onVehicleSelectionCancel}
//             heading={"Vehicle List"}
//           />
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={isLoading}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: "#ffffffee",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <ActivityIndicator size="large" color="#F60000" />
//               <Text
//                 style={{
//                   fontSize: 20 / fontFactor,
//                   fontWeight: "bold",
//                   color: "#434343",
//                   margin: 15,
//                 }}
//               >
//                 Loading....
//               </Text>
//             </View>
//           </Modal>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   export default PendingListSearchVehicle;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   dropdown: {
//     height: 40,
//     borderColor: "#000",
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 5,
//     backgroundColor: "white",
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: "absolute",
//     backgroundColor: "white",
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//     color: "#000",
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: "#000",
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: "#000",
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     backgroundColor: "white",
//     color: "#000",
//   },
//   lableStyle: {
//     color: "#434343",
//     marginLeft: 15,
//     fontSize: 14 / fontFactor,
//   },
//   inputView: {
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     width: "80%",
//     height: 45,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   TextInputStyle: {
//     fontSize: 14 / fontFactor,
//     marginLeft: 15,
//     marginRight: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     height: 40,
//     padding: 10,
//     backgroundColor: "#fff",
//     color: "#000000",
//     borderColor: "#11245a",
//     textAlignVertical: "center",
//   },
//   TextInput: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     height: 50,
//     width: "100%",
//     color: "#000",
//   },
//   StText: {
//     fontSize: 20,
//     fontWeight: "500",
//     color: "coral",
//   },
//   buttonContainer: {
//     margin: 20,
//   },
//   button: {
//     borderRadius: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.8,
//     elevation: 6,
//     shadowRadius: 15,
//     shadowOffset: { width: 1, height: 13 },
//     margin: 5,
//     width: "60%",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#000",
//     backgroundColor: "#009A22",
//     height: 40,
//     alignSelf: "center",
//     justifyContent: "center",
//   },
// });

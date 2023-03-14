import React, { Component ,useEffect} from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Picker,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Modal,
  PixelRatio,
} from "react-native";
import Header from "./Header";
import logout from "../assets/logout.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import CalendarPopUp from "./CalenderPopUp";
import {baseUrl} from "../package.json";
const fontFactor = PixelRatio.getFontScale();


const PendingBookingList=({navigation,route})=>{
 
    const [openModel,setopenModel]=React.useState(false)
    const [SrName,setSrName]=React.useState("")
    const [fromDate,setfromDate]=React.useState(moment(new Date()).format("YYYYMMDD"))
    const [toDate,settoDate]=React.useState(moment(new Date()).format("YYYYMMDD"))
    const [isOpenCalender1,setisOpenCalender1]=React.useState(false)
    const [isOpenCalender2,setisOpenCalender2]=React.useState(false)
    const [isLoading,setisLoading]=React.useState(false)
    // const [SelectedVehicleNo,setSelectedVehicleNo]=React.useState(route.params.VehicleNo)
    // const [SelectedVehicleId,setSelectedVehicleId]=React.useState(route.params.VehicleId)
    const [PendingBookingList,setPendingBookingList]=React.useState([])
    const [selectedPump,setselectedPump]=React.useState("")
    const [BookingId,setBookingId]=React.useState("")




 const  onToDateChange = (date) => {
    // this.setState({
    //   toDate: moment(date).format("YYYYMMDD"),
    //   isOpenCalender2: false,
    //   isLoading: false,
    // });
    settoDate(moment(date).format("YYYYMMDD"))
    setisOpenCalender2(false)
    setisLoading(false)
  };
  const onFromDateChange = (date) => {
    // this.setState({
    //   fromDate: moment(date).format("YYYYMMDD"),
    //   isOpenCalender1: false,
    //   isLoading: false,
    // });
    setfromDate(moment(date).format("YYYYMMDD"))
    setisOpenCalender1(false)
    setisLoading(false)
  };

 const fetchBookingList = async () => {
    // console.log("Booking Id",global.url, global.token, BookingId);
    // this.setState({ isLoading: true });
    setisLoading(true)
    const token=await AsyncStorage.getItem('AUTH')
    fetch(baseUrl+ "/api/ApiPendingMsgList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
        platform: "Android",
      },
      redirect: "follow",
    })
      .then((response) => response.text())
      .then(async (responseText) => {
        // this.setState({ isLoading: false });
        setisLoading(false)
        try {
          let respObject = JSON.parse(responseText);
          if (!respObject.Message) {
            // var fullData = respObject;
            console.log("response object",respObject);
            // this.setState({ PendingBookingList: respObject });
            setPendingBookingList(respObject)
          } else {
            // this.setState({ isLoading: false });
            setisLoading(false)
            alert(respObject.Message);
          }
        } catch (error) {
        //   this.setState({ isLoading: false });
        setisLoading(false)
          console.log("1", error);
          alert("There is some problem. Please try again");
        }  
      })
      .catch((error) => {
        console.log("2", error);
        // this.setState({ isLoading: false });
        setisLoading(false)
        alert("There is some problem. Please try again");
      });
  };

useEffect(() => {
  fetchBookingList();
}, [])


  const FlatListHeader = () => {
    return (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#dddddd", //"#b5f5bf",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginLeft: 10,
            alignSelf: "center",
            flex: 1,
            color: "#000000",
          }}
        >
          Date
        </Text>
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginLeft: 10,
            alignSelf: "center",
            flex: 2,
            color: "#000000",
          }}
        >
          GR Number
        </Text>
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginLeft: 10,
            alignSelf: "center",
            flex: 1,
            color: "#000000",
          }}
        >
          Item
        </Text>
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginEnd: 10,
            alignSelf: "center",
            flex: 2,
            textAlign: "center",
            color: "#000000",
          }}
        >
          From
        </Text>
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginEnd: 10,
            alignSelf: "center",
            flex: 2,
            textAlign: "center",
            color: "#000000",
          }}
        >
          To
        </Text>
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginEnd: 10,
            alignSelf: "center",
            flex: 3,
            textAlign: "center",
            color: "#000000",
          }}
        >
          Vehicle No
        </Text>
        <Text
          style={{
            fontSize: 12 / fontFactor,
            marginEnd: 10,
            alignSelf: "center",
            flex: 3,
            textAlign: "center",
            color: "#000000",
          }}
        >
          Pump Name
        </Text>
      </View>
    );
  };

//   getDetail(BookingId) {
//     Alert.alert("Marwari Software", "Are You Sure You want to Send Msg ?", [
//       { text: "Yes", onPress: () => this.getUpdate(BookingId) },
//       {
//         text: "No",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//     ]);
//   }

//   getUpdate(BookingId) {

//     fetch(global.url + "/api/ApiSendWp", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Auth: global.token,
//         platform: "Android",
//         BookingId: BookingId,
//       },
//       redirect: "follow",
//     })
//       .then((response) => response.text())
//       .then(async (responseText) => {
//         this.setState({ isLoading: false });
//         try {
//           let respObject = JSON.parse(responseText);
//           if (!respObject.Message) {
//             alert(respObject.Message);
//           } else {
//             this.setState({ isLoading: false });
//             alert(respObject.Message);
//           }
//           this.fetchBookingList(this.state.pump_id);
//         } catch (error) {
//           this.setState({ isLoading: false });
//           console.log("1", error);
//           alert("There is some problem. Please try again");
//         }
//       });
//   }

//   render() {
    // in line 284   openModeModel={this.openModeModel}
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#eeeeee" }}
      >
  
          <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <Header
              showBack={true}
              title={"Pending List"}
              rightIcon={logout}
            
            />

            <FlatList
              data={PendingBookingList}
              ListHeaderComponent={FlatListHeader}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                // <TouchableOpacity
                //   onPress={() => {
                //     this.getDetail(item.BookingId.toString());
                //   }}
                // >
                
                <TouchableOpacity
                  onPress={() => {
                    // this.setState({ selectedLedger: item });
                    navigation.navigate("PendingBookingDetail", {
                      PendingBookingDetail: item,
                    });
                  }}
                >
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 10,
                      width: "100%",
                      backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 1,
                        color: "#000000",
                      }}
                    >
                      {moment(item.Date.toString()).format("DD MMM YYYY")}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 1,
                        color: "#000000",
                      }}
                    >
                      {item.GRNumber}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 1,
                        color: "#000000",
                      }}
                    >
                      {item.ItemName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 1,
                        color: "#000000",
                      }}
                    >
                      {item.FromStationName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 1,
                        color: "#000000",
                      }}
                    >
                      {item.ToStationName}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 2,
                        color: "#000000",
                      }}
                    >
                      {item.VehicleNo}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        alignSelf: "center",
                        fontSize: 11 / fontFactor,
                        flex: 2,
                        color: "#000000",
                      }}
                    >
                      {item.PumpName}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={isLoading}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffffee",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color="#F60000" />
                <Text
                  style={{
                    fontSize: 20 / fontFactor,
                    fontWeight: "bold",
                    color: "#434343",
                    margin: 15,
                  }}
                >
                  Loading....
                </Text>
              </View>
            </Modal>
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }


  export default PendingBookingList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lableStyle: {
    color: "#434343",
    marginLeft: 15,
    fontSize: 14 / fontFactor,
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
    textAlignVertical: "center",
  },
  TextInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    width: "100%",
    color: "#000",
  },
  StText: {
    fontSize: 20,
    fontWeight: "500",
    color: "coral",
  },
  TextStyle: {
    fontSize: 13 / fontFactor,
    //fontWeight: 'bold',
    color: "#000000",
    marginLeft: 10,
    marginTop: 5,
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
    alignSelf: "center",
    justifyContent: "center",
  },
  HeadText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  images: {
    marginTop: 10,
    width: 200,
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 3,
  },
});

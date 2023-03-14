// import {key} from "../key"
import React,{useEffect} from "react";
import {
  ActivityIndicator,
  FlatList,
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
//import RNFetchBlob from "rn-fetch-blob";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Header from "./Header";
import logout from "../assets/logout.png";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {baseUrl} from "../package.json";

const fontFactor = PixelRatio.getFontScale();
let options = {
  maxWidth: 800,
  maxHeight: 600,
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const PendingBookingDetail=({navigation,route})=>{

const [isOpenToCalender,setisOpenToCalender]=React.useState(false)
const [isOpenFromCalender,setisOpenFromCalender]=React.useState(false)
const [isLoading,setisLoading]=React.useState(false)
const [isUpdate,setisUpdate]=React.useState(false)
const [Mode,setMode]=React.useState(Mode)
const [LedgerList,setLedgerList]=React.useState("")
const [selectedLedger,setselectedLedger]=React.useState("")
const [book,setbook]=React.useState(route.params.PendingBookingDetail)
const [bookId,setbookId]=React.useState(route.params.PendingBookingDetail.BookingId)

const [openModel,setopenModel]=React.useState(false)
const [unloadWeight,setunloadWeight]=React.useState(route.params.PendingBookingDetail.UnloadingWeight)
const [isAdvance,setisAdvance]=React.useState(false)
const [isDiesel,setisDiesel]=React.useState(false)
const [filePath,setfilePath]=React.useState("")
const [filePath2,setfilePath2]=React.useState("")
const [fileData,setfileData]=React.useState("")
const [fileData2,setfileData2]=React.useState("")
const [fileUri,setfileUri]=React.useState("")
const [fileUri2,setfileUri2]=React.useState("")
const [isDisabled,setIsdisabled]=React.useState(false)
const [bookingmetaid,setBookingmetaid]=React.useState(route.params.PendingBookingDetail.BookingMetaId)

// console.log("booook",book)
// console.log("BookingId",bookId)
// console.log("Metabook",bookingmetaid)
  const  UpdatePendingList =async () => {
    book.UnloadingWeight = unloadWeight;
    // book.UploadFileBase64 =fileData;
    // book.UploadFile2Base64=fileData2;
    // book.Advance = isAdvance;//change advance to isAdvance 
    // book.Diesel = isDiesel;  //change diesel to isDiesel
    //console.log(global.url + "/api/ApiBooking/"+this.state.bookId);
    //console.log(global.token);
    const token=await AsyncStorage.getItem('AUTH')
    console.log("Data=========", JSON.stringify(book));
    setIsdisabled(true)
    fetch(baseUrl+ "/api/ApiSendWp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
        BookingId:bookId,
        BookingMetaId:bookingmetaid,
        platform: "Android",
      },
      // body: JSON.stringify(book),  
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((responseText) => {
        // this.setState({ isLoading: false });
        setisLoading(false)
      
        try {
          //console.log(responseText);
          var respObject = JSON.parse(responseText);
          console.log("Response",respObject)
          if (respObject.Message == "Message Sent Successfully.") {
            alert(respObject.Message);
            navigation.navigate("Dashboard");
          } else {
            alert(respObject.Message);
            navigation.goBack();
          }
        } catch (error) {
          alert("1.There is some problem. Please try again");
        }
      })
      .catch((error) => {
        // this.setState({ isLoading: false });
        setisLoading(false)
        alert("2.There is some problem. Please try again");
      });
  };
  
  // render() {
    // console.log("BookId",this.state.bookId)
    return (
      <SafeAreaView
        style={{  backgroundColor: "#eeeeee" }}
      >
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <Header
              showBack={true}
              title={"Booking Detail"}
              rightIcon={logout}
              // openModeModel={this.openModeModel}
            />
            <Text
              style={[
                styles.HeadText,
                {
                  fontSize: 20 / fontFactor,
                  fontWeight: "bold",
                  color: "#000000",
                  marginTop: 20,
                  marginStart: 20,
                },
              ]}
            >
              {"Details of Vehicle No: " + book.VehicleNo}
            </Text>
            <View>
              <Text style={styles.TextStyle}>
                <Text style={{ fontWeight: "bold" }}>Date :</Text>
                {moment(book.Date.toString()).format("DD-MMM-YYYY")}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.TextStyle}>
                  <Text style={{ fontWeight: "bold" }}>Item Name :</Text>{" "}
                  <Text>{book.ItemName}</Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.TextStyle}>
                  <Text style={{ fontWeight: "bold" }}>GR NUmber :</Text>
                  {book.GRNumber}
                </Text>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, marginTop: 10 }}>
              <Text style={styles.TextStyle}>
                <Text style={{ fontWeight: "bold" }}>From Station: </Text>
                {book.FromStationName}
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1, marginTop: 10 }}>
              <Text style={styles.TextStyle}>
                <Text style={{ fontWeight: "bold" }}>To Station: </Text>
                {book.ToStationName}
              </Text>
            </View>
            <View style={{ borderBottomWidth: 1, marginTop: 10 }}>
              <Text style={styles.TextStyle}>
                <Text style={{ fontWeight: "bold" }}>PumpName: </Text>
                {book.PumpName}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.TextStyle}>
                  <Text style={{ fontWeight: "bold" }}>Loading Weight : </Text>
                  {book.LoadingWeight}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.TextStyle}>
                  <Text style={{ fontWeight: "bold" }}>
                    Unloading Weight :{" "}
                  </Text>
                  {book.UnloadingWeight}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.TextStyle}>
                  <Text style={{ fontWeight: "bold" }}>Diesel : </Text>
                  {book.TotalDiesel}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.TextStyle}>
                  <Text style={{ fontWeight: "bold" }}>Advance : </Text>
                  {book.TotalAdvance}
                </Text>
              </View>
            </View>
         
            <View>
              <Text style={styles.TextStyle}>
                <Text style={{ fontWeight: "bold" }}>DEF : </Text>
                {book.TotalDef}
              </Text>
            </View>
            <View>
                <TouchableOpacity
                  style={styles.btnText}
                  disabled={isDisabled}
                  // onPress={() => this.setState({ isUpdate: true })}
                  onPress={()=>{UpdatePendingList()}}
                >
                  <Text style={{ color: "#ffffff", alignSelf: "center" }}>
                    Send Message
                  </Text>
                </TouchableOpacity>

            </View>

            <View>
              {isUpdate && (
                <>
                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {this.state.isAdvance &&
                                            <View style={{ flex: 1, marginTop: 10 }}>
                                                <Text style={styles.lableStyle}>Advance </Text>
                                                <TextInput style={[styles.TextInputStyle]} value={this.state.advance} keyboardType="numeric" onChangeText={(adv) => { this.setState({ advance: adv }); }} />
                                            </View>
                                        }
                                        {this.state.isDiesel &&
                                            <View style={{ flex: 1, marginTop: 10 }}>
                                                <Text style={styles.lableStyle}>Diesel </Text>
                                                <TextInput style={[styles.TextInputStyle]} value={this.state.diesel} keyboardType="numeric" onChangeText={(fuel) => { this.setState({ diesel: fuel }); }} />
                                            </View>
                                        }
                                    </View> */}
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.lableStyle}>Unloading Weight </Text>
                    <TextInput
                      style={[styles.TextInputStyle]}
                      value={unloadWeight}
                      keyboardType="numeric"
                      // onChangeText={(wt) => {
                      //   // this.setState({ unloadWeight: wt });
                      //   setunloadWeight(wt)
                      // }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flex: 1, alignItems: "center", marginRight: 10 }}
                    >
                      {fileUri != "" && (
                        <Image
                          source={{ uri: fileUri }}
                          style={styles.images}
                        />
                      )}
                    </View>
                    <View
                      style={{ flex: 1, alignItems: "center", marginLeft: 10 }}
                    >
                      {this.state.fileUri2 != "" && (
                        <Image
                          source={{ uri: fileUri2 }}
                          style={styles.images}
                        />
                      )}
                    </View>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={[styles.btnParentSection, { flex: 1 }]}>
                      <TouchableOpacity
                        style={styles.btnText}
                        onPress={this.chooseImage}
                      >
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>
                          Photo Front
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.btnParentSection, { flex: 1 }]}>
                      <TouchableOpacity
                        style={styles.btnText}
                        onPress={this.chooseImage2}
                      >
                        <Text style={{ color: "#ffffff", alignSelf: "center" }}>
                          Photo Back
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View> */}

                  <View>
                    <TouchableOpacity
                      style={[styles.btnText, { width: "90%" }]}
                      onPress={RecordsSave}
                    >
                      <Text style={{ color: "#ffffff", alignSelf: "center" }}>
                        Save Record
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
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
        </ScrollView>
      </SafeAreaView>
    );
  }

  export default PendingBookingDetail;
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

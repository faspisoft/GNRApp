import React, { useEffect } from 'react';
import { Alert, BackHandler, Picker, Button, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio } from 'react-native';
import Header from './Header';
// import ChooseModel from './ChooseModel';
import logout from '../assets/logout.png';
import rightIcon from '../assets/right_icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from "../package.json";
const fontFactor = PixelRatio.getFontScale();


const Dashboard=({navigation})=>{

const [regBG,setregBG]=React.useState("#ffffff")
const [nextBG,setnextBG]=React.useState("#ffffff")
const [displayBG,setdisplayBG]=React.useState("#3f51b5")
const [openModel,setopenModel]=React.useState(false)
const [SrName,setSrName]=React.useState("")
const [LoginType,setLoginType]=React.useState("")
// const [baseUrl,setBaseUrl]=React.useState("http://GNR.marwariplus.com")
// const [baseUrl,setBaseUrl]=React.useState("http://192.168.1.181")
// const [SrName,setSrName]=React.useState("")s
//   const  changeMode = (mode) => {
//         Mode = mode;
//         setopenModel(false)
//         // this.setState({ openModel: false });
//     }

    const   openModeModel = () => {
        setopenModel(true)
    }

    const  handleBackButton = () => {
        if (!navigation.isFocused()) {
            // The screen is not focused, so don't do anything
            return false;
        }
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => {
                    AsyncStorage.clear(); 
                    global.selectedBusiness = ''; 
                    BackHandler.exitApp();
                    navigation.navigate("Login")
                }
            },],{
            cancelable: false
        }
        )
        return true;
    }
   

    useEffect(() => {
        // wrap your async call here
          const loadData=  async () => {
            const nm=   await AsyncStorage.getItem('SRNAME');
            const LoginType = await AsyncStorage.getItem('LOGINTYPE');
             // console.log(this.props.route.params.type);
            //  this.setState({ LoginType: LoginType });
            setLoginType(LoginType)
            //  this.setState({ SrName: nm });
            setSrName(nm)
             BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            //  navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Login' }],
            // });
             return   ()=>{
                BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
             }
        };
        loadData();
        // then call it here
      }, []);

    //   useEffect(()=>{
      
    //   })
// console.log(LoginType)
    // render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
                <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    <Header showBack={false} title={"Dashboard"} rightIcon={logout} openModeModel={openModeModel} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.HeadText, { fontSize: 20, fontWeight: 'bold', color: "#11245a", margin: 15 }]}>Hello {SrName}</Text>
                    </View>
                    {LoginType == 'LoadingPoint' && <ScrollView>
                        <TouchableOpacity onPress={() => navigation.navigate('SearchVehicle')}>
                            {/* <View style={{ margin: 15, backgroundColor: this.state.displayBG, height: 80, alignItems: 'center', flexDirection: "row", elevation: 5 }}> */}
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Booking</Text>
                                {/* <Image style={{ width: 25, height: 25, marginRight: 10, tintColor: "#434343", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image> */}
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>navigation.navigate('HistoryListLoading')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>History</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ChPass')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Change Password</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('DriverList')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Driver</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('DEFScreen')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>DEF List</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PendingBookingList')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Pending List</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('BarCode')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Scan QR</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity> */}
                    </ScrollView>}
                    {LoginType == 'FuelStation' && <>
                        <TouchableOpacity onPress={() => navigation.navigate('PendingList')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Pending List</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('HistoryList')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>History</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ChPass')}>
                            <View style={styles.btn}>
                                <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Change Password</Text>
                                <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                            </View>
                        </TouchableOpacity>
                    </>
                    }
                    {/* <TouchableOpacity onPress={() => global.navigation.navigate('Qr')}>
                        <View style={styles.btn}>
                            <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>QR</Text>
                            <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                        </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={() => global.navigation.navigate('Cam')}>
                        <View style={styles.btn}>
                            <Text style={{ textTransform: "uppercase", fontSize: 20, color: "#fff", padding: 25, flex: 1 }}>Camera</Text>
                            <Image style={{ width: 25, height: 25, marginTop: 25, marginRight: 10, tintColor: "#fff", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                        </View>
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity onPress={() => global.navigation.navigate('StockList')}>
                        <View style={{ margin: 15, backgroundColor: this.state.regBG, height: 80, alignItems: 'center', flexDirection: "row", elevation: 5 }}>
                            <Text style={{ fontSize: 20, color: "#434343", padding: 15, flex: 1 }}>Stock Book</Text>
                            <Image style={{ width: 25, height: 25, marginRight: 10, tintColor: "#434343", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => global.navigation.navigate('SaleList')}>
                        <View style={{ margin: 15, backgroundColor: this.state.nextBG, height: 80, alignItems: 'center', flexDirection: "row", elevation: 5 }}>
                            <Text style={{ fontSize: 20, color: "#434343", padding: 15, flex: 1 }}>Sale</Text>
                            <Image style={{ width: 25, height: 25, marginRight: 10, tintColor: "#434343", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => global.navigation.navigate('ReceiptList')}>
                        <View style={{ margin: 15, backgroundColor: this.state.nextBG, height: 80, alignItems: 'center', flexDirection: "row", elevation: 5 }}>
                            <Text style={{ fontSize: 20, color: "#434343", padding: 15, flex: 1 }}>Reciept</Text>
                            <Image style={{ width: 25, height: 25, marginRight: 10, tintColor: "#434343", resizeMode: 'contain', marginLeft: 10 }} source={rightIcon}></Image>
                        </View>
                    </TouchableOpacity> */}
                    {/* <Ch ooseModel isOpenModelModel={this.state.openModel} callBackMethod={this.changeMode}></ChooseModel> */}


                </View>
            </SafeAreaView>
        );
    }


    export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    lableStyle: {
        color: "#434343",
        fontSize: 14 / fontFactor
    },

    TextInputStyle: {
        fontSize: 14 / fontFactor,
        borderRadius: 10,
        borderWidth: 1,
        height: 40,
        padding: 10,
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
    HeadText: {
        textDecorationLine: 'underline',
    },
    btn: {
        elevation: 15,
        flexDirection: "row",
        margin: 15,
        backgroundColor: "#009A22",//"#3f51b5",
        color: "#000",
        borderRadius: 10,
        boxShadow: "0px 2px 2px lightgray",
        opacity: 0.8,
    }
});
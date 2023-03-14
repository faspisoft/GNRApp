import React from 'react';
import {Alert, ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../assets/back.png';
import Header from './Header';
import logout from '../assets/logout.png';

const fontFactor = PixelRatio.getFontScale();

// export default class ChPass extends React.Component {
//     constructor(props) {
//         super(props);
//         this.fullData = [];
//         this.state = {
//             isOpenCalender: false,
//             OldPass: '',
//             NewPass: '',
//             ConPass:'',
//         }
//     }
const ChPass=({navigation})=>{

    const [isLoading,setIsLoading]=React.useState(true)
    const [OldPass,setOldPass]=React.useState('')
    const [NewPass,setNewPass]=React.useState('')
    const [ConPass,setConPass]=React.useState('')


 const   Update = async () => {
        if (OldPass.length<=0){
           Alert.alert("Marwari Software","Old Password Can't Be Left Empty.")
        }else if(NewPass.length<=0){
            Alert.alert("Marwari Software","New Password Can't Be Left Empty.")
        }else if(ConPass.length<=0){
            Alert.alert("Marwari Software","Confirm Password Can't Be Left Empty.")
        }else if(NewPass!==ConPass){
            Alert.alert("Marwari Software","Password Does Not Match.")
        }
        else{
            console.log(token, OldPass, NewPass);
          const     token=await AsyncStorage.getItem('AUTH');
            fetch("http://GNR.marwariplus.com" + "/api/ApiChangePassword", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": token,
                    "OldPassword":OldPass,
                    "NewPassword":NewPass,
                    "platform": "Android",
                },
                redirect: 'follow'

            }).then(response => response.text())
            .then(responseText => {
                // this.setState({ isLoading: false });
                // setIsLoading(false)
                try {
                    console.log(responseText);
                    var respObject = JSON.parse(responseText);
                    if (respObject.Message == "Updated Successfully.") {
                        alert(respObject.Message);
                      navigation.goBack();
                    } else {
                        alert(respObject.Message);
                        //global.navigation.goBack();
                    }

                } catch (error) {
                    alert("There is some problem. Please try again");
                }
            })
            .catch(error => {
                // this.setState({ isLoading: false });
                setIsLoading(false)
                alert("There is some problem. Please try again");
            });
        }
    }
    // render() {
        // in line 83 openModeModel={this.openModeModel}
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#009A22' }}>
                <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                    <Header showBack={true} title={"GNR"} rightIcon={logout}  />
                    <Text style={{ color: "#b22222", alignSelf: "center", marginTop: 30, fontSize: 20, textDecorationLine:'underline' }}>Change Password</Text>
                    <View style={{ marginLeft: 10, marginTop: 35 }}>
                        <Text style={{marginLeft:15,color: "#000"}}>Old Password</Text>
                        <TextInput style={[styles.TextInputStyle]} placeholderTextColor="#ccc" placeholder="OLD PASSWORD" secureTextEntry={true} onChangeText={(old) => { setOldPass(old) }} />
                    </View>
                    <View style={{ marginLeft: 10, marginTop: 35 }}>
                    <Text style={{marginLeft:15,color: "#000"}}>New Password</Text>
                        <TextInput style={[styles.TextInputStyle]} placeholderTextColor="#ccc" placeholder="NEW PASSWORD" secureTextEntry={true} onChangeText={(newp) => { setNewPass(newp) }} />
                    </View>
                    <View style={{ marginLeft: 10, marginTop: 35 }}>
                    <Text style={{marginLeft:15,color: "#000"}}>Confirm Password</Text>
                        <TextInput style={[styles.TextInputStyle]} placeholderTextColor="#ccc" placeholder="CONFIRM PASSWORD" secureTextEntry={true} onChangeText={(conp) => { setConPass(conp) }} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, marginStart: 10 }}>
                        <TouchableOpacity style={{ width: '90%', borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginStart: 15, alignSelf: 'center', justifyContent: 'center' }} onPress={() => Update()}>
                            <Text style={{ color: "#ffffff", alignSelf: "center" }}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    export default ChPass;
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
});
import React, { Component } from 'react'
import { Alert, ActivityIndicator, StatusBar, Image, Text, View, StyleSheet, Button, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import img from '../assets/logox1.png'
// import { baseurl } from './globalvar';
import {baseUrl} from "../package.json";

// import { useNavigation } from '@react-navigation/native';
// export class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             clientUrl: global.url,
//             db: '',
//             isLoading: false
//         }
//     }


const Login=({navigation})=>{

const [username,setUsername]=React.useState('')
const [password,setPassword]=React.useState('')
const [isLoading,setIsLoading]=React.useState(false)


const [db,setDb]=React.useState('')

// console.log(clientUrl)

const login=async()=>{
    const nm=   await AsyncStorage.getItem('SRNAME');
    if(nm)
    {
      navigation.navigate("Dashboard")
    }
  }
  


    _SignIn = () => {
        if (username.length <= 0) {
            Alert.alert("Marwari Software", "Username Can't Be Left Empty")
        }else if(password.length<0){
            Alert.alert("Marwari Software", "Password Can't Be Left Empty")
        }
        else {
            setIsLoading(true);
            fetch(`${baseUrl}/api/Login`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Username": username,
                    "Password": password,
                    "platform": "Android"
                },
                redirect: 'follow'
            }).then(response => response.text()).then(async responseText => {
                try {
                    var respObject = JSON.parse(responseText);
                    console.log(respObject);
                    if (respObject.Message=="OK") {
                        await AsyncStorage.setItem('SRNAME', respObject.Name);
                        await AsyncStorage.setItem('AUTH', respObject.Auth);
                        var sid=respObject.StationId.toString();
                        await AsyncStorage.setItem('SID',sid);
                        await AsyncStorage.setItem('SNAME', respObject.StationName);
                        await AsyncStorage.setItem('LOGINTYPE', respObject.Type);
                        // console.log(respObject.Auth)
                        // console.log(respObect.Type)
                        navigation.navigate('Dashboard')
                        //    const BussName = respObject[0]["BusinessName"];
                        setIsLoading(false)
                    } else {
                      setIsLoading(false)
                        Alert.alert("Marwari Software", respObject.Message)
                    }
                }
                catch (error) {
            setIsLoading(false)
                    console.log(error);
                    Alert.alert("Marwari Software", "1. There is some problem. Please try again"); 
                }
            }).catch(error => {
                console.log(error);
                // this.setState({ isLoading: false });
                setIsLoading(false)
                Alert.alert("Marwari Software", "2. There is some problem. Please try again" + error);
            });
        }
    }
    
    _ValidateOTP = () => {
        if (otp.length <= 0) {
            Alert.alert("Marwari Software", "OTP Can't Be Left Empty")
        }else{
            // this.setState({ isLoading: true });
            setIsLoading(true)
            fetch(clientUrl + "/api/Login/OTP", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "MobileNumber": clientId,
                    "OTP":otp,
                    "platform": "Android"
                },
                redirect: 'follow'
            }).then(response => response.text()).then(async responseText => {
                try {
                    var respObject = JSON.parse(responseText);
                    console.log(respObject.Message)
                    if (respObject.Message=="OK") {
                        await AsyncStorage.setItem('SRNAME', respObject.Name);
                        await AsyncStorage.setItem('AUTH', respObject.Auth);
                        navigation.navigate('Dashboard')
                           const BussName = respObject[0]["BusinessName"];
                        // this.setState({ isLoading: false });
                        setIsLoading(false)
                    } else {
                        // this.setState({ isLoading: false });
                        setIsLoading(false)
                        Alert.alert("Marwari Software", respObject.Message)
                    }

                }
                catch (error) {
                    // this.setState({ isLoading: false });
                    setIsLoading(false)
                    console.log(error);
                    Alert.alert("Marwari Software", "1. There is some problem. Please try again"); 
                }
            }).catch(error => {
                console.log(error);
                // this.setState({ isLoading: false });
                setIsLoading(false)
                Alert.alert("Marwari Software", "2. There is some problem. Please try again" + error);
            });
        }
    }
   
   React.useEffect(() => {
       login()
    }, [])

        return (
            <View style={styles.container}>
                <Image style={styles.image} source={img} />
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="UserName"     
                        placeholderTextColor="#ccc"
                        onChangeText={(user) => { setUsername(user) }}
                    />                    
                </View>
                <View style={styles.inputView}>
                <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#ccc"
                        secureTextEntry={true}
                        onChangeText={(pass) => { setPassword(pass)}}
                    />
                </View>    
                <TouchableOpacity style={styles.loginBtn} onPress={() => _SignIn()}>
                    <Text style={styles.loginText}>GO</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isLoading}>
                    <View style={{ flex: 1, backgroundColor: "#ffffffee", alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#F60000" />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#434343", margin: 15 }}>Loading....</Text>
                    </View>
                </Modal>
            </View>
        )
        }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009A22",//#11245a",//"#1C129F",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
        backgroundColor: "#009A22",//"#11245a",
        height: 100, resizeMode: 'contain'
    },

    inputView: {
        backgroundColor: "#fff",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        width: "100%",
        color: "#000"
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "50%",
        borderRadius: 20,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#fff",
    },
    loginText: {
        color: "#000"
    }
});

export default Login;

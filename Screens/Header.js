import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackIcon from '../assets/back.png';
import { useNavigation } from '@react-navigation/native';
// export default class Header extends React.Component {
//     startTime = 0;
//     count = 0;
//     count = 0;
//     constructor(props){
//         super(props);
//         console.log(props);
//     }

const Header =({rightIcon,title,showBack})=>{

    const navigation = useNavigation();
    const  logout = ()=>{
        AsyncStorage.clear(); 
       global.selectedBusiness = ''; 
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    // in Line 17 selectedBusiness = ''

 
    //11245a
    // render() {
        return (
            <TouchableOpacity>
                <View on style={{ height: 40, backgroundColor: "#009A22", flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                       {showBack && <TouchableOpacity onPress={() => { navigation.goBack()}}>
                            <Image style={{ width: 25, height: 25, marginRight: 0, resizeMode: 'contain', tintColor: "#ffffff", marginLeft: 10 }} source={BackIcon}></Image>
                        </TouchableOpacity>}                       
                    </View>
                    <Text style={{ flex: 1, fontSize: 17, color: "#ffffff", alignSelf: "center", textAlign: "center" }}>{title}</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                       <TouchableOpacity onPress={logout}>
                            <Image style={{ width: 25, height: 25, marginRight: 0, tintColor: "#ffffff", marginRight: 10, resizeMode: 'contain' }} source={rightIcon}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    export default Header;
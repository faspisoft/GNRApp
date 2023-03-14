import React, { Component,useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import logout from '../assets/logout.png';
import { Camera } from 'expo-camera';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import RNFetchBlob from "rn-fetch-blob";
import {manipulateAsync,FlipType,SaveFormat} from "expo-image-manipulator";
import moment from 'moment';
import CalendarPopUp from './CalenderPopUp';
import {baseUrl} from "../package.json";

const fontFactor = PixelRatio.getFontScale();
let options = {
    maxWidth: 800,
    maxHeight: 600,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
// const fs = RNFetchBlob.fs;
// RNFetchBlob.config({
//     fileCache: true
// })
// export default class AddDriver extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: false,
//             isDisabled: false,
//             DName: '',
//             DAddress: '',
//             DLNumber: '',
//             Religion: '',
//             Guarantor: '',
//             BloodGroup: '',
//             DLIssueDate: moment(new Date()).format('YYYYMMDD'),
//             DLHeavyDate: moment(new Date()).format('YYYYMMDD'),
//             DLExpiryDate: moment(new Date()).format('YYYYMMDD'),
//             DOB: moment(new Date()).format('YYYYMMDD'),
//             isOpenCalender: false,
//             isOpenCalender2: false,
//             isOpenCalender3: false,
//             isOpenCalender4: false,
//             DPhoto: '',
//             DPhotoPath: '',
//             DPhotoURI: '',
//             DLPhoto: '',
//             DLPhotoPath: '',
//             DLPhotoURI: '',
//             AadharNo: '',
//             AadharPhoto: '',
//             AadharPhotoPath: '',
//             AadharPhotoURI: '',
//         }
//     }
const AddDriver=({navigation})=>{

    const [isLoading,setisLoading]=useState(false)
    const [DName,setDName]=useState(false)
    const [isDisabled,setisDisabled]=useState(false)
    const [DAddress,setDAddress]=useState('')
    const [DLNumber,setDLNumber]=useState('')
    const [Religion,setReligion]=useState('')
    const [Guarantor,setGuarantor]=useState('')
    const [BloodGroup,setBloodGroup]=useState('')
    const [Remark,setRemark]=useState('')
    const [MobileNo,setMobileNo]=useState('')
    const [DLIssueDate,setDLIssueDate]=useState(moment(new Date()).format('YYYYMMDD'))
    const [DLHeavyDate,setDLHeavyDate]=useState(moment(new Date()).format('YYYYMMDD'))
    const [DLExpiryDate,setDLExpiryDate]=useState(moment(new Date()).format('YYYYMMDD'))
    const [DOB,setDOB]=useState(moment(new Date()).format('YYYYMMDD'))
    const [isOpenCalender,setisOpenCalender]=useState(false)
    const [isOpenCalender2,setisOpenCalender2]=useState(false)
    const [isOpenCalender3,setisOpenCalender3]=useState(false)
    const [isOpenCalender4,setisOpenCalender4]=useState(false)
    const [DPhoto,setDPhoto]=useState('')
    const [DPhotoPath,setDPhotoPath]=useState('')
    const [DPhotoURI,setDPhotoURI]=useState('')
    const [DLPhoto,setDLPhoto]=useState('')
    const [DLBackPhoto,setDLBackPhoto]=useState('')
    const [DLPhotoPath,setDLPhotoPath]=useState('')
    const [DLPhotoURI,setDLPhotoURI]=useState('')
    const [AadharNo,setAadharNo]=useState('')
    const [AadharPhoto,setAadharPhoto]=useState('')
    const [AadharPhotoPath,setAadharPhotoPath]=useState('')
    const [AadharPhotoURI,setAadharPhotoURI]=useState('')
/////////////////////////////////////////////
const [imageUri,setImageUri]=React.useState(null);
const [imageUri2,setImageUri2]=React.useState(null);
const [imageUri4,setImageUri4]=React.useState(null);
const [imageUri3,setImageUri3]=React.useState(null);
const [imageUri5,setImageUri5]=React.useState(null);
const [cameraPermission1, setCameraPermission1] = React.useState(null);
const [cameraPermission2, setCameraPermission2] = React.useState(null);
const [cameraPermission4, setCameraPermission4] = React.useState(null);
const [cameraPermission3, setCameraPermission3] = React.useState(null);
const [cameraPermission5, setCameraPermission5] = React.useState(null);
const [fileData,setfileData]=React.useState(null)
const [fileData2,setfileData2]=React.useState(null)
const [fileData4,setfileData4]=React.useState(null)
const [fileData3,setfileData3]=React.useState(null)
const [fileData5,setfileData5]=React.useState(null)
const [camera, setCamera] = React.useState(null);
const [type, setType] = React.useState(Camera.Constants.Type.back);
// console.log("filedata",fileData3)
//   convertToBase64 = (file, type) => {
//         if (type === 1) {
//             // this.setState({ DPhoto: file });
//             setDPhoto(file)
//         }
//         else if (type === 2) {
//             // this.setState({ DLPhoto: file });
//             setDLPhoto(file)
//         } else if (type === 3) {
//             // this.setState({ AadharPhoto: file });
//             setAadharNo(file)
//         }
//     };
    // chooseDriverImage = () => {
    //     launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.assets[0].uri };
    //             // this.setState({
    //             //     DPhotoPath: response.assets[0].fileName,
    //             //     DPhoto: response.data,
    //             //     DPhotoURI: response.assets[0].uri
    //             // });
    //             setDPhotoPath(response.assets[0].fileName)
    //             setDPhoto(response.data)
    //             setDPhotoURI(response.assets[0].uri)
    //             let bscode = fs.readFile(this.state.DPhotoURI);
    //             fs.readFile(DPhotoURI, 'base64')
    //                 .then(res => convertToBase64(res, 1));
    //         }
    //     });
    // }

    const convertToBase64 =async () => {
        const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
        toDataURL(imageUri)
        .then(async dataUrl => {
        const source = { uri:  dataUrl };
        const imgstr=source.uri;
        const strImage = imgstr.replace("data:image/jpeg;base64,", "");
        // console.log("imageString",strImage)
        setfileData(strImage)
        }) 
    };
 
    const  convertTo2Base64 = async() => {
        const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
        toDataURL(imageUri2)
        .then(async dataUrl => {
            const source = { uri:  dataUrl };
            const imgstr=source.uri;
            const strImage = imgstr.replace("data:image/jpeg;base64,", "");
            // console.log("imageString",strImage)
            setfileData2(strImage)
        })
    };

    const  convertTo4Base64 = async() => {
        const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
        toDataURL(imageUri4)
        .then(async dataUrl => {
            const source = { uri:  dataUrl };
            const imgstr=source.uri;
            const strImage = imgstr.replace("data:image/jpeg;base64,", "");
            // console.log("imageString",strImage)
            setfileData4(strImage)
        })
    };
   
    // console.log("filedata",fileData)
    // console.log("filedata2",fileData2)
      const  chooseDriverImage = async() => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        // console.log(cameraPermission,"cemraperminssion")
            //  console.log(cameraPermission.status ==="granted","istrueornot")
            setCameraPermission1(cameraPermission.status ==="granted");
            if (
            //   imagePermission.status !== 'granted' &&
              cameraPermission.status !== 'granted'
            ) {
              alert('Permission for media access needed.');
            }
    }

    // console.log(cameraPermission1,"checkpermission")
    const takePicture1 = async () => {
        if (camera) {
          const data = await camera.takePictureAsync(null);
          const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
          console.log("maipulate",manipResult)
          setImageUri(manipResult.uri);
          setCameraPermission1(null)
        }
      };

      const submitImage1=async()=>{
            convertToBase64()
            setImageUri(null)
      }
  
                const chooseDLImage = async () => {
            // here is how you can get the camera permission
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            // console.log(cameraPermission,"cemraperminssion")
            // console.log(cameraPermission.status ==="granted")
            setCameraPermission2(cameraPermission.status ==="granted");
            if (
            //   imagePermission.status !== 'granted' &&
              cameraPermission.status !== 'granted'
            ) {
              alert('Permission for media access needed.');
            }
            // console.log(cameraPermission1.status,"camera Permision")
          };


          
const chooseDLBackImage = async () => {
            // here is how you can get the camera permission
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            // console.log(cameraPermission,"cemraperminssion")
            // console.log(cameraPermission.status ==="granted")
            setCameraPermission4(cameraPermission.status ==="granted");
            if (
            //   imagePermission.status !== 'granted' &&
              cameraPermission.status !== 'granted'
            ) {
              alert('Permission for media access needed.');
            }
            // console.log(cameraPermission1.status,"camera Permision")
          };




                 //  console.log(cameraPermission2,"checkpermission2")
          const takePicture2 = async () => {
            if (camera) {
            const data = await camera.takePictureAsync(null);
           const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
          setImageUri2(manipResult.uri);
          setCameraPermission2(null)
            }
          };
        
          const submitImage2=async()=>{
            convertTo2Base64()
            setImageUri2(null)
          }

const takePicture4 = async () => {
            if (camera) {
            const data = await camera.takePictureAsync(null);
           const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
          setImageUri4(manipResult.uri);
          setCameraPermission4(null)
            }
          };
        
          const submitImage4=async()=>{
            convertTo4Base64()
            setImageUri4(null)
          }



          const  chooseAadharImage = async() => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            // console.log(cameraPermission,"cemraperminssion")
                //  console.log(cameraPermission.status ==="granted","istrueornot")
                setCameraPermission3(cameraPermission.status ==="granted");
                if (
                //   imagePermission.status !== 'granted' &&
                  cameraPermission.status !== 'granted'
                ) {
                  alert('Permission for media access needed.');
                }
        }
    
         const  chooseAadharBackImage = async() => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            // console.log(cameraPermission,"cemraperminssion")
                //  console.log(cameraPermission.status ==="granted","istrueornot")
                setCameraPermission5(cameraPermission.status ==="granted");
                if (
                //   imagePermission.status !== 'granted' &&
                  cameraPermission.status !== 'granted'
                ) {
                  alert('Permission for media access needed.');
                }
        }
    


        const  convertTo3Base64 = async() => {
            const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsDataURL(blob)
            }))
            toDataURL(imageUri3)
            .then(async dataUrl => {
                const source = { uri:  dataUrl };
                const imgstr=source.uri;
                const strImage = imgstr.replace("data:image/jpeg;base64,", "");
                // console.log("imageString",strImage)
                setfileData3(strImage)
            })
        };
        // console.log(cameraPermission1,"checkpermission")
        const takePicture3 = async () => {
            if (camera) {
              const data = await camera.takePictureAsync(null);
              const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
              console.log("maipulate",manipResult)
              setImageUri3(manipResult.uri);
              setCameraPermission3(null)
            }
          };
    
          const submitImage3=async()=>{
                convertTo3Base64()
                setImageUri3(null)
          }


          const  convertTo5Base64 = async() => {
            const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsDataURL(blob)
            }))
            toDataURL(imageUri5)
            .then(async dataUrl => {
                const source = { uri:  dataUrl };
                const imgstr=source.uri;
                const strImage = imgstr.replace("data:image/jpeg;base64,", "");
                // console.log("imageString",strImage)
                setfileData5(strImage)
            })
        };

          const takePicture5 = async () => {
            if (camera) {
              const data = await camera.takePictureAsync(null);
              const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
              console.log("maipulate",manipResult)
              setImageUri5(manipResult.uri);
              setCameraPermission5(null)
            }
          };
    
          const submitImage5=async()=>{
                convertTo5Base64()
                setImageUri5(null)
          }
      

//   const  chooseAadharImage = () => {
//         launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.assets[0].uri };
//                 // this.setState({
//                 //     AadharPhotoPath: response.assets[0].fileName,
//                 //     AadharPhoto: response.data,
//                 //     AadharPhotoURI: response.assets[0].uri
//                 // });
//                 setAadharPhotoPath( response.assets[0].fileName)
//                 setAadharPhoto(response.data)
//                 setAadharPhotoURI(response.assets[0].uri)
//                 let bscode = fs.readFile(AadharPhotoURI);
//                 fs.readFile(AadharPhotoURI, 'base64')
//                     .then(res => convertToBase64(res, 3));
//             }
//         });
//     }

  const  onToDateChange = (date) => {
        // this.setState({
        //     DLIssueDate: moment(date).format('YYYYMMDD'),
        //     isOpenCalender: false,
        //     isLoading: false
        // });
        setDLIssueDate(moment(date).format('YYYYMMDD'))
        setisOpenCalender(false)
        setisLoading(false)
    }
  const  onToDateChange2 = (date) => {
        // this.setState({
        //     DLHeavyDate: moment(date).format('YYYYMMDD'),
        //     isOpenCalender2: false,
        //     isLoading: false
        // });
        setDLHeavyDate(moment(date).format('YYYYMMDD'))
        setisOpenCalender2(false)
        setisLoading(false)
    }
   const onToDateChange3 = (date) => {
        // this.setState({
        //     DLExpiryDate: moment(date).format('YYYYMMDD'),
        //     isOpenCalender3: false,
        //     isLoading: false
        // });
        setDLExpiryDate(moment(date).format('YYYYMMDD'))
       setisOpenCalender3(false)
       setisLoading(false)
    }
 const   onToDateChange4 = (date) => {
        // this.setState({
        //     DOB: moment(date).format('YYYYMMDD'),
        //     isOpenCalender4: false,
        //     isLoading: false
        // });
        setDOB(moment(date).format('YYYYMMDD'))
        setisOpenCalender4(false)
        setisLoading(false)
    }
   const SaveDriver = async() => {
        setisDisabled(true)
        setisLoading(true)
        const token = await AsyncStorage.getItem('AUTH');
        let body = {
            DriverName: DName.trim(),
            DriverAddress:DAddress.trim(),
            DLNumber: DLNumber.trim(),
            Religion: Religion.trim(),
            DLIssueDate: moment(DLIssueDate).format('YYYYMMDD'),
            DLHeavyDate: moment(DLHeavyDate).format('YYYYMMDD'),
            DLExpiryDate: moment(DLExpiryDate).format('YYYYMMDD'),
            DOB: moment(DOB).format('YYYYMMDD'),
            DriverAadharNumber: AadharNo.trim(),
            Guarantor: Guarantor.trim(),
            BloodGroup: BloodGroup.trim(),
            Remark:Remark.trim(),
            MobileNumber:MobileNo.trim(),
            DriverPhoto: fileData,
            DLPhoto: fileData2,
             DLBackPhoto: fileData4,
            DriverAadharPhoto: fileData3,
             DriverBackAadharPhoto: fileData5,
        }
        fetch(baseUrl + "/api/ApiDriver/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                "platform": "Android",
            },
            body: JSON.stringify(body),
            redirect: 'follow'
        }).then(response => response.text())
            .then(responseText => {
                // this.setState({ isLoading: false });
                setisLoading(false)
                try {
                    var respObject = JSON.parse(responseText);
                    console.log(respObject,"objectresponse")
                    if (respObject.Message == "Saved Successfully.") {
                        alert(respObject.Message);
                        navigation.navigate('DriverList');
                    } else {
                        alert(respObject.Message);
                        //global.navigation.goBack();
                    }

                } catch (error) {
                    alert("1.There is some problem. Please try again");
                }
            })
            .catch(error => {
                // this.setState({ isLoading: false });
                setisLoading(false)
                alert("2.There is some problem. Please try again");
            });
    }
    // render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                 {cameraPermission1 && 
                   <View style={styles.camcontainer}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1'}
            />
             </View>
         <View>
          <TouchableOpacity onPress={takePicture1} style={styles.capturebtn}>
            <Text style={{textAlign:"center"}}>Take Picture</Text>
          </TouchableOpacity>
         </View>  
     
        </View> }
        {imageUri && <View style={styles.camcontainer}>
            <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={submitImage1} style={styles.capturebtn} >
            <Text style={{textAlign:"center"}}>Submit</Text>
          </TouchableOpacity>
                </View>} 
                
        {cameraPermission2 &&
        <View>
            <View style={styles.camcontainer}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1'}
            />
          
          </View>
          <TouchableOpacity onPress={takePicture2} style={styles.capturebtn}>
            <Text style={{textAlign:"center"}}>Take Picture</Text>
          </TouchableOpacity>
        </View>
        </View>}
        {imageUri2 && <View style={styles.camcontainer} >
            <Image source={{ uri: imageUri2 }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={submitImage2} style={styles.capturebtn}>
                <Text style={{textAlign:"center"}}>Submit</Text>
          </TouchableOpacity>
           </View> }
           {cameraPermission3 &&
        <View>
            <View style={styles.camcontainer}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1'}
            />
          
          </View>
          <TouchableOpacity onPress={takePicture3} style={styles.capturebtn}>
            <Text style={{textAlign:"center"}}>Take Picture</Text>
          </TouchableOpacity>
        </View>
        </View>}
        {imageUri3 && <View style={styles.camcontainer} >
            <Image source={{ uri: imageUri3 }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={submitImage3} style={styles.capturebtn}>
                <Text style={{textAlign:"center"}}>Submit</Text>
          </TouchableOpacity>
           </View> }



 {cameraPermission5 &&
        <View>
            <View style={styles.camcontainer}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1'}
            />
          
          </View>
          <TouchableOpacity onPress={takePicture5} style={styles.capturebtn}>
            <Text style={{textAlign:"center"}}>Take Picture</Text>
          </TouchableOpacity>
        </View>
        </View>}
        {imageUri5 && <View style={styles.camcontainer} >
            <Image source={{ uri: imageUri5 }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={submitImage5} style={styles.capturebtn}>
                <Text style={{textAlign:"center"}}>Submit</Text>
          </TouchableOpacity>
           </View> }


{cameraPermission4 &&
        <View>
            <View style={styles.camcontainer}>
          <View style={styles.cameraContainer}>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1'}
            />
          
          </View>
          <TouchableOpacity onPress={takePicture4} style={styles.capturebtn}>
            <Text style={{textAlign:"center"}}>Take Picture</Text>
          </TouchableOpacity>
        </View>
        </View>}
        {imageUri4 && <View style={styles.camcontainer} >
            <Image source={{ uri: imageUri4 }} style={{ flex: 1 }} />
            <TouchableOpacity onPress={submitImage4} style={styles.capturebtn}>
                <Text style={{textAlign:"center"}}>Submit</Text>
          </TouchableOpacity>
           </View> }


                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                        <Header showBack={true} title={"GNR"} rightIcon={logout} />
                        <Text style={{ color: "#b22222", alignSelf: "center", marginTop: 10, fontSize: 20, textDecorationLine: 'underline' }}>Fill Driver Details</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Driver Name</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(dname) => { setDName(dname) }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Driver Address</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(dadrs) => { setDAddress(dadrs)}} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.btnParentSection, { flex: 1 }]}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseDriverImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Driver Photo</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.btnParentSection, { flex: 1 }]}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseDLImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>DL Photo</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.btnParentSection, { flex: 1 }]}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseDLBackImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>DL Back Photo</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>DL Number</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(num) => { setDLNumber(num) }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>DL Issue Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(DLIssueDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>DL Heavy Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender2(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(DLHeavyDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Religion</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(rel) => { setReligion(rel) }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>DL Expiry Date</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender3(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(DLExpiryDate).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Date of Birth</Text>
                                <TouchableOpacity onPress={() => setisOpenCalender4(true)}>
                                    <Text style={[styles.TextInputStyle]} >{moment(DOB).format('DD MMM YYYY')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 2 }}>
                                <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Aadhar No.</Text>
                                <TextInput style={[styles.TextInputStyle]} keyboardType="numeric" onChangeText={(aadhar) => { setAadharNo(aadhar)}} />
                            </View>
                            {/* <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseAadharImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Aadhar Photo</Text>
                                </TouchableOpacity>
                            </View>
                              <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseAadharImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Aadhar Photo</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>

                         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseAadharImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Aadhar Photo</Text>
                                </TouchableOpacity>
                            </View>
                              <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity style={styles.btnText} onPress={chooseAadharBackImage} >
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Aadhar Back Photo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Guarantor</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(num) => { setGuarantor(num) }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Blood Group</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(num) => { setBloodGroup(num) }} />
                        </View>


<View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Mobile No.</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(num) => { setMobileNo(num) }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#000", textAlign: 'left', marginLeft: 15 }}>Remark</Text>
                            <TextInput style={[styles.TextInputStyle]} onChangeText={(num) => { setRemark(num) }} />
                        </View>



                        <View style={{ flexDirection: 'row', marginTop: 20, marginStart: 10 }}>

                            <TouchableOpacity style={{ width: '90%', borderRadius: 10, borderWidth: 1, borderColor: "#009A22", backgroundColor: "#009A22", height: 40, marginStart: 15, alignSelf: 'center', justifyContent: 'center' }} disabled={isDisabled} onPress={() => SaveDriver()}>
                                <Text style={{ color: "#ffffff", alignSelf: "center" }}>     Save    Driver </Text>
                            </TouchableOpacity>
                        </View>
                        <CalendarPopUp isOpenToCalender={isOpenCalender} heading="Select DL Issue Date" onToDateChange={onToDateChange} selectedDate={DLIssueDate} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender2} heading="Select DL Heavy Date" onToDateChange={onToDateChange2} selectedDate={DLHeavyDate} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender3} heading="Select DL Expiry Date" onToDateChange={onToDateChange3} selectedDate={DLExpiryDate} />
                        <CalendarPopUp isOpenToCalender={isOpenCalender4} heading="Select Date of Birth" onToDateChange={onToDateChange4} selectedDate={DOB} />
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
// }
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
    images: {
        marginTop: 10,
        width: 200,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
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

export default AddDriver;
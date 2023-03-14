import React from 'react';
import { ActivityIndicator, PermissionsAndroid, FlatList, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView, SafeAreaView, Modal, PixelRatio } from 'react-native';
// import RNFetchBlob from "rn-fetch-blob";
import Header from './Header';
import logout from '../assets/logout.png';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import BookingList from './BookingList';
import {baseUrl} from "../package.json";
import {manipulateAsync,FlipType,SaveFormat} from "expo-image-manipulator";
const fontFactor = PixelRatio.getFontScale();


const BookingDetail=({route,navigation})=>{
    const [isDisabled,setIsdisabled]=React.useState(false);
    const [isOpenToCalender,setIsOpenToCalender]=React.useState(false)
    const [isOpenFromCalender,setIsOpenFromCalender]=React.useState(false)
    const [isLoading,setIsLoading]=React.useState(false)
    const [isUpdate,setIsUpdate]=React.useState(false)
    const [Mode,setMode]=React.useState(global.Mode)
    const [LedgerList,setLedgerList]=React.useState("")
    const [selectedLedger,setselectedLedger]=React.useState("")
    const [book,setbook]=React.useState(route.params.BookingDetail)
    const [bookId,setbookId]=React.useState(route.params.BookingDetail.BookingId)
    const [openModel,setopenModel]=React.useState(false)
    const [unloadWeight,setunloadWeight]=React.useState(route.params.BookingDetail.UnloadingWeight.toString())

    const [advance,setadvance]=React.useState(route.params.BookingDetail.Advance)
    const [diesel,setdiesel]=React.useState(route.params.BookingDetail.Diesel)
    const [isAdvance,setisAdvance]=React.useState(false)
    const [isDiesel,setisDiesel]=React.useState(false)
    const [filePath,setfilePath]=React.useState("")
    const [filePath2,setfilePath2]=React.useState("")
    const [fileData,setfileData]=React.useState("")
    const [fileData2,setfileData2]=React.useState("")
    const [fileUri,setfileUri]=React.useState("")
    const [fileUri2,setfileUri2]=React.useState("")
    const [imageUri,setImageUri]=React.useState(null);
    const [imageUri2,setImageUri2]=React.useState(null);
    const [cameraPermission, setCameraPermission] = React.useState(null);
    const [cameraPermission1, setCameraPermission1] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);
    const [camera, setCamera] = React.useState(null);

    
    // const [baseUrl,setBaseUrl]=React.useState("http://GNR.marwariplus.com")
    // const [baseUrl,setBaseUrl]=React.useState("http://192.168.1.181")

//  const   convertToBase64 = (file) => {
//         // this.setState({ fileData: file });
//         setfileData(file)
//         //console.log("1=======", this.state.fileData);
//     };
//  const   convertTo2Base64 = (file) => {
//         // this.setState({ fileData2: file });
//         setfileData2(file)
//         //console.log("1=======", this.state.fileData2);
//     };
    
//  const   chooseImage = () => {
//         launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.assets[0].uri };
//                 // this.setState({
//                 //     filePath: response.assets[0].fileName,
//                 //     fileData: response.data,
//                 //     fileUri: response.assets[0].uri
//                 // });
//                 setfilePath(response.assets[0].fileName)
//                 setfileData(response.data)
//                 setfileUri(response.assets[0].uri)
//                 let bscode = fs.readFile(fileUri);
//                 fs.readFile(fileUri, 'base64')
//                     .then(res => convertToBase64(res));
//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//             }
//         });
//     }
// const    chooseImage2 = () => {
//         launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.assets[0].uri };
//                 // this.setState({
//                 //     filePath2: response.assets[0].fileName,
//                 //     fileData2: response.data,
//                 //     fileUri2: response.assets[0].uri
//                 // });
//                 setfilePath2(response.assets[0].fileName)
//                 setfileData2(response.data)
//                 setfileUri2(response.assets[0].uri)
//                 let bscode = fs.readFile(fileUri2);
//                 fs.readFile(fileUri2, 'base64')
//                     .then(res => convertTo2Base64(res));
//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//             }
//         });
//     }
       
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
        console.log("imageString",strImage)
        setfileData(strImage)
        // console.log(strImage,"filedata")
    //   console.log(`${fileData} FrontPhoto`)
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
        setfileData2(strImage)
        // console.log(`${dataUrl} PhotoinvoiceDataUrl`)
      
    // setImageUri2(dataUrl)
    })
};

// console.log("filedata",fileData)
// console.log("filedata2",fileData2)
  const  chooseImage = async() => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    console.log(cameraPermission.status ==="granted","chooseimage1")
        setCameraPermission(cameraPermission.status ==="granted");
        // const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        // console.log(imagePermission.status);
        // setGalleryPermission(imagePermission.status === 'granted');
        if (
        //   imagePermission.status !== 'granted' &&
          cameraPermission.status !== 'granted'
        ) {
          alert('Permission for media access needed.');
        }
}

const takePicture1 = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
    //   console.log("maipulate",manipResult)
      setImageUri(manipResult.uri);
      setCameraPermission(null)
    }
  };

  const submitImage1=async()=>{
        convertToBase64()
        setImageUri(null)
  }

    const chooseImage2 = async () => {
        // here is how you can get the camera permission
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        console.log(cameraPermission.status ==="granted","chooseimage2")
        setCameraPermission1(cameraPermission.status ==="granted");
        // const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        // console.log(imagePermission.status);
        // setGalleryPermission(imagePermission.status === 'granted');
        if (
        //   imagePermission.status !== 'granted' &&
          cameraPermission.status !== 'granted'
        ) {
          alert('Permission for media access needed.');
        }
      };

      const takePicture2 = async () => {
        if (camera) {
          const data = await camera.takePictureAsync(null);
          const manipResult= await manipulateAsync(data.uri,[],{compress:0.2});
          setImageUri2(manipResult.uri);
          setCameraPermission1(null)
        }
      };
    
      const submitImage2=async()=>{
        convertTo2Base64()
        setImageUri2(null)
      }
      console.log("bookid",bookId)
// console.log("token",token)
 const   RecordsSave = async() => {
         setIsdisabled(true)
        book.UnloadingWeight = unloadWeight;
        book.UploadFileBase64 = fileData;
        book.UploadFile2Base64 = fileData2;
        book.Advance = advance;
        book.Diesel = diesel;

        //console.log(global.url + "/api/ApiBooking/"+this.state.bookId);
        //console.log(global.token);
        console.log("Data=========", JSON.stringify(book));
        const  token = await AsyncStorage.getItem('AUTH');
     await fetch(baseUrl+ "/api/ApiBooking/" + bookId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Auth": token,
                "platform": "Android",
            },
            body: JSON.stringify(book),
            redirect: 'follow'
        }).then(response => response.text())
            .then(responseText => {
                // this.setState({ isLoading: false });
                setIsLoading(false)
                try {
                    //console.log(responseText);
                    var respObject = JSON.parse(responseText);
                    if (respObject.Message == "Saved Successfully.") {
                        alert(respObject.Message);
                      navigation.navigate('SearchVehicle');
                    }
                     else {
                        alert(respObject.Message);
                        console.log("ErrorMessage",respObject.Message)
                        //global.navigation.goBack();
                    }

                } catch (error) {
                    alert("1.There is some problem. Please try again");
                }
            })
            .catch(error => {
                // this.setState({ isLoading: false });
                setIsLoading(false)
                alert("2.There is some problem. Please try again");
            });
    }
    // render() {
        // in line 270 openModeModel={openModeModel}
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                 {cameraPermission && 
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
                
        {cameraPermission1 &&
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
       
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
                        <Header showBack={true} title={"Booking Detail"} rightIcon={logout}  />  
                        <Text style={[styles.HeadText, { fontSize: 20 / fontFactor, fontWeight: 'bold', color: '#000000', marginTop: 20, marginStart: 20 }]}>{'Details of Vehicle No: ' + book.VehicleNo}</Text>
                        <View>
                            <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>Date :</Text>
                                {moment(book.Date.toString()).format("DD-MMM-YYYY")}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.TextStyle}>
                                    <Text style={{ fontWeight: 'bold' }}>Item Name :</Text> <Text>{book.ItemName}</Text></Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>GR NUmber :</Text>
                                    {book.GRNumber}</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 1, marginTop: 10 }}>
                            <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>From Station: </Text>
                                {book.FromStationName}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, marginTop: 10 }}>
                            <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>To Station: </Text>
                                {book.ToStationName}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>Loading Weight : </Text>
                                    {book.LoadingWeight}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>Unloading Weight : </Text>
                                    {book.UnloadingWeight}</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>Diesel : </Text>
                                    {book.Diesel + book.Diesel2}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>Advance : </Text>
                                    {book.Advance + book.Advance2}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.TextStyle}><Text style={{ fontWeight: 'bold' }}>DEF : </Text>
                                {book.Def + book.Def2}</Text>
                        </View>

                        <View>
                            {book.UnloadingWeight == 0 &&
                                <TouchableOpacity style={styles.btnText} onPress={() =>setIsUpdate(true)}>
                                    <Text style={{ color: "#ffffff", alignSelf: "center" }}>Update</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View>
                            {isUpdate &&
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
                                        <TextInput style={[styles.TextInputStyle]} value={unloadWeight} keyboardType="numeric" onChangeText={(wt) => {setunloadWeight(wt)}} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, alignItems: 'center', marginRight: 10 }}>
                                            {fileUri != '' &&
                                                <Image source={{ uri: fileUri }} style={styles.images} />
                                            }
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', marginLeft: 10 }}>
                                            {fileUri2 != '' &&
                                                <Image source={{ uri: fileUri2 }} style={styles.images} />
                                            }
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={[styles.btnParentSection, { flex: 1 }]}>
                                            <TouchableOpacity style={styles.btnText} onPress={chooseImage} >
                                                <Text style={{ color: "#ffffff", alignSelf: "center" }}>Photo Front</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.btnParentSection, { flex: 1 }]}>
                                            <TouchableOpacity style={styles.btnText} onPress={chooseImage2} >
                                                <Text style={{ color: "#ffffff", alignSelf: "center" }}>Photo Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View>
                                        <TouchableOpacity style={[styles.btnText, { width: '90%' }]} onPress={RecordsSave} disabled={isDisabled}>
                                            <Text style={{ color: "#ffffff", alignSelf: "center" }}>Save Record</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </View>
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

export default BookingDetail


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
    TextStyle: {
        fontSize: 13 / fontFactor,
        //fontWeight: 'bold',
        color: '#000000',
        marginLeft: 10,
        marginTop: 5
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
    HeadText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
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
    borderColor:"#009A22",
    height:50,
    alignItems:"center",
    textAlign:"center",
}     
});
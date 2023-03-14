import React,{useEffect,useRef} from 'react';
import {StyleSheet, Modal,View,Text,FlatList,TextInput,Image,TouchableOpacity,PixelRatio} from 'react-native';
import filter from 'lodash.filter';
import BackImg from '../assets/back.png';
import SearchImg from '../assets/search.png';
const fontFactor = PixelRatio.getFontScale();


const ListModel=({PartyList,openPartyModel,onCancel,heading,onPartySelection})=>{


// console.log(PartyList)
// export default class ListModel extends React.Component {
//     constructor(props){
//         super(props);
//         this.fullData = this.props.PartyList
//         this.state = {
//             partyList:this.props.PartyList
//         }
//     }


var fullData=PartyList;

const [partyList,setpartyList]=React.useState([])




// function usePrevious(value) {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   }


//   const listUpdate = (props) => {
//     const {receiveAmount, sendAmount } = props
//     const prevAmount = usePrevious({receiveAmount, sendAmount});
//     useEffect(() => {
//         if(prevAmount.PartyList !== partyList) {
//             fullData = PartyList;
//            setpartyList(PartyList)
//          // process here
//         }
//     }, [receiveAmount])
// }

// const {receiveAmount } = props
// const prevAmount = usePrevious({receiveAmount});
// console.log("partylist",partyList)

  const    contains = (Ledger, query) => {
        if (Ledger.label && Ledger.label.toLowerCase().includes(query)) {
            return true
        }
        return false
    }

    const   filterLeder = (text) => {
        const formattedQuery = text.toLowerCase()
        const data = filter(fullData, Ledger => {
            return contains(Ledger, formattedQuery);
        })
        // this.setState({ partyList: data });
        setpartyList(data)
    }

// console.log("partylist",partyList)

const listUpdate=()=>{
    if(PartyList!==partyList){
        fullData = PartyList;
       setpartyList(PartyList)
    }
}

// setpartyList(PartyList)
    useEffect(() =>{
     listUpdate()
    }, [PartyList])



    // componentDidUpdate(prevProps) {
    //     if(prevProps.PartyList!=this.props.PartyList){
    //         this.fullData = this.props.PartyList;
    //         this.setState({partyList:this.props.PartyList});
    //     } 
           
    //    //alert(JSON.stringify(this.props));
    //   }
    //   componentDidMount() {
    //     // console.log(this.props.PartyList);
    // }
    // render() {
        return (
            <Modal
            onRequestClose={()=>{onCancel()}}
                animationType="slide"
                transparent={true}
                visible={openPartyModel}>
                <View style={{flex:1, backgroundColor: "#000000ee", alignItems: 'baseline', justifyContent: 'flex-end' }}>
                    <View style={{flex:1, width:'100%', backgroundColor: "#ffffff", paddingTop: 10, paddingBottom: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <TouchableOpacity onPress={() => { onCancel() }}>
                                  <Image style={{ width: 25, height: 25, marginRight: 0, resizeMode: 'contain', tintColor: "#000000", marginLeft: 10 }} source={BackImg}></Image>
                            </TouchableOpacity>
                             <Text style={{fontSize: 20, fontWeight: 'bold', color: "#434343", margin: 15 }}>{heading}</Text>
                        </View>
                        <View style={{ backgroundColor: "#434343", height: 1, marginBottom: 10 }}></View>
                        <View style={{ flexDirection: "row", borderWidth: 0.5, borderColor: "#333333", alignItems: 'center'}}>
                            <TextInput style={{ height: 40, padding: 10, flex: 1,color:'#000000' }} placeholder="Search..." placeholderTextColor="#333333" onChangeText={(text) => filterLeder(text)}></TextInput>
                            <Image style={{ width: 25, height: 25, marginRight: 0, tintColor: "#000000", marginRight: 10 }} source={SearchImg}></Image>
                        </View>
                        <FlatList
                            data={partyList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                          
                            <TouchableOpacity onPress={() => {onPartySelection(item)}}>
                                <View style={{ paddingTop:10,paddingBottom:10,width: '100%', backgroundColor: index % 2 == 0 ? "#ffffff" : "#99D9EA", flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 11/fontFactor, flex:1 ,color:"#000000"}}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

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
});

export default ListModel;
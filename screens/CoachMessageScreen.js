import { View, Text, Platform, KeyboardAvoidingView, FlatList, Image, ActivityIndicator, TextInput, TouchableOpacity, Dimensions, Modal } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import ref_public from '../services/ref_public'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { getCoachMessages, saveCoachMessage } from '../services/message'
import { chart_graph } from '../constants/data'

const fullWidth = Dimensions.get('window').width
const PRIMARY_COLOR = "#1C8FCF"

function CoachMessageScreen(props) {
    const [listeMessage, setListeMessage] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [msgBody, setMsgBody] = useState('')
    const msgRef = useRef(null)
    const { coach } = props.navigation.state.params 
    const user = props.userConnected.userConnected

    function init() {
        if(spinner === false) setSpinner(true)

        console.log(user.id);
        console.log(coach.id);
        getCoachMessages(user.id, coach.id, user.token)
        .finally(() => setSpinner(false))
        .then(data => {
            setMsgBody('')
            setListeMessage(data)
        })
    }

    useEffect(() => {
        console.log('GNANNI');
        init()
    },[])

    function onSendMessageTextPressed() {
        if(msgBody !== '') {
            setSpinner(true)
            saveCoachMessage(user.id, msgBody, coach.id, 'user', user.token)
            .finally(init)
            .then((data) => console.log(data))
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: 'rgb(240, 237, 237)'}}>
            <View style={{position: 'absolute', zIndex: 1, top: 0, width: '100%', paddingHorizontal: 5, paddingVertical: 10, paddingTop: Platform.OS == 'ios' ? 40 : undefined, backgroundColor: chart_graph.first, flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign onPress={() => props.navigation.goBack()} style={{marginHorizontal: 10}} name="arrowleft" size={20} color="#fff" />
                <Image  source={{uri: ref + coach.lien_profil}} style={{width: 40, height: 40, borderRadius: 10, resizeMode: 'cover'}} />
                <View style={{marginLeft: 15, flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, color: '#fff', fontWeight: '500'}}> {coach.nom} {coach.prenom} </Text>
                    <Text style={{fontSize: 13, color: '#fff', fontWeight: '800'}}> {coach.specialite} </Text>
                </View>

                <SimpleLineIcons style={{marginHorizontal: 10, position: 'absolute', zIndex: 1, right: 10}} name="options-vertical" size={17} color="#fff" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex:1, paddingTop: 60, paddingBottom: 75}}
            >
                <FlatList
                    data={listeMessage}
                    keyExtractor={(item, index) => index}
                    ref={msgRef}
                    onContentSizeChange={()=> msgRef.current.scrollToEnd()}
                    renderItem={({item, index}) => <MessageItem message={item} user_id ={user.id} />}
                    contentContainerStyle={{ paddingTop: Platform.OS == 'ios' ? 30 : undefined, paddingBottom:  Platform.OS == 'ios' ? 50 : undefined }}
                />

                <View style={{position: 'absolute', backgroundColor: 'rgb(240, 237, 237)', bottom: 0, paddingBottom: 25, paddingTop: 5, flexDirection: 'row', alignItems: 'center', width: fullWidth}}>
                    <TextInput placeholder='Tapez un message...' multiline={true} style={{paddingHorizontal: 15, maxWidth: fullWidth - 60, color: '#222', fontSize: 15}} value={msgBody} onChangeText={msg => setMsgBody(msg)} />
                    <Ionicons onPress={() => onSendMessageTextPressed()} style={{position: 'absolute', right: 15, padding: 8}} name="send" size={20} color={chart_graph.first} />
                </View>

            </KeyboardAvoidingView>
            <Modal visible={spinner} transparent={true}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .3)'}}>
                    <ActivityIndicator size="small" color="#fff" />
                </View>
            </Modal>
        </View>
    )
}


const MessageItem = props => {
    const {message, user_id} = props

    return(
        <View style={[{width: fullWidth, marginVertical: 2, position: 'relative', flexDirection: 'row'}, message.type_author === 'user'? {justifyContent: 'flex-end'}: {justifyContent: 'flex-start'}]}>
            <TouchableOpacity style={{ maxWidth: fullWidth * .7, margin: 15, padding: 15, borderRadius: 10, backgroundColor: message.type_author === 'user' ? chart_graph.first: "rgb(250, 250, 250)", elevation: 7}}>
                <Text style={{color: message.type_author === 'user'? '#fff': '#323232', fontSize: 15}}> {message.contenu} </Text>
                <Text style={{color: message.type_author === 'user'? '#fff': '#727272', fontSize: 12, textAlign: 'right', marginTop: 7}}> {message.created_at} </Text>
            </TouchableOpacity>
        </View>
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
  }
  
  export default connect(mapStateToProps)(CoachMessageScreen)
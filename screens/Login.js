import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Image, Platform, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { login } from '../services/user'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux'
import { chart_graph } from '../constants/data';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'

function Login(props) {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [userFound, setUserFound] = useState({})
    const [chooseDestinationVisibility, setChooseDestinationVisibility] = useState(false)
    const [lottieVisible, setLottieVisible] = useState(false)
    const [lottieBody, setLottieBody] = useState(null)
    const animation = useRef()


    function onLoginPress() {
        setChooseDestinationVisibility(false)
        if(email !== '' && pwd !== '') {
            setSpinner(true)
            login(email, pwd)
            .then(data => {
                setSpinner(false) 
                // console.log({ data });
                if(data !== undefined && data !== false && data !== "Erreur" && data.id !== undefined) {
                    const action = {type: "AJOUTER", value: data}
                    props.dispatch(action)
                    setUserFound(data)
                    setEmail('')
                    setPwd('')
                    setChooseDestinationVisibility(true)
                }else {
                    Toast.show({
                        type: 'error',
                        text1: 'Authentification échouée',
                      });
                }
            })
        } else {
            Toast.show({
                type: 'error',
                text1: 'Champs vides !',
              });
        }   
    }

    function onChooseDestionation(destination) {
        setChooseDestinationVisibility(false)
        if(destination === 'CoachHomeScreen') {
            setLottieBody('CoachHomeScreen')
        }else {
            setLottieBody('MeetHomeScreen')
        }
        setLottieVisible(true)

        setTimeout(() => {
            //Faire la navigation
            setLottieVisible(false)
            if(destination === 'CoachHomeScreen') {
                // console.log('*****************************');
                // console.log(userFound);
                props.navigation.navigate('CoachDrawer', {user: userFound})
            }else if (destination !== '') {
                props.navigation.navigate('AmourDrawer', {user: userFound})
            }
        }, 3500)

    }

    // useEffect(() => {
    //     setEmail('micayokpon@gmail.com')
    //     setPwd('test')
    // }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS=='ios'?'padding':'height'} style={{ flex: 1 }}>
            {Platform.OS=='ios' && (
                <Pressable
                    onPress={()=>props.navigation.goBack()}
                    style={{ position: 'absolute', top: Platform.OS == 'ios'? 45 : 12, left: 10, padding: 5, zIndex: 5 }}
                >
                    <AntDesign name='arrowleft' size={25} color='black' />
                </Pressable>
            )}

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/logo.png')} style={{height: 90, marginTop: 0, width: 90, resizeMode: 'contain'}} />

            <Text style={{fontSize: 18, fontWeight: '600', fontFamily: Platform.OS=='android'?'Roboto':undefined, marginBottom: 30, color: chart_graph.first}}>Ebenely</Text>
            
            <TextInput keyboardType='email-address' style={{padding: 10, borderRadius: 10, width: '90%', marginVertical: 10, borderWidth: 1, borderColor: '#999'}} placeholder='Email' value={email} onChangeText={text => setEmail(text)} />
            <TextInput secureTextEntry={true} style={{padding: 10, borderRadius: 10, width: '90%', marginVertical: 10, borderWidth: 1, borderColor: '#999'}} placeholder='Mot de passe' value={pwd} onChangeText={text => setPwd(text)} />

            <TouchableOpacity onPress={onLoginPress} style={{backgroundColor: chart_graph.first, padding: 15, borderRadius: 10, width: '90%', marginVertical: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#fff'}}>Connexion</Text>
            </TouchableOpacity>

            <Modal visible={spinner} transparent={true}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(50, 50, 50, .5)'}}>
                    <ActivityIndicator color='#fff' size='small' />
                </View>
            </Modal>

            <Modal visible={chooseDestinationVisibility} onRequestClose={() => setChooseDestinationVisibility(false)} transparent={false}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, fontWeight: '700', fontFamily: Platform.OS=='android'?'Roboto':undefined, color: '#202020', marginBottom: 40}}>Que voulez-vous faire aujord'hui ?</Text>

                    <TouchableOpacity onPress={() => onChooseDestionation('CoachHomeScreen')} style={{padding: 15, marginVertical: 15, minHeight: 100, backgroundColor: 'rgba(240, 240, 240, 1)', borderWidth: 1, borderColor: '#ddd', borderRadius: 5, elevation: 10, width: '90%', flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../assets/idea.png')} style={{width: 100, height: 100, marginRight: 10, resizeMode: 'contain'}} />
                        <Text style={{fontSize: 15, fontWeight: '600'}}>Consulter un coach</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onChooseDestionation('MeetHomeScreen')} style={{padding: 15, marginVertical: 15, minHeight: 130, backgroundColor: 'rgba(240, 240, 240, 1)', borderWidth: 1, borderColor: '#ddd', borderRadius: 5, elevation: 10, width: '90%', flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../assets/heart.png')} style={{width: 70, height: 70, marginRight: 35, resizeMode: 'contain'}} />
                        <Text style={{fontSize: 15, fontWeight: '600'}}>Faire des rencontres</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal onRequestClose={() => setLottieVisible(false)} visible={lottieVisible} transparent={false}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: lottieBody === 'CoachHomeScreen'? '#FFF0D9': '#fff' }}>
                    <LottieView
                        ref={animation}
                        style={{ width: '100%' }}
                        autoPlay
                        loop={true}
                        source={lottieBody === 'CoachHomeScreen'? require('../assets/lotties/idea.json'): require('../assets/lotties/heart_1.json')}/>

                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <ActivityIndicator size='small' color='#922' />
                    </View>
                </View>
            </Modal>
        </View>
        </KeyboardAvoidingView>
    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(Login)
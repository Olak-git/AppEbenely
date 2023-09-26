import React, {useState} from 'react'
import { Text, TouchableOpacity, View, ScrollView, Image, StyleSheet, Dimensions, DeviceEventEmitter, NativeEventEmitter } from 'react-native'
import { createAppContainer, NavigationEvents, StackActions, NavigationActions } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import AmourParams from '../screens/AmourParams'
import CoachDetailStack from './CoachDetailStack'
import CoachMessagesStack from './CoachMessagesStack'
import CoachTachesStack from './CoachTachesStack'
import About from '../screens/About'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import ref_public from '../services/ref_public'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { useEffect } from 'react'


const CoachDrawer = createDrawerNavigator({
    CoachDetailStack: {screen: CoachDetailStack, navigationOptions: { headerShown: false }},
    AmourParams: {screen: props => <AmourParams {...props} color="#1C8FCF" />, navigationOptions: { headerShown: false }},
    CoachMessagesStack: {screen: CoachMessagesStack, navigationOptions: { headerShown: false }},
    CoachTachesStack: {screen: CoachTachesStack, navigationOptions: { headerShown: false }},
    About: {screen: props => <About {...props} color='#1C8FCF' />, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'CoachDetailStack',
    drawWidth: 270,
    contentComponent: props => <CustomDrawer {...props} />,
})

export default createAppContainer(CoachDrawer)

const activeItemColor = '#c26'
const defaultItemColor = '#aaa'
const fullHeight = Dimensions.get('window').height

const CustomDrawer = (props) => {
    const user = props.navigation.state.params.user
    // console.log({ activeItemKey: props.activeItemKey })
    
    function onDeconnexion() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          props.navigation.dispatch(resetAction);
    }

    function navg(routeName, routeParams={}, deviceListenerType=undefined) {
        props.navigation.navigate(routeName, {...routeParams})
        if(deviceListenerType) {
            DeviceEventEmitter.emit(deviceListenerType)
        }
    }

    // useEffect(()=>{
    //     console.log({ keys: Object.keys(props) });
    //     console.log({ activeItemKey: props.activeItemKey });
    //     const lab = props.getLabel()
    //     console.log({ label: lab });
    // }, [props])
    
    return(
        <ScrollView>
            <View style={{ height: fullHeight * 0.35, backgroundColor: '#000', position: 'relative' }}>
                {
                    user !== undefined && user !== false && <Image style={{width: '100%', height: fullHeight * .35, opacity: .7, resizeMode: 'cover'}} source={{uri: ref + JSON.parse(user?.lien_img)}} />
                }
                <View style={{position: 'absolute', bottom: 10, left: 10,}}>
                    <Text style={{ color: '#fff', fontSize: 18 }}> {user?.nom} {user?.prenom} </Text>
                    <Text style={{ color: '#fff', fontSize: 13, marginVertical: 5, fontWeight: '600' }}> {user?.email} </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navg('CoachDetailStack')} style={props.activeItemKey === 'CoachDetailStack'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome5 style={{marginLeft: 5}} name="home" color={props.activeItemKey === 'CoachDetailStack'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'CoachDetailStack'? styles.activeLabelStyle: styles.label} >Accueil</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Accueil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navg('CoachMessagesStack', {}, 'load.coach.contactlist')} style={props.activeItemKey === 'CoachMessagesStack'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome style={{marginLeft: 5}} name="wechat" color={props.activeItemKey === 'CoachMessagesStack'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'CoachMessagesStack'? styles.activeLabelStyle: styles.label} >Messages</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Consultez vos discussions</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navg('CoachTachesStack')} style={props.activeItemKey === 'CoachTachesStack'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome5 style={{marginLeft: 5}} name="tasks" color={props.activeItemKey === 'CoachTachesStack'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'CoachTachesStack'? styles.activeLabelStyle: styles.label} >Taches</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Suivez vos tâches et activitées</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navg('AmourParams')} style={props.activeItemKey === 'AmourParams'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <Feather style={{marginLeft: 5}} name="settings" color={props.activeItemKey === 'AmourParams'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'AmourParams'? styles.activeLabelStyle: styles.label} >Paramètres</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Gérez vos paramètres</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navg('About')} style={props.activeItemKey === 'About'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome5 style={{marginLeft: 5}} name="info-circle" color={props.activeItemKey === 'About'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'About'? styles.activeLabelStyle: styles.label} >A propos</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Tous savoir à notre sujet</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDeconnexion()} style={styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <Entypo style={{marginLeft: 5}} name="log-out" color={"#a11"} size={20} />
                </View>
                <View>
                    <Text style={[styles.label, {color: '#a11'}]} >Déconnexion</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}></Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles=StyleSheet.create({
    container:{
        flex : 1
    },

    itemsTouch: { width: '100%', position: 'relative', paddingHorizontal: 5, paddingVertical: 12, alignItems: 'flex-start', flexDirection: 'row' },
    label: { fontSize: 15, marginLeft: 20, color: '#111'},
    activeItemStyle: {backgroundColor: 'rgb(240, 240, 240)', width: '100%', paddingHorizontal: 5, paddingVertical: 12, alignItems: 'flex-start', flexDirection: 'row', marginTop: 3},
    activeLabelStyle: {color: activeItemColor, fontSize: 15, marginLeft: 20},

    profileViewImage : {
        borderRadius : 3,
        borderColor : 'rgb(200,230, 255)',
        paddingLeft : 10, 
        paddingRight : 10,
        padding : 1,
        width : 200,
        height : 110
    },

    profile : {
        width : 100,
        height : 100,
        
    },

    name : {
        color : '#fff',
        fontSize : 21,
        fontWeight : 'bold',
        marginTop: 15, marginBottom: 4
    },

    etab : {
        color : '#fff',
        fontSize : 14,
        marginLeft: 4
    }
})



const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

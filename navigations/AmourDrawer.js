import React, {useState} from 'react'
import { Text, TouchableOpacity, View, ScrollView, Image, StyleSheet, Dimensions, DeviceEventEmitter } from 'react-native'
import { createAppContainer, NavigationEvents, StackActions, NavigationActions } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import AmourParams from '../screens/AmourParams'
import AmourHome from '../screens/AmourHome'
import AmourMessageStack from './AmourMessageStack'
import AmourReactions from '../screens/AmourReactions'
import About from '../screens/About'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import ref_public from '../services/ref_public'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const AmourDrawer = createDrawerNavigator({
    AmourHome: {screen: AmourHome, navigationOptions: { headerShown: false }},
    AmourParams: {screen: props => <AmourParams {...props} color='#FF0338'  />, navigationOptions: { headerShown: false }},
    AmourMessageStack: {screen: AmourMessageStack, navigationOptions: { headerShown: false }},
    AmourReactions: {screen: AmourReactions, navigationOptions: { headerShown: false }},
    About: {screen: props => <About {...props} color='#FF0338' />, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'AmourHome',
    drawWidth: 270,
    contentComponent: props => <CustomDrawer {...props} />

})

export default createAppContainer(AmourDrawer)

const activeItemColor = '#c26'
const defaultItemColor = '#aaa'
const fullHeight = Dimensions.get('window').height

const CustomDrawer = props => {
    const user = props.navigation.state.params.user
    // console.log(props.activeItemKey)
    
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
                <Image style={{width: '100%', height: fullHeight * .35, opacity: .7, resizeMode: 'cover'}} source={{uri: ref + JSON.parse(user?.lien_img)}} />
                <View style={{position: 'absolute', bottom: 10, left: 10,}}>
                    <Text style={{ color: '#fff', fontSize: 18 }}> {user?.nom} {user?.prenom} </Text>
                    <Text style={{ color: '#fff', fontSize: 13, marginVertical: 5, fontWeight: '600' }}> {user?.email} </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navg('AmourHome')} style={props.activeItemKey === 'AmourHome'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome5 style={{marginLeft: 5}} name="home" color={props.activeItemKey === 'AmourHome'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'AmourHome'? styles.activeLabelStyle: styles.label} >Accueil</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Accueil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navg('AmourMessageStack')} style={props.activeItemKey === 'AmourMessageStack'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome style={{marginLeft: 5}} name="wechat" color={props.activeItemKey === 'AmourMessageStack'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'AmourMessageStack'? styles.activeLabelStyle: styles.label} >Messages</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Consultez vos discussions</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navg('AmourReactions')} style={props.activeItemKey === 'AmourReactions'? styles.activeItemStyle: styles.itemsTouch} >
                <View style={{width: 30, marginRight: 5, justifyContent: 'center', alignItems: 'center'}} >
                    <FontAwesome5 style={{marginLeft: 5}} name="heart" color={props.activeItemKey === 'AmourReactions'? activeItemColor: defaultItemColor} size={20} />
                </View>
                <View>
                    <Text style={props.activeItemKey === 'AmourReactions'? styles.activeLabelStyle: styles.label} >Réactions</Text>
                    <Text style={{marginLeft: 20, fontSize: 12, marginTop: 5}}>Découvrez qui a réagit a votre profil</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navg('AmourParams', {init: 1})} style={props.activeItemKey === 'AmourParams'? styles.activeItemStyle: styles.itemsTouch} >
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

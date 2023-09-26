import { View, Text, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'

import Header from '../components/Header'

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height
const PRIMARY_COLOR = "#1C8FCF"


function About(props) {
    const year = new Date().getFullYear()
    console.log(props.color);
  return (
    <View style={{flex: 1}}>
        <Header action={() => props.navigation.goBack()} label="Version de l'application" icon="arrow-left" />
        
        <View style={{flex: 1, alignItems: 'center', paddingTop: 0}}>
            <Image source={require('../assets/logo.png')} style={{height: 300, marginTop: -30, width: fullWidth * .9, resizeMode: 'contain'}} />
            <Text style={{color: '#525252', fontWeight: '500', fontSize: 20, marginTop: 30, marginBottom: 10}}>Ebenely</Text>
            <Text>Version actuelle : 1.0.0</Text>

            <Text style={{position: 'absolute', bottom: 20, fontSize: 15}}> &copy; {year} AmaNou Tech </Text>
        </View>
    </View>
  )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
  }
  
  export default connect(mapStateToProps)(About)
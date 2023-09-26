import { View, Text, TouchableOpacity, StatusBar, Dimensions, Platform } from 'react-native'
import React, {useState, useEffect} from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { chart_graph } from '../constants/data'

const { width } = Dimensions.get('window')

export default function Header(props) {

  return (
    <View style={{width, backgroundColor: chart_graph.first, flexDirection: 'row', alignItems: 'center', padding: 7, paddingTop: Platform.OS == 'ios'?40:undefined}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={props.color ? props.color: chart_graph.second}
        />
        
        <FontAwesome5 style={{marginLeft: 5, padding: 7}} onPress={() => props.action()} name={props.icon} color='#fff' size={20} />
        <Text style={{color: '#fff', padding: 10, textAlign: 'center', fontSize: 16}}>{props.label}</Text>
    </View>
  )
}
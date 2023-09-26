import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Empty(props) {
    const { text } = props 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require("../assets/no_data.png")} style={{ height: 200, width: '70%'}} />
      <Text style={{ fontSize: 16, marginTop: 15 }}>{text}</Text>
    </View>
  )
}
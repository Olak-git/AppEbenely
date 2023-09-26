import { View, Text } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

function CoachTacheDetails(props) {
  return (
    <View>
      <Text>CoachTacheDetails</Text>
    </View>
  )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(CoachTacheDetails)
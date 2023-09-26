import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { deleteReaction, getReactions, updateReaction } from '../services/user'

const { width, height } = Dimensions.get('window')

function AmourReactions(props) {
    const [spinner, setSpinner] = useState(false)
    const [reactions, setReactions] = useState([])
    const user = props.userConnected.userConnected

    useEffect(() => {
      init()
    },[])

    function init() {
      setSpinner(true)
      getReactions(user.id, user.token)
      .then(data => {
        console.log(data);
        setSpinner(false)
        setReactions(data)
      })
    }

    function accepterMatch(reaction) {
      updateReaction(user.id, reaction.auth_id, 'match_demande', 'match_accepte', user.token)
      .then(data => {
        console.log(data);
        init()
      })
    }

    function deleteMatch(reaction) {
      deleteReaction(reaction.receveur_id, user.id, 'match_demande', user.token)
      .then(data => {
        console.log(data);
        init()
      })
    }

    return (
      <View style={{flex: 1}}>
          <Header action={() => props.navigation.openDrawer()} label='Réactions' color='#FF0338' icon="bars" />

          <FlatList
            data={reactions}
            refreshing={spinner}
            onRefresh={init}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => <ReactionItem reaction={item} deleteMatch={deleteMatch} accepterMatch={accepterMatch} />}
          />

      </View>
    )
}

const ReactionItem = props => {
  const { reaction, accepterMatch, deleteMatch } = props 

  return (
    <View style={{flexDirection: 'column', width: '100%', padding: 10, marginVertical: 15}} >
      <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
          <Image source={{uri: ref + JSON.parse(reaction.lien_img)}} style={{height: 70, width: 70, borderRadius: 35, resizeMode: 'cover'}} />
          <Text numberOfLines={2} style={{ fontSize: 15, maxWidth: width * .7, marginLeft: 10, color: '#323232'}}> {reaction.type === 'like'? `${reaction.pseudo} a liké votre profil`: (reaction.type === 'match_demande'? `${reaction.pseudo} vous a envoyé une demande de match`: reaction.type === 'match_accepte'? `Vous êtes en match avec ${reaction.pseudo}`: ``)} </Text>
      </View>
      {
        reaction.type === 'match_demande' && (
          <View style={{ paddingVertical: 15, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => deleteMatch(reaction)} style={{ paddingVertical: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(251, 251, 251)', width: '45%', paddingHorizontal: 30, borderRadius: 4 }}>
              <Text>Non</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => accepterMatch(reaction)} style={{ paddingVertical: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF2338', width: '45%', paddingHorizontal: 30, borderRadius: 4 }}>
              <Text style={{color: '#fff'}}>Oui</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  )
}

const mapStateToProps=(state)=>{
  return {
      userConnected: state.userConnected
  }
}

export default connect(mapStateToProps)(AmourReactions)
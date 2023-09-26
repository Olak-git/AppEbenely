import { View, Text, Dimensions, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList, Image, RefreshControl, DeviceEventEmitter } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../components/Header'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

import ref_public from '../services/ref_public'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { getAmourContacts } from '../services/user'
import Empty from '../components/Empty'


function AmourContactListe(props) {
    const [listeContacts, setListeContacts] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const user = props.userConnected.userConnected

    function getContacts() {
      // setSpinner(true)
      // console.log({ user: user.id, token: user.token });
      getAmourContacts(user.id, user.token)
      .finally(() => {
        setSpinner(false)
        setRefreshing(false)
      })
      .then(data => {
        // console.log(data);
        setListeContacts(data)
      })
    }

    function navigateToMessages(contact) {
      props.navigation.navigate('AmourMessageScreen', {contact})
    }

    const onRefresh = function () {
      setRefreshing(true)
    }

    const emit1 = DeviceEventEmitter.addListener('load.amour.contactliste', function () {
      console.log('load.amour.contactliste');
      getContacts()
    })

    useEffect(()=>{
      if(refreshing) getContacts()
    },[refreshing])

    useEffect(() => {
      getContacts()
      return ()=>{
        emit1.remove()
      }
    },[])

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Header action={() => props.navigation.openDrawer()} label='Profils' icon="bars" />

          <FlatList
            data={listeContacts} 
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={()=>{
              if(spinner) {
                return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <ActivityIndicator size='small' color='#922' />
                      </View>)
              } else {
                return (<Empty text="Vous n'avez aucun Contact" />)
              }
            }}
            refreshControl={
              <RefreshControl
                colors={['black']}
                refreshing={refreshing}
                onRefresh={onRefresh} 
              />
            }
            renderItem={({item, index}) => <ContactItem user={item} navigateToMessages={navigateToMessages} />}
            contentContainerStyle={{ flex: spinner || (spinner == false && listeContacts.length) ? 1 : undefined }}
          />
      </View>
    )
}



const ContactItem = props => {
  const { user, navigateToMessages } = props 
  
  return (
      <TouchableOpacity onPress={() => navigateToMessages(user)} style={{ flexDirection: 'row', marginTop: 15, padding: 15, width: '100%', alignItems: 'center' }}>
          <View style={{ width: '30%', height: 100 }}>
              <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{uri: ref + JSON.parse(user.lien_img)}} />
          </View>
          <View style={{borderBottomWidth: 1, height: 100, paddingLeft: 10, justifyContent: 'center', borderBottomColor: '#bbb', width: '70%'}}>
              <Text style={{fontWeight: '700', color: '#424242', fontSize: 18}}>{user.pseudo} </Text>
              <Text numberOfLines={1} style={{ marginTop: 6, fontSize: 15}}>{user.contenu !== null? user.contenu: '...'}</Text>
          </View>
      </TouchableOpacity>
  )
}


const mapStateToProps=(state)=>{
  return {
      userConnected: state.userConnected
  }
}

export default connect(mapStateToProps)(AmourContactListe)
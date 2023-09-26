import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, ActivityIndicator, DeviceEventEmitter } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllSelectedCoach } from '../services/coach'
import Header from '../components/Header'
import ref_public from '../services/ref_public'
import ref from '../services/ref'
import { connect } from 'react-redux'
import Empty from '../components/Empty'

function CoachContactListe(props) {
    const [listeCoach, setListeCoach] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const user = props.userConnected.userConnected

    function init() {
        // setSpinner(true)
        getAllSelectedCoach(user.id, user.token)
        .finally(() => {
            setSpinner(false)
            setRefreshing(false)
        })
        .then(data => {
            // console.log({ data });
            setListeCoach(data)
        })
    }

    function navigateToMessages(coach) {
        props.navigation.navigate('CoachMessageScreen', { coach })
    }

    const onRefresh = function () {
        setLoad(false)
        setRefreshing(true)
    }

    const emit1 = DeviceEventEmitter.addListener('load.coach.contactliste', function () {
        console.log('load.coach.contactliste');
        init()
    })
  
    useEffect(()=>{
        if(refreshing) init()
    },[refreshing])

    useEffect(() => {
        init()
        return ()=>{
            emit1.remove()
        }
    },[])

    return (
        <View style={{ flex: 1 }}>
            <Header action={() => props.navigation.openDrawer()} label='Messages' icon="bars" />

            <FlatList
                data={listeCoach} 
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
                renderItem={({item, index}) => <ContactItem coach={item} navigateToMessages={navigateToMessages} />}
                contentContainerStyle={{ flex: spinner || (spinner == false && listeCoach.length) ? 1 : undefined }}
            />
        </View>
    )
}

const ContactItem = props => {
    const { coach, navigateToMessages } = props 

    return (
        <TouchableOpacity onPress={() => navigateToMessages(coach)} style={{ flexDirection: 'row', marginTop: 15, padding: 15, width: '100%', alignItems: 'center' }}>
            <View style={{ width: '30%', height: 100 }}>
                <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{uri: ref_public + 'adminebenely/' + coach.default_img}} />
            </View>
            <View style={{borderBottomWidth: 1, height: 100, paddingLeft: 10, justifyContent: 'center', borderBottomColor: '#bbb', width: '70%'}}>
                <Text style={{fontWeight: '700', color: '#424242', fontSize: 18}}>{coach.nom} {coach.prenom} </Text>
                <Text numberOfLines={1} style={{ marginTop: 6, fontSize: 15}}>{coach.contenu !== null? coach.contenu: '...'}</Text>
            </View>
        </TouchableOpacity>
    )
}

const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected,
    }
  }
  
  export default connect(mapStateToProps)(CoachContactListe)
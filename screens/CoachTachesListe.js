import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, RefreshControl, DeviceEventEmitter } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { getTaches } from '../services/tache'
import Empty from '../components/Empty'

function CoachTachesListe(props) {
    const [listeTaches, setListeTaches] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const user = props.userConnected.userConnected

    function init() {
        getTaches(user.id, user.token)
        .finally(() => {
            setSpinner(false)
            setRefreshing(false)
        })
        .then(setListeTaches)
    }

    const onRefresh = function () {
        setRefreshing(true)
    }

    const emit1 = DeviceEventEmitter.addListener('load.coach.tachesliste', function () {
        console.log('load.coach.tachesliste');
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
        <View style={{flex: 1}}>
            <Header action={() => props.navigation.openDrawer()} label='Taches' icon="bars" />
            <FlatList
                data={listeTaches} 
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={()=>{
                if(spinner) {
                    return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size='small' color='#922' />
                            </View>)
                } else {
                    return (<Empty text="Aucun coach disponible." />)
                }
                }}
                refreshControl={
                    <RefreshControl
                        colors={['black']}
                        refreshing={refreshing}
                        onRefresh={onRefresh} 
                    />
                }
                renderItem={({item, index}) => <TacheItem coach={item} />}
                contentContainerStyle={{ flex: spinner || (spinner == false && listeTaches.length) ? 1 : undefined }}
            />
            {/* <FlatList
                data={listeTaches}
                refreshing={spinner}
                onRefresh={init}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <TacheItem coach={item} />}
            /> */}
        </View>
    )
}

const TacheItem = props => {
    const { coach } = props 

    return(
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity style={{ width: '90%', backgroundColor: coach.color + '55', paddingBottom: 15 }}>
                <View style={{ width: '100%', backgroundColor: '00000011', paddingVertical: 15}}>
                    <Text style={{fontSize: 17, textAlign: 'center', color: '#fff'}}> {coach.title} </Text>
                </View>
                
                <View style={{ width: '100%', backgroundColor: coach.color + '11', padding: 10 }}>
                    <Text style={{ lineHeight: 25, textAlign: 'left', marginLeft: 0, paddingLeft: 0, fontSize: 15}}>{coach.content} </Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: '900', textAlign: 'right', marginRight: 15 }}> Du coach {coach.nom} {coach.prenom} </Text>
            </TouchableOpacity>
        </View>

    )
}


const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(CoachTachesListe)
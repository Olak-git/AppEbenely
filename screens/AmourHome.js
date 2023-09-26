import { View, Text, Dimensions, Modal, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Pressable, DeviceEventEmitter, ScrollView, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../components/Header'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import ref_public from '../services/ref_public'
import ref from '../services/ref'
import { connect } from 'react-redux'
import { deleteReaction, getUsers, saveReaction } from '../services/user'
import CardsSwipe from 'react-native-cards-swipe';
import { chart_graph } from '../constants/data'
import Empty from '../components/Empty'

const { width, height } = Dimensions.get('window')

function AmourHome(props) {
    const [listeUsers, setListeUsers] = useState([])
    const [selectedCard, setSelectedCard] = useState({})
    const [cardDetailsModal, setCardDetailsModal] = useState(false)
    const [spinner, setSpinner] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const user = props.userConnected.userConnected

    function init() {
        getUsers(user.id, user.token)
        .then(data => {
            // console.log(data);
            setListeUsers(data)
        })
        .finally(() => {
            setSpinner(false)
            setRefreshing(false)
        })
    }

    function onDemandeMatch(profil) {
        saveReaction(profil.id, user.id, 'match_demande', user.token)
        .then(data => {
            console.log(data);
            init()
        })
    }

    function onLike(profil, isLiked) {
        if(!isLiked) {
            saveReaction(profil.id, user.id, 'like', user.token)
            .then(data => {
                console.log(data);
                init()
            })
        } else {
            deleteReaction(profil.id, user.id, 'like', user.token)
            .then(data => {
                console.log(data);
                init()
            })
        }
    }

    function onCardPress(card) {
        console.log(card);
        setCardDetailsModal(true)
        setSelectedCard(card)
    }

    const onRefresh = function () {
        setRefreshing(true)
    }

    const emit1 = DeviceEventEmitter.addListener('load.coach.contactliste', function () {
        console.log('load.coach.contactliste');
        init()
    })

    useEffect(()=>{
        if(refreshing) init()
    },[refreshing])

    useEffect(()=>{
        init()

        return ()=>{
            emit1.remove();
        }
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: 'rgb(250, 250, 250)'}}>
            <Header action={() => props.navigation.openDrawer()} label='Profils' icon="bars" />

            <ScrollView
                refreshControl={
                    <RefreshControl 
                        colors={['black']}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={{ flex: 1 }}
            >
            { !spinner && (
                listeUsers.length > 0 ? (
                    <CardsSwipe
                        cards={listeUsers}
                        cardContainerStyle={styles.cardContainer}
                        renderCard={card => (
                                <View style={styles.card}>
                                    <View style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
                                        <TouchableOpacity onPress={() => onCardPress(card)} style={{backgroundColor: '#000', width: width * .95, borderRadius: 13, alignSelf: 'center'}}>
                                            <Image
                                                style={styles.cardImg}
                                                source={card?.lien_img !== undefined && card?.lien_img !== null && card?.lien_img !== "" ? {uri: ref + JSON.parse(card?.lien_img)}: require('../assets/user_empty.png')}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{fontSize: 20, textAlign: 'center', marginTop: -50, color: '#fff'}}> {card.pseudo} ({calculAge(card.date_naissance)} ans) </Text>
                                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 60, alignItems: 'center', justifyContent: 'space-evenly' }}>
                                            <TouchableOpacity onPress={() => onDemandeMatch(card)} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 2, borderColor: '#555', justifyContent: 'center', alignItems: 'center'}}>
                                                <FontAwesome style={{}} name="flash" color={"#555"} size={20} />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => onLike(card, card.receveur_id !== null)} style={{ height: 50, width: 50, borderRadius: 25, borderWidth: 2, backgroundColor: card.receveur_id !== null? chart_graph.first: 'rgb(250, 250, 250)', borderColor: chart_graph.first, justifyContent: 'center', alignItems: 'center'}}>
                                                <AntDesign style={{}} name="heart" color={card.receveur_id !== null? '#fff':chart_graph.first} size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    />
                ) : (
                    <Empty text="Aucun coach disponible." />
                )
            )}
            </ScrollView>

            <Modal transparent={true} visible={spinner}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0 ,0 .5)'}}>
                    <ActivityIndicator size="small" color="#fff" />
                </View>
            </Modal>

            <Modal visible={cardDetailsModal && selectedCard.lien_img !== undefined} onRequestClose={() => setCardDetailsModal(false)} animationType='slide'>
                <Pressable
                    onPress={()=>setCardDetailsModal(false)}
                    style={{ position: 'absolute', top: Platform.OS == 'ios'? 45 : 12, left: 10, padding: 5, zIndex: 5 }}
                >
                    <AntDesign name='arrowleft' size={25} color='black' />
                </Pressable>
                
                <View style={{ flex: 1 }}>
                    {
                        selectedCard.lien_img !== undefined && <Image 
                            style={{ width, height: height * .55, resizeMode: 'cover'}}
                            source={selectedCard.lien_img !== undefined && selectedCard.lien_img !== null && selectedCard.lien_img !== "" ? {uri: ref + JSON.parse(selectedCard.lien_img)}: require('../assets/user_empty.png')}
                        />
                    }

                    <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10, color: '#323232' }}> {selectedCard.pseudo} ({calculAge(selectedCard.date_naissance)} ans) </Text>
                    <Text style={{ color: '#c52322', fontSize: 17, textAlign: 'center', marginBottom: 15}}> {selectedCard.ville} </Text>

                    <View style={{ width, paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 15, color: '#323232' }}>{selectedCard.description} </Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}




function calculAge(datenaissance){
    if(datenaissance !== undefined && datenaissance !== null && datenaissance !== ""){
        let dateCollection = datenaissance.split("-")
        var d = new Date()
  
        var jour = d.getDay()
        var mois = d.getDate()
        var annee = d.getFullYear()
  
        var age = annee - parseInt(dateCollection[0])
  
        if(mois - parseInt(dateCollection[1]) < 0){
            age--
            return age
        }else{
            if(mois - parseInt(dateCollection[1]) === 0){
                if(jour - parseInt(dateCollection[2]) < 0){
                    age--
                    return age
                }else{
                    return age
                }
            }else{
                return age
            }
        }
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContainer: {
      width: '92%',
      height: '90%',
    },
    card: {
      width: width,
      height: '100%',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.07,
      shadowRadius: 3.3,
    },
    cardImg: {
      width: width * .95,
      height: height * .65,
      borderRadius: 13,
      alignSelf: 'center',
      resizeMode: 'cover',
      opacity: .7
    },
  });

const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(AmourHome)
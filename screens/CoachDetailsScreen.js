import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React,  { useEffect, useState } from 'react'
import ref_public from '../services/ref_public'
import Header from '../components/Header'
import { chooseCoach, delFromChooseCoach } from '../services/coach'
import { connect } from 'react-redux'

function CoachDetailsScreen(props) {
    const [spinner, setSpinner] = useState(false)
    const coach_props = props.navigation.state.params.coach
    const user = props.userConnected.userConnected
    const [coach, setCoach] = useState(coach_props)
    const [choosed, setChoosed] = useState(coach_props.user_id === user.id ? true: false)

    function onChooseCoachPress() {
      if(coach.user_id === null) { //Ajouter aux choix
        setSpinner(true)
        chooseCoach(user.id, coach.id, user.token)
        .finally(() => setSpinner(false))
        .then(data => {
          console.log(data)
          if(data == "OK") setChoosed(true)
        })
      }else { // Retirer des choix
        setSpinner(true)
        delFromChooseCoach(user.id, coach.id, user.token)
        .then(data => {
          setChoosed(false)
        })
      }
    }

    useEffect(()=>{
      console.log(coach_props.user_id === user.id ? true: false);
    }, [])

    return (
      <View style={{flex: 1}}>
        <Header action={() => props.navigation.goBack()} label='' icon="chevron-left" />

        <View style={{ paddingVertical: 15, paddingHorizontal: 10}}>
          <View style={{ width: '100%', flexDirection: 'row', position: 'relative' }}>
            <Image style={{ width: '45%', height: 200, resizeMode: 'cover', borderRadius: 6 }} source={{uri: ref_public + 'adminebenely/' + coach.default_img}} />
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 12, color: '#313131' }}>{coach.nom} {coach.prenom}  </Text>
              <Text style={{ fontSize: 13, marginVertical: 5, color: '#a25', fontWeight: 'bold' }}>{coach.specialite} </Text>
              <Text style={{ fontSize: 12, color: '#313131' }}>Membre depuis {coach.days_diff} jours</Text>
              <Text style={{ fontSize: 12, position: 'absolute', bottom: 10, left: 10, fontWeight: '900', color: '#313131' }}>{coach.nb_choix !== null ? coach.nb_choix : '0'} personnes coachées </Text>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text>{coach.description}</Text>
          </View>

          <TouchableOpacity onPress={() => onChooseCoachPress()} style={{ paddingHorizontal: 20, paddingVertical: 8, marginTop: 30, borderRadius: 10, borderWidth: 1, borderColor: '#CF1C8F', backgroundColor: choosed? '#CF1C8F': 'rgb(250, 250, 250)', alignSelf: 'center' }}>
            <Text style={{ color: choosed ? '#fff': '#CF1C8F' }}> {choosed ? "Retirer": "Choisir"} </Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={spinner}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        </Modal>
      </View>
    )
}


function calculAge(datenaissance){
  if(datenaissance !== undefined){
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



const mapStateToProps=(state)=>{
  return {
      userConnected: state.userConnected
  }
}

export default connect(mapStateToProps)(CoachDetailsScreen)
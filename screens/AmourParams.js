import { View, Text, BackHandler, ScrollView, Dimensions, TextInput, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import ref from '../services/ref'
import { updateProfile } from '../services/user'
import { chart_graph } from '../constants/data'

const { width, height } = Dimensions.get('window')

function AmourParams(props) {
    const user = props.userConnected.userConnected
    const [spinner, setSpinner] = useState(false)
    const [oldPwd, setOldPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [pwdModal, setPwdModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [description, setDescription] = useState(user.description)

    function onUpdatePwdPress() {
      if(oldPwd !== '') {
        setPwdModal(false)
        if(oldPwd === newPwd) {
            setSpinner(true)
            updateProfile(user.id, 'pwd', newPwd, user.token)
            .then(data => {
              console.log(data);
              setSpinner(false)
              BackHandler.exitApp()
            })
        } 
      }
    }

    function onUpdateDescriptionPress() {
      if(description !== '') {
        setPwdModal(false)
        setSpinner(true)
        updateProfile(user.id, 'description', description, user.token)
        .then(data => {
          setSpinner(false)
          props.navigation.goBack()
        })
      }
    }

    useEffect(()=>{
      console.log('Dof');
    }, [props.navigation.state.params])

    return (
      <View style={{ flex: 1 }}>
          <Header action={() => props.navigation.openDrawer()} label='Paramètres' icon="bars" />
          <TouchableOpacity onPress={() => setPwdModal(true)} style={{ padding: 15, marginVertical: 15, width: '90%', borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: '#bbb', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{width: 40, height: 20}}>
              <FontAwesome5 style={{}} name="key" color="#888" size={20} />
            </View>
            <Text style={{ fontSize: 17, color: '#323232' }}>Modifier le mot de passe</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDescriptionModal(true)} style={{ padding: 15, marginVertical: 15, width: '90%', borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: '#bbb', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{width: 40, height: 20}}>
              <FontAwesome5 style={{}} name="user" color="#888" size={20} />
            </View>
            <Text style={{ fontSize: 17, color: '#323232' }}>Modifier la description</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 15, marginVertical: 15, width: '90%', borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: '#bbb', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{width: 40, height: 20}}>
              <FontAwesome5 style={{}} name="list" color="#888" size={20} />
            </View>
            <Text style={{ fontSize: 17, color: '#323232' }}>Conditions générales d'utilisation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 15, marginVertical: 15, width: '90%', borderBottomWidth: 1, alignSelf: 'center', borderBottomColor: '#bbb', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{width: 40, height: 20}}>
              <FontAwesome5 style={{}} name="list" color="#888" size={20} />
            </View>
            <Text style={{ fontSize: 17, color: '#323232' }}>Politique de la vie privée</Text>
          </TouchableOpacity>

          <Modal transparent={true} onRequestClose={() => setPwdModal(false)} visible={pwdModal} >
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setPwdModal(false)} style={{ position: 'absolute', height, width, top: 0, zIndex: 1, }} />
              
              <View style={{ backgroundColor: 'rgb(250, 250, 250)', zIndex: 3, width: '90%', padding: 15, borderRadius: 20 }}>
                  <Text style={{ fontSize: 17, color: '#212121', marginBottom: 20 }}>Modifier le mot de passe</Text>

                  <TextInput secureTextEntry={true} onChangeText={text => setOldPwd(text)} value={oldPwd} placeholder='Saisir le mot de passe actuel' style={{ width: '100%', padding: 8, marginVertical: 8, backgroundColor: 'rgb(235, 235, 235)' }} />
                  <TextInput secureTextEntry={true} onChangeText={text => setNewPwd(text)} value={newPwd} placeholder='Saisir le nouveau mot de passe' style={{ width: '100%', padding: 8, marginVertical: 8, backgroundColor: 'rgb(235, 235, 235)' }} />

                  <TouchableOpacity onPress={() => onUpdatePwdPress()} style={{ backgroundColor: chart_graph.first, width: '90%', alignSelf: 'center', marginVertical: 15, padding: 15, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>Confirmer</Text>
                  </TouchableOpacity>
              </View>
            </View> 
          </Modal>

          <Modal transparent={true} onRequestClose={() => setDescriptionModal(false)} visible={descriptionModal}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setDescriptionModal(false)} style={{ position: 'absolute', height, width, top: 0, zIndex: 1, }} />
              
              <View style={{ backgroundColor: 'rgb(250, 250, 250)', width: '90%', padding: 15, borderRadius: 20 }}>
                  <Text style={{ fontSize: 17 }}>Modifier la description</Text>

                  <TextInput multiline numberOfLines={7} value={description} onChangeText={text => setDescription(text)} placeholder='Modifiez le mot de passe' style={{ width: '100%', textAlignVertical: 'top', marginVertical: 10, padding: 8, backgroundColor: 'rgb(235, 235, 235)' }} />
                  <TouchableOpacity onPress={() => onUpdateDescriptionPress()} style={{ backgroundColor: chart_graph.first, width: '90%', alignSelf: 'center', marginVertical: 15, padding: 15, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>Confirmer</Text>
                  </TouchableOpacity>
              </View>
            </View> 
          </Modal>

          <Modal transparent={true} visible={spinner}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, .5)', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          </Modal>
      </View>
    )
}


const mapStateToProps=(state)=>{
  return {
      userConnected: state.userConnected
  }
}

export default connect(mapStateToProps)(AmourParams)
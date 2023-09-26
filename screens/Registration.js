import React, {useEffect, useState, useRef} from 'react'
import { View, Text, ScrollView, FlatList, TextInput, Platform, Animated, Switch, Dimensions, TouchableOpacity, Image, ActivityIndicator, Modal, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import ImagePicker from 'react-native-image-crop-picker';
// import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-toast-message';
import ref from '../services/ref';
import {Picker} from '@react-native-picker/picker';
import { registration } from '../services/user';
import { chart_graph } from '../constants/data';
import { storagePermission, validateEmeil, validatePassword } from '../services/helpers';

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

const Pagination = ({ a, b=1 }) => {
    if(a=='init') {
        return (
            <View style={{width: 15, height: 15, borderRadius: 15, borderWidth: 4, borderColor: 'rgba(200, 15, 90, 1)', backgroundColor: '#fff'}} />
        )
    }
    if(a=='valid') {
        return (
            <AntDesign name="checkcircle" size={15} color="#c25" />
        )
    }
    if(a=='append') {
        return b==0 ? (
            <View style={{width: 15, height: 15, borderRadius: 15, borderWidth: 4, borderColor: 'rgba(200, 15, 90, .4)', backgroundColor: '#aaa'}} />
        ) : (
            <View style={{width: 15, height: 15, borderRadius: 15, borderWidth: 4, borderColor: 'rgba(200, 15, 90, .4)', backgroundColor: '#ccc'}} />
        )
    }
    if(a=='divider') {
        return b==0 ? (
            <View style={{width: 50, height: 2, backgroundColor: 'rgba(200, 15, 30, .4)'}} />
        ) : (
            <View style={{width: 50, height: 2, backgroundColor: 'rgba(200, 15, 30, 1)'}} />
        )
    }
}

export default function Registration(props) {
    const [pseudo, setPseudo] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [dateNaissance, setDateNaissance] = useState('')
    const [ville, setVille] = useState('')
    const [situationCouple, setSituationCouple] = useState('Célibataire')
    const [description, setDescription] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [selectedImg, setSelectedImg] = useState(null)
    const [naissanceValue, setNaissanceValue] = useState(new Date())
    const [naissanceString, setNaissanceString] = useState('')
    const [imgStringName, setImgStringName] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const imageToFill = selectedImg !== null? {uri:selectedImg}: require('../assets/user_empty.png')
    const [selectedImageData, setSelectedImageData] = useState(undefined)

    const [screenPosition, setScreenPosition] = useState(0)
    const [spinner, setSpinner] = useState(false)
    const formularRef = useRef(null)
    const screeSteps = ['1', '2', '3', '4']

    function onScreenChangePostionPressed(index) {
        let pass_next = true
        if(index == 1) {
            if(pseudo == "") {
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Indiquez votre pseudo"
                  });
            } else if(nom === ""){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Indiquez votre nom svp"
                  });
            } else if(prenom === ""){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Indiquez votre prénom svp"
                  });
            } else if(naissanceString === "" || naissanceString === null || naissanceString === undefined ){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Saissez votre date de naissance"
                  });
            } else if(email == "") {
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Indiquez votre adresse email"
                });
            } else if(!validateEmeil(email)) {
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Format incorrect"
                  });
            } else if(ville == "") {
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Indiquez la ville"
                  });
            } else if(description == "") {
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Donnez une description"
                  });
            }
        } else if(index == 2) {
            if(situationCouple === ""){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Quelle est votre situation de couple ?"
                  });
            }
        } else if(index == 3) {
            if(password !== confirmPwd){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Les mots de passe doivent être identique"
                  });
            } else if(password === ""){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Choissez un mot de passe"
                  });
            } else if(!validatePassword(password)) {
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: '8 caracteres minimum'
                })
            }
        } else if(index == 4) {
            if(selectedImageData === null || selectedImageData === undefined || selectedImageData === ""){
                pass_next = false;
                Toast.show({
                    type: 'error',
                    text1: 'Echec',
                    text2: "Veuillez choisir une photo svp"
                  });
            }
        }
        if(pass_next) {
            formularRef.current.scrollToIndex({animated: true, index})
            setScreenPosition(index)
        }
    }

    function onGoBackPressed() {
        props.navigation.goBack()
    }

    function onRegistrationPressed() {
        console.log('PRESSED');
        if(pseudo == "")
        {
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Indiquez votre pseudo"
              });
        }else if(description == "")
        {
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Donnez une description"
              });
        }else if(ville == "") {
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Indiquez la ville"
              });
        }else if(password !== confirmPwd){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Les mots de passe doivent être identique"
              });
        } else if(password === ""){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Choissez un mot de passe"
              });
        } else if(!validatePassword(password)) {
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: 'Le mot de passe doit contenir minimum 8 caractères dont des minuscules a-z, des majuscules A-Z et des chiffres 0-9 et/ou des caractères spéciaux(+,=,@,...)'
            })
        } else if(nom === ""){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Indiquez votre nom svp"
              });
        } else if(prenom === ""){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Indiquez votre prénom svp"
              });
        } else if(situationCouple === ""){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Quelle est votre situation de couple ?"
              });
        } else if(naissanceString === "" || naissanceString === null || naissanceString === undefined ){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Saissez votre date de naissance"
              });
        } else if(selectedImageData === null || selectedImageData === undefined || selectedImageData === ""){
            Toast.show({
                type: 'error',
                text1: 'Echec',
                text2: "Veuillez choisir une photo svp"
              });
        } else
        {
            setSpinner(true)
        
            RNFetchBlob.fetch('POST', ref + 'registration_img.php', {
            Authorization: 'Bearer access-token',
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data'
          }, [
              {name: 'image', filename: imgStringName, data: selectedImageData}
          ]).then(resp =>  {
                console.log('data : ', resp.data)
                //Faire l'inscription ICI

                registration(pseudo, nom, prenom, naissanceString, email, ville, description, situationCouple, password, resp.data)
                .then(data => {
                    console.log(data);
                    if(data === "OK") {
                        Toast.show({
                            type: 'success',
                            text1: 'Succès',
                            text2: 'Inscription effectuée ✔️'
                          });
                        props.navigation.goBack()
                    }else {
                        if(data === "Doublon") {
                            Toast.show({
                                type: 'success',
                                text1: 'Succès',
                                text2: 'Pseudo ou email déjà utilisé !'
                              });
                        } else {
                            Toast.show({
                                type: 'success',
                                text1: 'Succès',
                                text2: 'Quelque chose s\'est mal passé, réessayez svp'
                              });
                        }
                    }
                })
          })
        }
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS=='ios'?'padding':'height'} style={{ flex: 1 }}>
        <View style={{flex: 1}}>
            
            <View style={{marginVertical: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: Platform.OS=='ios'?20:0}}>
                {
                    screenPosition === 0?(
                        <Pagination a='init' />
                    ): screenPosition < 0?(
                        <Pagination a='append' b={0} />
                    ): <Pagination a='valid' />
                }

                {
                    screenPosition < 1?(
                        <Pagination a='divider' b={0} />
                    ): <Pagination a='divider' />
                }   
                
                {
                    screenPosition === 1?(
                        <Pagination a='init' />
                    ): screenPosition < 1?(
                        <Pagination a='append' />
                    ): <Pagination a='valid' />
                }
                {
                    screenPosition < 2?(
                        <Pagination a='divider' b={0} />
                    ): <Pagination a='divider' />
                }
                {
                    screenPosition === 2?(
                        <Pagination a='init' />
                    ): screenPosition < 2?(
                        <Pagination a='append' />
                    ): <Pagination a='valid' />
                }

                {
                    screenPosition < 3?(
                        <Pagination a='divider' b={0} />
                    ): <Pagination a='divider' />
                }

                {
                    screenPosition === 3?(
                        <Pagination a='init' />
                    ): screenPosition < 3?(
                        <Pagination a='append' />
                    ): <Pagination a='valid' />
                }

                
            </View>


            <FlatList
                ref={formularRef}
                data={screeSteps}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => <FormularItem item={item} pos={index} onScreenChangePostionPressed={onScreenChangePostionPressed} onGoBackPressed={onGoBackPressed} 
                email={email} setEmail={setEmail} pseudo={pseudo} setPseudo={setPseudo} nom={nom} setNom={setNom}
                prenom={prenom} setPrenom={setPrenom} selectedImg={selectedImg} setSelectedImg={setSelectedImg} dateNaissance={dateNaissance} setDateNaissance={setDateNaissance}
                ville={ville} setVille={setVille} situationCouple={situationCouple} setSituationCouple={setSituationCouple}
                description={description} naissanceString={naissanceString} setNaissanceString={setNaissanceString} naissanceValue={naissanceValue} setNaissanceValue={setNaissanceValue} setDescription={setDescription} password={password} setPassword={setPassword}
                selectedImageData={selectedImageData} setSelectedImageData={setSelectedImageData} imageToFill={imageToFill}
                imgStringName={imgStringName} setImgStringName={setImgStringName} onRegistrationPressed={onRegistrationPressed}
                confirmPwd={confirmPwd} setConfirmPwd={setConfirmPwd}
                /> }
            />
        </View>
        </KeyboardAvoidingView>
    )
}

const FormularItem = props => {
    const { item, pseudo, setPseudo, confirmPwd, setConfirmPwd, onRegistrationPressed, imgStringName, setImgStringName, selectedImageData, setSelectedImageData, naissanceString, setNaissanceString, naissanceValue, setNaissanceValue, nom, setNom, prenom, setPrenom, selectedImg, setSelectedImg, description, setDescription, ville, setVille, password, setPassword, email, setEmail, dateNaissance, setDateNaissance, situationCouple, setSituationCouple, onScreenChangePostionPressed, onGoBackPressed, pos } = props 
    const [displayNaissance, setDisplayNaissance] = useState(false)
    const [imageToFill, setImageToFill] = useState(selectedImg !== null? {uri:selectedImg}: require('../assets/user_empty.png'))
    
  function onDateNaissanceChange(event, selectedDate) {
      
      const currentDate = selectedDate || naissanceValue;
      setDisplayNaissance(false)
      setNaissanceString(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1) + '-' + currentDate.getDate())
      setDateNaissance(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1 < 10 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1) + '-' + currentDate.getDate())
      setNaissanceValue(currentDate);
  }

    async function callProfilePictureFromGallery() {
        const granted = await storagePermission()
        if(granted) {
            ImagePicker.openPicker({
                mediaType: 'photo',
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true
            }).then(image => {
                // console.log({ image });
                const pathToArray = image.path.toString().split(".")
                const extensionImage = pathToArray[pathToArray.length -1]
                setImageToFill({uri: `data:${image.mime};base64,${image.data}`})
                setSelectedImg(`data:${image.mime};base64,${image.data}`)
                setSelectedImageData(image.data)
                console.log(extensionImage);
                setImgStringName(pathToArray[pathToArray.length -2] + "." + extensionImage)
            });
        } else {
            console.log('Permission non accordée');
        }
    }

    switch (item) {
        case '1':
            return(
                <View style={styles.formContainer}>
                    <View style={[styles.formStepContainer, {flex: 1}]}>
                        <View style={{width: '100%'}}>
                            <Text style={styles.stepIndicator}>Etape 1 sur 4</Text>
                            <Text style={styles.stepLabel}>Informations générales</Text>
                        </View>
    
                        {/* <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS=='ios'?'padding':'height'}> */}

                            <View style={{flex: 1}}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                                    
                                <Text style={styles.quizBlocText}>Pseudo</Text>
                                <TextInput value={pseudo} onChangeText={v => setPseudo(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Votre pseudo...' />

                                <Text style={styles.quizBlocText}>Nom</Text>
                                <TextInput value={nom} onChangeText={v => setNom(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Votre nom...' />

                                <Text style={styles.quizBlocText}>Prénom</Text>
                                <TextInput value={prenom} onChangeText={v => setPrenom(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Votre prenom...' />
                                
                                <View style={{width: '100%'}}>
                                    <Text style={styles.quizBlocText}>Date de naissance</Text>
                                    <TouchableOpacity onPress={() => setDisplayNaissance(!displayNaissance)} style={{paddingHorizontal: 15, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#222', borderRadius: 20}}>
                                        <Text> {naissanceString} </Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={styles.quizBlocText}>Email</Text>
                                <TextInput value={email} onChangeText={v => setEmail(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Votre adresse mail...' />

                                <Text style={styles.quizBlocText}>Ville</Text>
                                <TextInput value={ville} onChangeText={v => setVille(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Votre adresse mail...' />

                                <Text style={styles.quizBlocText}>Description</Text>
                                <TextInput numberOfLines={6} maxLength={600} value={description} onChangeText={v => setDescription(v)} style={{paddingHorizontal: 20, marginBottom: 30, paddingVertical: 10, textAlignVertical: 'top', width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Une petite description...' />

                                
                                {
                                    displayNaissance && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={naissanceValue}
                                                mode="date"
                                                display="default"
                                                maximumDate={new Date("2005-01-01")}
                                                onChange={onDateNaissanceChange}
                                            />

                                        </View>
                                    )
                                }
                            </ScrollView>
                            </View>

                            <View style={styles.btnFormRow}>
                                <TouchableOpacity onPress={() => onGoBackPressed()} style={styles.btnBack}>
                                    <Entypo name="chevron-small-left" size={20} color="black" />
                                    <Text style={styles.btnBackText}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onScreenChangePostionPressed(pos + 1)} style={styles.btnNext}>
                                    <Text style={styles.btnNextText}>Continuer</Text>
                                    <Entypo name="chevron-small-right" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                        {/* </KeyboardAvoidingView> */}
                        
                    </View>
                </View>
            )
            break;
        case '2':
            return(
                <View style={styles.formContainer}>
                    <View style={[styles.formStepContainer, {flex: 1}]}>
                        <View style={{width: '100%'}}>
                            <Text style={styles.stepIndicator}>Etape 2 sur 4</Text>
                            <Text style={styles.stepLabel}>Situation de couple</Text>
                        </View>

                        {/* <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS=='ios'?'padding':'height'}> */}
                        
                            <View style={{flex: 1}}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                                <View style={{borderWidth: 1, borderColor: '#999', borderRadius: 5, marginTop: 15}}>
                                    <Picker
                                        selectedValue={situationCouple}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSituationCouple(itemValue)
                                        }>
                                        <Picker.Item label="Célibataire" value="Célibataire" />
                                        <Picker.Item label="Marié (e)" value="Marié (e)" />
                                        <Picker.Item label="Divorcé (e)" value="Divorcé (e)" />
                                    </Picker>
                                </View>
                            </ScrollView>
                            </View>
                            <View style={styles.btnFormRow}>
                                <TouchableOpacity onPress={() => onScreenChangePostionPressed(pos - 1)} style={styles.btnBack}>
                                    <Entypo name="chevron-small-left" size={20} color="black" />
                                    <Text style={styles.btnBackText}>Précédent</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onScreenChangePostionPressed(pos + 1)} style={styles.btnNext}>
                                    <Text style={styles.btnNextText}>Continuer</Text>
                                    <Entypo name="chevron-small-right" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                        {/* </KeyboardAvoidingView> */}
                    </View>
                </View>
            )
            break;

        case '3':
            return(
                <View style={styles.formContainer}>
                    <View style={[styles.formStepContainer, {flex: 1}]}>
                        <View style={{width: '100%'}}>
                            <Text style={styles.stepIndicator}>Etape 3 sur 4</Text>
                            <Text style={styles.stepLabel}>Données de compte</Text>
                        </View>

                        {/* <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS=='ios'?'padding':'height'}> */}
    
                            <View style={{flex: 1}}>
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
                                    <Text style={styles.quizBlocText}>Mot de passe</Text>
                                    <TextInput secureTextEntry value={password} onChangeText={v => setPassword(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Mot de passe' />

                                    <Text style={styles.quizBlocText}>Confirmer le mot de passe</Text>
                                    <TextInput secureTextEntry value={confirmPwd} onChangeText={v => setConfirmPwd(v)} style={{paddingHorizontal: 20, paddingVertical: 10, width: '100%', borderWidth: 1, borderColor: '#999', borderRadius: 15}} placeholder='Confirmer le mot de passe' />
                                    
                                    
                                </ScrollView>
                            </View>
                            <View style={styles.btnFormRow}>
                                <TouchableOpacity onPress={() => onScreenChangePostionPressed(pos - 1)} style={styles.btnBack}>
                                    <Entypo name="chevron-small-left" size={20} color="black" />
                                    <Text style={styles.btnBackText}>Précédent</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onScreenChangePostionPressed(pos + 1)} style={styles.btnNext}>
                                    <Text style={styles.btnNextText}>Continuer</Text>
                                    <Entypo name="chevron-small-right" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                        {/* </KeyboardAvoidingView> */}
                    </View>
                </View>
            )
            break;

        case '4': 
            return(
                <View style={styles.formContainer}>
                    <View style={[styles.formStepContainer, {flex: 1}]}>
                        <View style={{width: '100%'}}>
                            <Text style={styles.stepIndicator}>Etape 4 sur 4</Text>
                            <Text style={styles.stepLabel}>Photo de profil</Text>
                        </View>

                        {/* <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS=='ios'?'padding':'height'}> */}
                        
                        <View style={{flex: 1, minHeight: fullHeight * .6}}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{  }}>
                            <Text style={styles.quizBlocText}>Importez une image</Text>
                            
                            <View style={{flexDirection: 'column-reverse', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => callProfilePictureFromGallery()} style={{padding: 10}}>
                                    <Text style={{textDecorationLine: 'underline'}}>Choisir une image</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => callProfilePictureFromGallery()}>
                                    <Image source={imageToFill} style={{width: fullWidth * .9, height: 300, resizeMode: 'cover'}} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        </View>
                        <View style={styles.btnFormRow}>
                            <TouchableOpacity onPress={() => onScreenChangePostionPressed(pos - 1)} style={styles.btnBack}>
                                <Entypo name="chevron-small-left" size={20} color="black" />
                                <Text style={styles.btnBackText}>Précédent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onRegistrationPressed()} style={styles.btnNext}>
                                <Text style={styles.btnNextText}>Terminer</Text>
                                <Entypo name="check" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* </KeyboardAvoidingView> */}

                    </View>
                </View>
            )
            break;
    
        default:
            break;
    }
}


const styles = StyleSheet.create({
    formContainer: {
        width: fullWidth, alignItems: 'center'
    },
  
    formStepContainer: {
        width: fullWidth * .9, backgroundColor: 'rgb(250, 250, 250)', paddingVertical: 30, paddingHorizontal: 15
    },
    
    btnFormRow: {
        flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 30, marginBottom: 10
    },
  
    btnBack: {
        paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '45%', marginRight: '8%', backgroundColor: chart_graph.second, borderRadius: 30,
    },
  
    btnNext: {
        paddingHorizontal: 30, paddingVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: chart_graph.first, borderRadius: 30, width: '45%'
    },
    
    btnBackText: {
        fontSize: 14, color: '#303030'
    },
    
    quizBlocText: {
        fontSize: 15, fontWeight: '500', color: '#654141', marginTop: 20, marginBottom: 10
    },
  
    picker: { borderColor:'#654242', borderWidth: 1, color: '#fff', fontSize: 25, borderRadius: 6, width:'90%', elevation: 12, marginBottom: 12, height: 35, alignItems:'center', justifyContent:'center', marginVertical: 15, alignSelf: 'center', backgroundColor: 'rgb(240, 238, 238)' },
    
    btnNextText: {
        fontSize: 14, color: '#fff'
    },
  
    stepIndicator: {
        fontSize: 12, color: '#c25'
    },
  
    stepLabel: {
        fontSize: 20, fontWeight: '700'
    }
  })

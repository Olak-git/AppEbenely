import { View, Text, FlatList, Image, Modal, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { chart_graph } from '../constants/data';

const fullWidth = Dimensions.get('window').width
const PRIMARY_COLOR = chart_graph.first

export default function OnBoardingScreen(props) {

    const [sliderVisibility, setSliderVisibility] = useState(false)
    const [chooseTypeCharmeurModal, setChooseTypeCharmeurModal] = useState(true)
    const [spinner, setSpinner] = useState(false)
    const formularRef = useRef(null)

    const sliderData = [
        {title: "Coaching et Mindset", contenu: "Faites vous coacher par nos professionnels", img: require("../assets/training.png")},
        {title: "Matching personnalisé", contenu: "Faites des rencontres et développez votre réseau", img: require("../assets/illu_donut.png")},
        {title: "Conversations privées", contenu: "Discutez avec votre partenaire idéal en toute sécurité", img: require("../assets/illu_messagerie.png")},
    ]


    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('alreadyUsed', value)
        } catch (e) {
          // saving error
        }
      }

    useEffect(() => {
        getData()
        .then(data => {
            console.log({ data })
        })
    },[])
    
    const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyUsed')
      if(value !== null) {
        // value previously stored
        if(value === "true")
        {
            setSliderVisibility(false)
        }else{
            setSliderVisibility(true)
        }
      }else{
          setSliderVisibility(true)
      }
    } catch(e) {
      // error reading value
    }
  }

    function onScreenChangePostionPressed(index)
    {
        formularRef.current.scrollToIndex({animated: true, index})
    }

    function onStartUsingPressed()
    {
        setSliderVisibility(false)
        storeData("true")
        .then(data => console.log(data))
    }


    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 30, color: chart_graph.first}}>Ebenely</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={{width: '90%', padding: 15, borderRadius: 4, marginVertical: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: chart_graph.first}}>
                <Text style={{color: '#fff'}}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Registration')}  style={{width: '90%', padding: 15, borderRadius: 4, marginVertical: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: chart_graph.first}}>
                <Text style={{color: chart_graph.first}}>S'inscrire</Text>
            </TouchableOpacity>

            <Modal visible={sliderVisibility} transparent={false} style={{margin: 0, flex: 1}}>
                <FlatList
                    data={sliderData}
                    ref={formularRef}
                    keyExtractor={(item, index) => index}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    renderItem={({item, index}) => <SliderItem slide={item} id={index} setSliderVisibility={setSliderVisibility} onStartUsingPressed={onStartUsingPressed} onScreenChangePostionPressed={onScreenChangePostionPressed} />}
                />
            </Modal>
        </View>
    )
}



const SliderItem = props => {
    const { slide, id, onScreenChangePostionPressed, onStartUsingPressed, setSliderVisibility } = props 

    return(
        <View style={{flex: 1, width: fullWidth, alignItems: 'center'}}>
            <View style={{width: '100%', height: '60%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={slide.img} style={{width: "90%", height: "100%", resizeMode: 'contain'}} />
            </View>
            <Text style={{color: PRIMARY_COLOR, fontSize: 22, marginTop: 20, fontWeight: '600'}}> {slide.title} </Text>
            <Text style={{color: '#727272', textAlign: 'center', fontSize: 16, marginTop: 10}}> {slide.contenu} </Text>

            {
                id === 0?
                (
                    <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20}}>
                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            
                        </View>

                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => onScreenChangePostionPressed(id + 1)} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: PRIMARY_COLOR, flexDirection: 'row', width: '90%', paddingVertical: 20, borderRadius: 50}}>
                                <Text style={{fontSize: 15, color: '#fff', fontWeight: '700', marginRight: 10}}>Suivant</Text>
                                <AntDesign name="right" color="#fff" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ): id === 1? 
                (
                    <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20}}>
                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => onScreenChangePostionPressed(id - 1)} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(170, 170, 170, .1)', flexDirection: 'row', width: '90%', paddingVertical: 20, borderRadius: 50}}>
                                <AntDesign name="left" color={PRIMARY_COLOR} size={18} />
                                <Text style={{fontSize: 15, color: PRIMARY_COLOR, fontWeight: '700', marginLeft: 10}}>Précédent</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => onScreenChangePostionPressed(id + 1)} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: PRIMARY_COLOR, flexDirection: 'row', width: '90%', paddingVertical: 20, borderRadius: 50}}>
                                <Text style={{fontSize: 15, color: '#fff', fontWeight: '700', marginRight: 10}}>Suivant</Text>
                                <AntDesign name="right" color="#fff" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ): id === 2?
                (
                    <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20}}>
                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => onScreenChangePostionPressed(id - 1)} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(170, 170, 170, .1)', flexDirection: 'row', width: '90%', paddingVertical: 20, borderRadius: 50}}>
                                <AntDesign name="left" color={PRIMARY_COLOR} size={18} />
                                <Text style={{fontSize: 15, color: PRIMARY_COLOR, fontWeight: '700', marginLeft: 10}}>Précédent</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => onStartUsingPressed()} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: PRIMARY_COLOR, flexDirection: 'row', width: '90%', elevation: 8, paddingVertical: 20, borderRadius: 50}}>
                                <Text style={{fontSize: 15, color: '#fff', fontWeight: '700', marginRight: 10}}>Commencer</Text>
                                <AntDesign name="check" color="#fff" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ):null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    btn: {

    }
})
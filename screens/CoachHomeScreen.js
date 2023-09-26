import { View, Text, Dimensions, TouchableOpacity, FlatList, Image, ActivityIndicator, RefreshControl, DeviceEventEmitter } from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ref_public from '../services/ref_public'
import { getAllCoach } from '../services/coach'
import { connect } from 'react-redux'
import Empty from '../components/Empty'

const { width } = Dimensions.get('window')
function CoachHomeScreen(props) {
    const [listeCoach, setListeCoach] = useState([])
    const [spinner, setSpinner] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const user = props.userConnected.userConnected

    function onScreenLoad() {
        console.log({ id: user.id, token: user.token });
        getAllCoach(user.id, user.token)
        .then((resp) => {
            // console.log({ resp });
            setListeCoach(resp)
        })
        .finally(()=>{
            setSpinner(false)
            setRefreshing(false)
        })
    }

    function navigationToCoachDetails(coach) {
        props.navigation.navigate('CoachDetailsScreen', {coach})
    }

    const onRefresh = function () {
        setRefreshing(true)
    }

    const emit1 = DeviceEventEmitter.addListener('load.coach.contactliste', function () {
        console.log('load.coach.contactliste');
        init()
    })
  
    useEffect(()=>{
        if(refreshing) onScreenLoad()
    },[refreshing])

    useEffect(() => {
        onScreenLoad()
        return ()=>{
            emit1.remove();
        }
    },[])

    return (
        <View style={{flex: 1}}>
            <Header action={() => props.navigation.openDrawer()} label='Coachs' icon="bars" />
            <FlatList
                data={listeCoach} 
                numColumns={2}
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
                renderItem={({item, index}) => <CoachItem coach={item} navigationToCoachDetails={navigationToCoachDetails} />}
                contentContainerStyle={{ flex: spinner || (spinner == false && listeCoach.length) ? 1 : undefined }}
            />
            
            {/* <FlatList
                data={listeCoach}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => <CoachItem coach={item} navigationToCoachDetails={navigationToCoachDetails} />}
            /> */}
        </View>
    )
}


const CoachItem = props => {
    const { coach, navigationToCoachDetails } = props
    return(
        <TouchableOpacity onPress={() => navigationToCoachDetails(coach)} style={{ margin: 8, borderRadius: 6, marginTop: 15, width: width * .45, backgroundColor: 'rgb(249, 249, 249)', elevation: 3 }}>
            <View style={{backgroundColor: '#000', position: 'relative', borderRadius: 6, height: 200}}>
                <Image source={{uri: ref_public + 'adminebenely/' + coach.default_img}} style={{ width: width * .45, height: 200, borderRadius: 6, resizeMode: 'cover', opacity: .7 }}/>
                <Text style={{position: 'absolute', bottom: 30, color: '#fff', alignSelf: 'center', fontSize: 13, fontWeight: '600'}} numberOfLines={1}> {coach.nom} {coach.prenom} </Text>
            </View>
        </TouchableOpacity>
    )
}

const mapStateToProps=(state)=>{
    return {
        userConnected: state.userConnected
    }
}

export default connect(mapStateToProps)(CoachHomeScreen)
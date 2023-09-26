import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CoachTachesListe from '../screens/CoachTachesListe'
import CoachTacheDetails from '../screens/CoachTacheDetails'

const CoachTachesStack = createStackNavigator({
    CoachTachesListe: {screen: CoachTachesListe, navigationOptions: { headerShown: false }},
    CoachTacheDetails: {screen: CoachTacheDetails, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'CoachTachesListe'
})

export default createAppContainer(CoachTachesStack)
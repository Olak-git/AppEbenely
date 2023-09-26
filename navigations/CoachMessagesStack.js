import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CoachMessageScreen from '../screens/CoachMessageScreen'
import CoachContactListe from '../screens/CoachContactListe'

// import { Text } from 'react-native'

// export default function CoachMessageStack() {
//     return (
//         <Text style={{ color: 'red' }}>CoachMessageStack</Text>
//     )
// }

const CoachMessageStack = createStackNavigator({
    CoachContactListe: {screen: CoachContactListe, navigationOptions: { headerShown: false }},
    CoachMessageScreen: {screen: CoachMessageScreen, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'CoachContactListe',
})

export default createAppContainer(CoachMessageStack)
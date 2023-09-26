import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AmourMessageScreen from '../screens/AmourMessageScreen'
import AmourContactListe from '../screens/AmourContactListe'

const AmourMessageStack = createStackNavigator({
    AmourContactListe: {screen: AmourContactListe, navigationOptions: { headerShown: false }},
    AmourMessageScreen: {screen: AmourMessageScreen, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'AmourContactListe'
})

export default createAppContainer(AmourMessageStack)
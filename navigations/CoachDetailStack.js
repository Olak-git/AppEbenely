import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CoachHomeScreen from '../screens/CoachHomeScreen'
import CoachDetailsScreen from '../screens/CoachDetailsScreen'


const CoachDetailStack = createStackNavigator({
    CoachHomeScreen: {screen: CoachHomeScreen, navigationOptions: { headerShown: false }},
    CoachDetailsScreen: {screen: CoachDetailsScreen, navigationOptions: { headerShown: false }},     
},

{
    initialRouteName: 'CoachHomeScreen'
})

export default createAppContainer(CoachDetailStack)
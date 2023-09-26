import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import OnBoardingScreen from '../screens/OnBoardingScreen'
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import AmourDrawer from './AmourDrawer'
import CoachDrawer from './CoachDrawer'

const LoginStack = createStackNavigator({
    OnBoardingScreen: {screen: OnBoardingScreen, navigationOptions: { headerShown: false }},
    Login: {screen: Login, navigationOptions: { headerShown: false }},
    Registration: {screen: Registration, navigationOptions: { headerShown: false }},
    CoachDrawer: {screen: CoachDrawer, navigationOptions: { headerShown: false }},
    AmourDrawer: {screen: AmourDrawer, navigationOptions: { headerShown: false }},
},

{
    initialRouteName: 'OnBoardingScreen'
})

export default createAppContainer(LoginStack)
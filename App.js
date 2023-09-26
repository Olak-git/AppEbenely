import React from 'react';
import { View, LogBox } from 'react-native';
import Toast from 'react-native-toast-message'
import 'react-native-gesture-handler';
import LoginStack from './navigations/LoginStack'
import { Provider } from 'react-redux'
import Store from './redux/Store/configureStore'

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={Store}>
        <LoginStack />
        <Toast />
      </Provider>
    </View>
  );
};

export default App;


// Backend files Upgr: getAllSelectedCoach.php, getAmourContacts.php, getAllCoach.php

import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './config/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications, Permissions, Constants } from 'expo';

import Routes from './config/navigation';

export default class App extends React.Component {
  
  async componentDidMount(){

    const notifications = await AsyncStorage.getItem('notifications');

    if(notifications !== 'granted'){
      let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.isDevice && resut.status === 'granted') {
        AsyncStorage.setItem('notifications','granted');
        this._setNotification();
      }else{
        this._setNotification();
      }
    }
  }

  async _setNotification(){
    const notificate = await AsyncStorage.getItem('notificate');
    if(notificate == 1)
      Notifications.cancelAllScheduledNotificationsAsync();

    const localNotification = {
      title : 'Hello is time to study !',
      body : 'We noted that you don\'t studied today yet, let\'s to practice it now ?',
      sound : true
    };
    let date = new Date();
    //date = date.getTime() + 5000; uncoment this line to test the notification.
    date = date.setDate(date.getDate() + 1);
    const scheduleOpt = {
      time : date
    }
    Notifications.scheduleLocalNotificationAsync(localNotification,scheduleOpt)
    AsyncStorage.setItem('notificate', '1');

  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes/>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { PureComponent } from 'react';
import { View, LogBox, StatusBar, Platform } from 'react-native';
import { BaseNavigator } from "./navigation";
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NotifService from './services/NotifService';

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: true
    }

    this.notif = new NotifService();
  }

  componentDidMount() {
    LogBox.ignoreAllLogs();
    StatusBar.setBarStyle("light-content");
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
    this.notif.scheduleNotif();
  }

  render() {
    const { isConnected } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BaseNavigator />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

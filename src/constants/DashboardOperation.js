
import { Platform, Alert, Linking, Share } from 'react-native';
import * as Constant from './constants';

const shareMSG = Platform.OS === 'android' ? `Please check out this app ${Constant.AndroidAppLink}`
  : `Please check out this app ${Constant.IOSAppLink}`


export default {

  location: false,

  onMoreApp() {
    const url = Platform.OS === 'android' ? Constant.AndroidStoreLink : Constant.IOSStoreLink
    Linking.openURL(url)
  },

  onRateus() {
    const url = Platform.OS === 'android' ? Constant.AndroidAppLink : Constant.IOSAppLink
    Linking.openURL(url)
  },

  async onShare() {
    try {
      const result = await Share.share({
        title: 'App link',
        message: shareMSG,
        url: Platform.OS === 'android' ? Constant.AndroidAppLink : Constant.IOSAppLink
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  },

};


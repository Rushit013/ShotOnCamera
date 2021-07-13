
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

const PERMISSION_OBJECT = {
  camera: Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  library: Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.CAMERA,
  microphone: Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO
};


export default {

  location: false,

  async checkPermissions(value) {
    try {
      const response = await Permissions.check(PERMISSION_OBJECT[`${value}`]);
      if (response === 'restricted' || response === 'blocked') {
        Permissions.openSettings();
      }
      if (response === 'undetermined' || response === 'denied') {
        const permissionRequest = await this.requestPermissions(value);
        if (!permissionRequest) return Promise.reject(new Error(false));
        return response;
      }
      if (response === 'granted') {
        return response;
      }
      return response;
    } catch (error) {
      Promise.reject(error);
    }
  },

  async requestPermissions(value) {
    try {
      const response = await Permissions.request(PERMISSION_OBJECT[`${value}`]);
      if (response === 'undetermined') {
        return Promise.reject(new Error('undetermined'));
      }
      if (response === 'restricted') {
        return Promise.reject(new Error('restricted'));
      }
      if (response === 'denied') {
        return Promise.reject(new Error('denied'));
      }
      return response;
    } catch (error) {
      Promise.reject(error);
    }
  }
};


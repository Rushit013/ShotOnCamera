import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../constants/constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    backgroundImageContainer: {
        height: '100%',
        width: '100%'
    },

    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    logoContainer: {
        position: 'absolute',
        // left: 15,
        // top: 15
    },

    logoImage: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
        tintColor: Constant.whiteColor
    },

    logoImageGallery: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    overlayText: {
        color: Constant.whiteColor,
        // fontWeight: '700'
    },
})

export default styles
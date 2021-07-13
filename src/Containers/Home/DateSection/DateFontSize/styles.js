import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../../constants/constants';
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

    navigationRightButton: {
        marginRight: 16,
    },

    bottomContainer: {
        // zIndex: 99,
        // height: 60,
        width: wp('100%'),
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constant.whiteColor
    },

    sliderContainer: {
        // height: 60,
        // width: '90%',
        flex: 1,
        zIndex: 99
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
    
    overlayText: {
        color: Constant.whiteColor,
        // fontWeight: '700'
    },
})

export default styles;

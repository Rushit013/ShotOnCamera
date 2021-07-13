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
        zIndex: 99,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Constant.whiteColor
    },

    itemOuterContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    itemContainer: {
        height: wp('20%'),
        width: wp('20%'),
        borderRadius: 25,
        backgroundColor: '#ccc'
    },

    stampPlaceholder: {
        height: 50,
        width: 50,
        position: 'absolute'
    },

    itemText: {
        color: Constant.appColor1
    },

    selectedItemText: {
        color: Constant.appColor5,
        fontWeight: '700'
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
})

export default styles;

import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../constants/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const isTab = Constant.isTab;
const isNotch = Constant.isNotch;

const styles = StyleSheet.create({
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

    headerContainer: {
        height: hp('18%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerLogoContainer: {
        height: hp('12%'),
        width: hp('12%'),
        borderRadius: hp('3%'),
        backgroundColor: Constant.appColor1
    },

    pluseIconContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: Constant.appColor2,
        borderWidth: 2,
        position: 'absolute',
        right: -12,
        bottom: -12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Constant.whiteColor
    },

    listContainer: {
        flex: 1,
    },

    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    itemContainer: {
        height: wp('15%'),
        width: wp('15%'),
        margin: wp('2%'),
        backgroundColor: Constant.appColor3,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Constant.appColor2
    },

    itemImage: {
        height: wp('8%'),
        width: wp('8%'),
        alignSelf: 'center',
        resizeMode: 'contain',
        tintColor: Constant.appColor4
    },

    selectedImage: {
        height: wp('10%'),
        width: wp('10%'),
        alignSelf: 'center',
        resizeMode: 'contain',
        tintColor: Constant.appColor4
    },

    selectedGalleryImage: {
        height: wp('10%'),
        width: wp('10%'),
        alignSelf: 'center',
        // resizeMode: 'cover',
        zIndex: 99
    }

})

export default styles;

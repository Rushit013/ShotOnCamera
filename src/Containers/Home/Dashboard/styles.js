import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../constants/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

    titleText: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 30
    },

    shotOnOptionContainer: {
        height: hp('15%'),
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: 0.8,
        borderTopColor: Constant.Gray
    },

    headerItemContainer: {
        flex: 1,
        width: wp('50%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Constant.Gray
    },

    listContainer: {
        flex: 1
    },

    itemContainer: {
        height: 55,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: Constant.Gray
    },

    itemImage: {
        height: 23,
        width: 23,
        resizeMode: 'contain'
    },

    itemTitleText: {
        marginLeft: 12,
        fontSize: 14,
        textAlign: 'center',
    },

    itemRightTitleText: {
        marginRight: 8,
        fontSize: 14,
        textAlign: 'center',
        color: Constant.Gray,
        fontWeight: '600'
    },

    logoContainer: {
        height: 45,
        width: 45,
        marginRight: 8,
        backgroundColor: Constant.appColor3,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Constant.appColor2
    },

    logoImage: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
        tintColor: Constant.appColor4
    },

    logoImageGallery: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        bottom: 20,
        backgroundColor: Constant.appColor1
    },

    bannerContainer: {
        left: 0,
        bottom: 0
    }
})

export default styles;

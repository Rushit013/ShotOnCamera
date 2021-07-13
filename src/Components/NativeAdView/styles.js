import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Constant from '../../constants/constants';
var windowSize = Dimensions.get('window');

export default StyleSheet.create({
    rootContainer: {
        // backgroundColor: Constant.appColor2,
        flexDirection: "column",
        // flex: 1,
        width: '100%',
        // borderRadius: 10,
        // marginVertical: 10
    },

    headerContainer: {
        // flex: 1,
        minHeight: 60,
        flexDirection: 'row',
        marginBottom: 8
    },

    iconViewContainer: {
        flex: 0.16,
        backgroundColor: 'transparent'
    },

    iconView: {
        height: windowSize.width / 9,
        width: windowSize.width / 9,
        borderRadius: 10,
        backgroundColor: 'grey',
        alignSelf: 'center',
        // marginLeft: 6
    },

    headercenterBodyContainer: {
        flex: 0.84,
        backgroundColor: 'transparent',
        flexDirection: 'column'
    },

    headlineContainer: {
        flex: 0.5,
        backgroundColor: 'transparent'
    },

    headlineText: {
        marginRight: 3,
        fontSize: 16,
        fontWeight: 'bold'
    },

    sponsoredTranslationContainer: {
        flex: 0.5,
        backgroundColor: 'transparent'
    },

    sponsoredTranslationText: {
        // fontSize: 11.5,
        lineHeight: 18,
        marginRight: 3,
        fontFamily: "GoogleSans-Regular",
        color: '#515365',
        // marginTop: -1
    },

    mediaViewContainer: {
        width: '100%',
        marginHorizontal: 0,
        alignSelf: 'center',
        height: hp('15%'),
        // position: 'absolute'
    },

    mediaViewSection: {
        // flex: 1,
        height: hp('15%'),
        width: '100%',
        position: 'absolute'
    },

    advertiserNameText: {
        marginLeft: '5%',
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },

    callToActionContainer: {
        alignItems: 'center'
    },

    callToActionButton: {
        fontSize: 14,
        width: '90%',
        textAlign: 'center',
        fontWeight: '700',
        lineHeight: 36,
        height: 36,
        color: '#fff',
        borderTopWidth: 0,
        borderRadius: 3,
        backgroundColor: '#F2C67B',
        marginVertical: 8
    },

    AdChoicesViewContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#F2C67B'
    },

    translationText: {
        color: 'rgba(0,0,0,0.23)',
        position: 'absolute',
        top: 0,
        right: 30,
        height: 20,
        lineHeight: 20,
        fontSize: 13,
    }
})
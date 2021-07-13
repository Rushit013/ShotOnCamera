import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Constant from '../../constants/constants';

export default StyleSheet.create({
    modalContainer: {
        padding: 25,
        width: '85%',
        borderRadius: 15,
        backgroundColor: Constant.whiteColor,
        alignSelf: 'center'
    },

    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerAnimation : {
        height: wp('40%'),
        width: wp('40%'),
        alignSelf: 'center'
    },

    headerTitle: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },

    textInputContainer: {
        marginTop: 20,
        backgroundColor: Constant.appColor2,
        borderRadius: 10,
        paddingHorizontal: 8
    },

    bottomButtonContainer: {
        height: 35,
        width: '100%',
        flexDirection: 'row',
        marginTop: 20,
    },

    bottomButton: {
        flex: 1,
        // width: '80%',
        // marginLeft: 8,
        // marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constant.appColor1
    },

    bottomButtonText: {
        textAlign: 'center',
        marginLeft: 8,
        color: Constant.appColor2
    }

})
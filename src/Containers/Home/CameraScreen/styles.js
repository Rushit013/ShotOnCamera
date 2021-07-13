import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../constants/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusbarHeight = getStatusBarHeight();
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000'
    },

    rootContainer: {
        flex: 1,
        backgroundColor: '#000',
    },

    headerConatiner: {
        height: 50,
        width: '100%',
        marginTop: statusbarHeight,
        flexDirection: 'row',
        paddingHorizontal: 12
    },

    headerItemContainer: {
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    footerContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        backgroundColor: '#000'
    },

    previewImageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: '#FFF',
        borderWidth: 1.5,
        overflow: 'hidden'
    },

    previewImage: {
        height: 50,
        width: 50,
        resizeMode: 'cover'
    },

    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default styles;

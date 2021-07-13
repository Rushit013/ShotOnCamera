import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../../constants/constants';


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

    itemContainer: {
        height: 55,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },

    itemTitleText: {
        // marginLeft: 12,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
        color: Constant.appColor1,
    },
})

export default styles;

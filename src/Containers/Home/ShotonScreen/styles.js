import { StyleSheet, Platform } from 'react-native';
import * as Constant from '../../../constants/constants';


const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12
    },

    navigationRightButton: {
        marginRight: 16,
    },

    switchHeader: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15
    },

    switchHeaderTitleContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    switchHeaderTitle: {
        fontSize: 22,
        textAlign: 'left',
    }
})

export default styles;

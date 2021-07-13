import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import * as Constant from '../../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DATE_FONT_TYPE_ACTION } from '../../../../store/actions/status.action';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        dateFontTypeHistory: state.statusReducer.dateFontTypeHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDateTypeSelected: (payload) => { dispatch(DATE_FONT_TYPE_ACTION(payload)) },
    }
}

class AdvanceFontstyle extends React.Component {
    constructor(props) {
        super(props);

        this.formateArray = [
            { id: 0, type: 'DD/MM/YY' },
            { id: 1, type: 'DD/MM/YY, HH:mm' },
            { id: 2, type: 'DD/MM/YY, hh:mm A' },
            { id: 3, type: 'DD/MM/YY, h:mm:ss A' },
            { id: 4, type: 'DD/MM/YYYY' },
            { id: 5, type: 'DD/MM/YYYY, HH:mm' },
            { id: 6, type: 'DD/MM/YYYY, hh:mm A' },
            { id: 7, type: 'DD/MM/YYYY, h:mm:ss A' },
            { id: 8, type: 'MM/DD/YY' },
            { id: 9, type: 'MM/DD/YY, HH:mm' },
            { id: 10, type: 'MM/DD/YY, hh:mm A' },
            { id: 11, type: 'MM/DD/YY, h:mm:ss A' },
            { id: 12, type: 'MM/DD/YYYY' },
            { id: 13, type: 'MM/DD/YYYY, HH:mm' },
            { id: 14, type: 'MM/DD/YYYY, hh:mm A' },
            { id: 15, type: 'MM/DD/YYYY, h:mm:ss A' },
            { id: 16, type: 'YYYY/MM/DD' },
            { id: 17, type: 'YYYY/MM/DD, HH:mm' },
            { id: 18, type: 'YYYY/MM/DD, hh:mm A' },
            { id: 19, type: 'YYYY/MM/DD, h:mm:ss A' },
            { id: 20, type: 'DD.MM.YY' },
            { id: 21, type: 'DD.MM.YY, HH:mm' },
            { id: 22, type: 'DD.MM.YY, hh:mm A' },
            { id: 23, type: 'DD.MM.YY, h:mm:ss A' },
            { id: 24, type: 'DD.MM.YYYY' },
            { id: 25, type: 'DD.MM.YYYY, HH:mm' },
            { id: 26, type: 'DD.MM.YYYY, hh:mm A' },
            { id: 27, type: 'DD.MM.YYYY, h:mm:ss A' },
            { id: 28, type: 'MM.DD.YY' },
            { id: 29, type: 'MM.DD.YY, HH:mm' },
            { id: 30, type: 'MM.DD.YY, hh:mm A' },
            { id: 31, type: 'MM.DD.YY, h:mm:ss A' },
            { id: 32, type: 'MM.DD.YYYY' },
            { id: 33, type: 'MM.DD.YYYY, HH:mm' },
            { id: 34, type: 'MM.DD.YYYY, hh:mm A' },
            { id: 35, type: 'MM.DD.YYYY, h:mm:ss A' },
            { id: 36, type: 'DD/MMM/YYYY' },
            { id: 37, type: 'DD/MMM/YYYY, hh:mm' },
            { id: 38, type: 'DD MMM, YYYY' },
            { id: 39, type: 'DD MMM, YYYY, HH:mm' },
            { id: 40, type: 'DD MMM, YYYY, hh:mm A' },
            { id: 41, type: 'Do MMM YYYY' },
            { id: 42, type: 'Do MMM YYYY HH:mm' },
            { id: 43, type: 'Do MMM YYYY hh:mm A' },
            { id: 44, type: 'Do MMM, YYYY' },
            { id: 45, type: 'Do MMM, YYYY HH:mm' },
            { id: 46, type: 'Do MMM, YYYY, hh:mm A' },
            { id: 47, type: 'DD MMMM, YYYY' },
            { id: 48, type: 'DD MMMM, YYYY, HH:mm' },
            { id: 49, type: 'DD MMMM, YYYY, hh:mm A' },
            { id: 50, type: 'MMM DD, YYYY' },
            { id: 51, type: 'MMM DD, YYYY, HH:mm' },
            { id: 52, type: 'MMM DD, YYYY, hh:mm A' },
            { id: 53, type: 'MMMM DD, YYYY' },
            { id: 54, type: 'MMMM DD, YYYY, HH:mm' },
            { id: 55, type: 'MMMM DD, YYYY, hh:mm A' },
            { id: 56, type: 'ddd, Do MMM YYYY' },
            { id: 57, type: 'ddd, Do MMM YYYY HH:mm' },
            { id: 58, type: 'ddd, Do MMM YYYY hh:mm A' },
            { id: 59, type: 'ddd, Do MMMM YYYY' },
            { id: 60, type: 'ddd, Do MMMM YYYY HH:mm' },
            { id: 61, type: 'ddd, Do MMMM YYYY hh:mm A' },
            { id: 62, type: 'dddd, Do MMM YYYY' },
            { id: 63, type: 'dddd, Do MMM YYYY HH:mm' },
            { id: 64, type: 'dddd, Do MMM YYYY hh:mm A' },
            { id: 65, type: 'dddd, Do MMMM YYYY' },
            { id: 66, type: 'dddd, Do MMMM YYYY HH:mm' },
            { id: 67, type: 'dddd, Do MMMM YYYY hh:mm A' },
        ]

        this.state = {
            isVisible: true,
            formateArrayHolder: []
        }

    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight(),
            title: 'Font Style'
        });
        const formateArray2 = this.formateArray.map((item, index) => ({ id: item.id, type: item.type, isSelected: false }));
        this.setState({ formateArrayHolder: [...formateArray2] })
        try {
            const { id } = this.props.dateFontTypeHistory;
            this.setInitialSelected(id);
        } catch (error) {
            console.log(error)
        }
    }

    setInitialSelected = (id) => {
        this.setState(prevState => ({
            formateArrayHolder: prevState.formateArrayHolder.map(
                el => el.id === id ? { ...el, isSelected: !el.isSelected } : { ...el, isSelected: false }
            )
        }))
    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this.onDateTypeSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    onDateTypeSelected = () => {
        const { formateArrayHolder } = this.state;
        const { navigation } = this.props;
        const selectedStyle = formateArrayHolder.filter(obj => obj.isSelected === true)
        this.props.onDateTypeSelected({ id: selectedStyle[0].id, type: selectedStyle[0].type });
        navigation.goBack();
    }

    onSelectTextstyle = (item, index) => {
        this.setState(prevState => ({
            formateArrayHolder: prevState.formateArrayHolder.map(
                el => el.id === index ? { ...el, isSelected: !el.isSelected } : { ...el, isSelected: false }
            )
        }))
    }

    renderOption = ({ item, index }) => {
        // console.log(item.type)
        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onSelectTextstyle(item, index)}>
                {item.isSelected
                    ?
                    <Text style={[styles.itemTitleText, { color: '#000', fontSize: 16 }]}>{moment().format(item.type)}</Text>
                    :
                    <Text style={styles.itemTitleText}>{moment().format(item.type)}</Text>
                }
            </TouchableOpacity>
        )
    }

    listHeader = ({ item, index }) => {
        return (
            <View style={styles.itemContainer} activeOpacity={0.7}>
                <Text style={styles.itemTitleText}>Font Style</Text>
            </View>
        )
    }

    render() {
        const { formateArrayHolder } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={formateArrayHolder}
                        keyExtractor={(item, index) => index.toString()}
                        // ListHeaderComponent={({ item, index }) => this.listHeader({ item, index })}
                        renderItem={({ item, index }) => this.renderOption({ item, index })}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceFontstyle);
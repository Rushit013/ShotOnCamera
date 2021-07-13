import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import * as Constant from '../../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DATE_FONT_STYLE_ACTION } from '../../../../store/actions/status.action';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        dateFontstyleHistory: state.statusReducer.dateFontstyleHistory,
        dateFontTypeHistory: state.statusReducer.dateFontTypeHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFontstyleSelected: (payload) => { dispatch(DATE_FONT_STYLE_ACTION(payload)) },
    }
}

class AdvanceFontstyle extends React.Component {
    constructor(props) {
        super(props);

        this.fontArray = [
            { id: 0, title: 'Amatic Bold' },
            { id: 1, title: 'Amita Bold' },
            { id: 2, title: 'Amita Regular' },
            { id: 3, title: 'Arvo Regular' },
            { id: 4, title: 'Caliby' },
            { id: 5, title: 'Cookie Regular' },
            { id: 6, title: 'Dancing Script' },
            { id: 7, title: 'Julee Regular' },
            { id: 8, title: 'Kaushan Script' },
            { id: 9, title: 'Mathlete Bulky Slant' },
            { id: 10, title: 'New Walt Disney UI' },
            { id: 11, title: 'Patrick Hand' },
            { id: 12, title: 'Roboto Regular' },
            { id: 13, title: 'Tracer' },
            { id: 14, title: 'Yellowtail Regular' },
        ]

        this.state = {
            isVisible: true,
            fontArrayHolder: []
        }

    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight(),
            title: 'Font Style'
        });
        const fontArray2 = this.fontArray.map((item, index) => ({ id: item.id, title: item.title, isSelected: false }));
        this.setState({ fontArrayHolder: [...fontArray2] })
        try {
            const { id } = this.props.dateFontstyleHistory;
            this.setInitialSelected(id);
        } catch (error) {
            console.log(error)
        }
    }

    setInitialSelected = (id) => {
        this.setState(prevState => ({
            fontArrayHolder: prevState.fontArrayHolder.map(
                el => el.id === id ? { ...el, isSelected: !el.isSelected } : { ...el, isSelected: false }
            )
        }))
    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this.onFontstyleSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    onFontstyleSelected = () => {
        const { fontArrayHolder } = this.state;
        const { navigation } = this.props;
        const selectedStyle = fontArrayHolder.filter(obj => obj.isSelected === true)
        this.props.onFontstyleSelected({ id: selectedStyle[0].id, title: selectedStyle[0].title });
        navigation.goBack();
    }

    onSelectTextstyle = (item, index) => {
        this.setState(prevState => ({
            fontArrayHolder: prevState.fontArrayHolder.map(
                el => el.id === index ? { ...el, isSelected: !el.isSelected } : { ...el, isSelected: false }
            )
        }))
    }

    renderOption = ({ item, index }) => {
        if (this.props.dateFontTypeHistory === undefined) {
            return (
                <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onSelectTextstyle(item, index)}>
                    {item.isSelected
                        ?
                        <Text style={[styles.itemTitleText, { fontFamily: item.title, color: '#000', fontSize: 16 }]}>{moment().format('DD/MM/YYYY')}</Text>
                        :
                        <Text style={[styles.itemTitleText, { fontFamily: item.title }]}>{moment().format('DD/MM/YYYY')}</Text>
                    }
                </TouchableOpacity>
            )
        } else {
            const { type } = this.props.dateFontTypeHistory;

            return (
                <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onSelectTextstyle(item, index)}>
                    {item.isSelected
                        ?
                        <Text style={[styles.itemTitleText, { fontFamily: item.title, color: '#000', fontSize: 16 }]}>{moment().format(type)}</Text>
                        :
                        <Text style={[styles.itemTitleText, { fontFamily: item.title }]}>{moment().format(type)}</Text>
                    }
                </TouchableOpacity>
            )
        }
    }

    listHeader = ({ item, index }) => {
        return (
            <View style={styles.itemContainer} activeOpacity={0.7}>
                <Text style={styles.itemTitleText}>Font Style</Text>
            </View>
        )
    }

    render() {
        const { fontArrayHolder } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={fontArrayHolder}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={({ item, index }) => this.listHeader({ item, index })}
                        renderItem={({ item, index }) => this.renderOption({ item, index })}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceFontstyle);
import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';
import Feather from 'react-native-vector-icons/Feather';
import { SlidersColorPicker } from 'react-native-color';
import tinycolor from 'tinycolor2';
import { connect } from 'react-redux';
import { DATE_FONT_COLOR_ACTION } from '../../../store/actions/status.action';
import moment from 'moment';

const mapStateToProps = (state) => {
    return {
        dateFontTypeHistory: state.statusReducer.dateFontTypeHistory,
        dateFontstyleHistory: state.statusReducer.dateFontstyleHistory,
        dateFontColorHistory: state.statusReducer.dateFontColorHistory,
        dateFontSizeHistory: state.statusReducer.dateFontSizeHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFontColorSelected: (payload) => { dispatch(DATE_FONT_COLOR_ACTION(payload)) },
    }
}


class AdvanceScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
            color: `#${tinycolor('#000').toHex()}`
        }

    }

    componentDidMount() {
        try {
            const { dateFontColorHistory } = this.props;
            this.setState({ color: dateFontColorHistory })
        } catch (error) {
            console.log(error)
        }
    }

    onOptionNavigate = (screenName) => {
        const { navigate } = this.props.navigation;
        navigate(screenName)
    }

    onColorSelect = (colorHex) => {
        console.log(colorHex)
        this.setState({
            modalVisible: false,
            color: colorHex
        });
        this.setState({
            recents: [
                colorHex,
                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
            ]
        });
        this.props.onFontColorSelected(colorHex)
    }


    render() {
        const { color } = this.state;
        // console.log(this.props.dateFontSizeHistory)
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('DateFormate')}>
                        <Image source={require('../../../assets/image/calendar.png')} style={styles.itemImage} />
                        <Text style={styles.itemTitleText}>Date Formate</Text>
                        <View style={{ flex: 1 }}></View>
                        {this.props.dateFontTypeHistory !== undefined
                            &&
                            <Text style={styles.itemRightTitleText}>{moment().format(this.props.dateFontTypeHistory.type)}</Text>
                        }
                        <Feather name="chevron-right" size={20} color={Constant.Gray} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('DateFontSize')}>
                        <Image source={require('../../../assets/image/resize.png')} style={styles.itemImage} />
                        <Text style={styles.itemTitleText}>Font Size</Text>
                        <View style={{ flex: 1 }}></View>
                        {this.props.dateFontSizeHistory !== undefined
                            &&
                            <Text style={styles.itemRightTitleText}>{this.props.dateFontSizeHistory}</Text>
                        }
                        <Feather name="chevron-right" size={20} color={Constant.Gray} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('DateFontstyle')}>
                        {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                        <Image source={require('../../../assets/image/fonts.png')} style={styles.itemImage} />
                        <Text style={styles.itemTitleText}>Font Style</Text>
                        <View style={{ flex: 1 }}></View>
                        {this.props.dateFontstyleHistory !== undefined
                            &&
                            <Text style={[styles.itemRightTitleText, { fontFamily: this.props.dateFontstyleHistory.title }]}>{moment().format(this.props.dateFontTypeHistory !== undefined ? this.props.dateFontTypeHistory.type : 'DD/MM/YYYY')}</Text>
                        }
                        <Feather name="chevron-right" size={20} color={Constant.Gray} />
                    </TouchableOpacity>

                    <SlidersColorPicker
                        visible={this.state.modalVisible}
                        color={this.state.color}
                        returnMode={'hex'}
                        onCancel={() => this.setState({ modalVisible: false })}
                        onOk={colorHex => this.onColorSelect(colorHex)}
                        swatches={this.state.recents}
                        swatchesLabel="RECENTS"
                        okLabel="Done"
                        cancelLabel="Cancel"
                    />
                    <TouchableOpacity style={styles.itemContainer} onPress={() => this.setState({ modalVisible: true })}>
                        {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                        <Image source={require('../../../assets/image/color_wheel.png')} style={styles.itemImage} />
                        <Text style={styles.itemTitleText}>Font Color</Text>
                        <View style={{ flex: 1 }}></View>
                        <View style={[styles.selecedColorContainer, { backgroundColor: color, borderColor: color === '#000000' ? Constant.whiteColor : '#000'  }]}></View>
                        <Feather name="chevron-right" size={20} color={Constant.Gray} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceScreen);

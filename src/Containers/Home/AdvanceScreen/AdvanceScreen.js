import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';
import Feather from 'react-native-vector-icons/Feather';
import { SlidersColorPicker } from 'react-native-color';
import tinycolor from 'tinycolor2';
import { connect } from 'react-redux';
import { AD_FONT_COLOR_ACTION, IS_LOGO_TOGGLE_ACTION } from '../../../store/actions/status.action';
import ToggleSwitch from 'toggle-switch-react-native';
import NativeAdView from '../../../Components/NativeAdView';
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';

const mapStateToProps = (state) => {
    return {
        advancedFontstyleHistory: state.statusReducer.advancedFontstyleHistory,
        stampPositionHistory: state.statusReducer.stampPositionHistory,
        advancedFontColorHistory: state.statusReducer.advancedFontColorHistory,
        advancedFontSizeHistory: state.statusReducer.advancedFontSizeHistory,
        dateFontSizeHistory: state.statusReducer.dateFontSizeHistory,
        isLogoToggleHistory: state.statusReducer.isLogoToggleHistory,
        fontPositionHistory: state.statusReducer.fontPositionHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFontColorSelected: (payload) => { dispatch(AD_FONT_COLOR_ACTION(payload)) },
        onlogoToggleSelected: (payload) => { dispatch(IS_LOGO_TOGGLE_ACTION(payload)) },
    }
}


class AdvanceScreen extends React.Component {
    constructor(props) {
        super(props);

        this.adsManager = new NativeAdsManager(nativeAdPlacementId, 10);

        this.state = {
            logoToggle: true,
            textToggle: false,
            modalVisible: false,
            recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
            color: `#${tinycolor('#000').toHex()}`
        }

    }

    componentDidMount() {
        try {
            const { advancedFontColorHistory, isLogoToggleHistory } = this.props;
            this.props.navigation.setOptions({ title: 'Advanced' })
            this.setState({ color: advancedFontColorHistory, logoToggle: isLogoToggleHistory, textToggle: !isLogoToggleHistory });

        } catch (error) {
            console.log(error)
        }
    }

    onOptionNavigate = (screenName) => {
        const { navigate } = this.props.navigation;
        navigate(screenName)
    }

    _showAdonColorSelect = (colorHex) => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onColorSelect(colorHex))
            .catch(() => this.onColorSelect(colorHex));
    }

    onColorSelect = (colorHex) => {
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

    onlogoToggle = (isOn) => {
        this.setState({ logoToggle: isOn, textToggle: !isOn });
        this.props.onlogoToggleSelected(isOn)
    }

    onTextToggle = (isOn) => {
        this.setState({ textToggle: isOn, logoToggle: !isOn });
        this.props.onlogoToggleSelected(!isOn)
    }


    render() {
        const { color, logoToggle, textToggle } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <ScrollView>
                        <NativeAdView adsManager={this.adsManager} />

                        <View style={styles.itemContainer}>
                            <Text style={[styles.itemTitleText, { marginLeft: 0 }]}>Watermark Logo</Text>
                            <View style={{ flex: 1 }}></View>
                            <ToggleSwitch
                                isOn={logoToggle}
                                onColor={Constant.appColor1}
                                offColor={Constant.appColor2}
                                size="medium"
                                onToggle={isOn => this.onlogoToggle(isOn)}
                            />
                        </View>

                        <View style={styles.itemContainer}>
                            <Text style={[styles.itemTitleText, { marginLeft: 0 }]}>Watermark Text</Text>
                            <View style={{ flex: 1 }}></View>
                            <ToggleSwitch
                                isOn={textToggle}
                                onColor={Constant.appColor1}
                                offColor={Constant.appColor2}
                                size="medium"
                                onToggle={isOn => this.onTextToggle(isOn)}
                            />
                        </View>

                        <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('StampPosition')}>
                            <Image source={require('../../../assets/image/post_stamp.png')} style={styles.itemImage} />
                            <Text style={styles.itemTitleText}>Logo Position</Text>
                            <View style={{ flex: 1 }}></View>
                            {this.props.stampPositionHistory !== undefined
                                &&
                                <Text style={styles.itemRightTitleText}>{this.props.stampPositionHistory.title}</Text>
                            }
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('StampSize')}>
                            <Image source={require('../../../assets/image/resize.png')} style={styles.itemImage} />
                            <Text style={styles.itemTitleText}>Logo Size</Text>
                            <View style={{ flex: 1 }}></View>
                            {this.props.advancedFontSizeHistory !== undefined
                                &&
                                <Text style={styles.itemRightTitleText}>{this.props.advancedFontSizeHistory}</Text>
                            }
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('FontPosition')}>
                            <Image source={require('../../../assets/image/text_position.png')} style={styles.itemImage} />
                            <Text style={styles.itemTitleText}>Font Position</Text>
                            <View style={{ flex: 1 }}></View>
                            {this.props.fontPositionHistory !== undefined
                                &&
                                <Text style={styles.itemRightTitleText}>{this.props.fontPositionHistory.title}</Text>
                            }
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('AdvanceFontstyle')}>
                            {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                            <Image source={require('../../../assets/image/fonts.png')} style={styles.itemImage} />
                            <Text style={styles.itemTitleText}>Font Style</Text>
                            <View style={{ flex: 1 }}></View>
                            {this.props.advancedFontstyleHistory !== undefined
                                &&
                                <Text style={[styles.itemRightTitleText, { fontFamily: this.props.advancedFontstyleHistory.title }]}>{this.props.advancedFontstyleHistory.title}</Text>
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

                        <SlidersColorPicker
                            visible={this.state.modalVisible}
                            color={this.state.color}
                            returnMode={'hex'}
                            onCancel={() => this.setState({ modalVisible: false })}
                            onOk={colorHex => this._showAdonColorSelect(colorHex)}
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
                            <View style={[styles.selecedColorContainer, { backgroundColor: color, borderColor: color === '#000000' ? Constant.whiteColor : '#000' }]}></View>
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceScreen);

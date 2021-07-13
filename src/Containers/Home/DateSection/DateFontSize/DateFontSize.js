import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import styles from './styles';
import * as Constant from '../../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { DATE_FONT_SIZE_ACTION } from '../../../../store/actions/status.action';
import Slider from 'react-native-slider';
import * as staticAction from '../../../../constants/staticAction'
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';

const mapStateToProps = (state) => {
    return {
        advancedFontstyleHistory: state.statusReducer.advancedFontstyleHistory,
        dateFontSizeHistory: state.statusReducer.dateFontSizeHistory,
        fontPositionHistory: state.statusReducer.fontPositionHistory,
        markedTextHistory: state.statusReducer.markedTextHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFontSizeSelected: (payload) => { dispatch(DATE_FONT_SIZE_ACTION(payload)) },
    }
}

class DateFontSize extends React.Component {
    constructor(props) {
        super(props);

        this.positionArray = [
            { id: 0, title: 'Top Left' },
            { id: 1, title: 'Top Right' },
            { id: 2, title: 'Bottom Left' },
            { id: 3, title: 'Bottom Right' },
        ]

        this.state = {
            sliderValue: 12
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });
        this.props.navigation.setOptions({ title: 'Font Size' })

        try {
            const { dateFontSizeHistory } = this.props;
            console.log(dateFontSizeHistory)
            if (dateFontSizeHistory !== undefined) {
                this.setState({ sliderValue: dateFontSizeHistory })
            }
        } catch (error) {
            console.log(error)
        }
    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this._showAdonFontSizeSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    _showAdonFontSizeSelected = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onFontSizeSelected())
            .catch(() => this.onFontSizeSelected());
    }

    onFontSizeSelected = () => {
        const { sliderValue } = this.state;
        const { navigation } = this.props;
        this.props.onFontSizeSelected(sliderValue);
        navigation.goBack();
    }

    renderLogoByposition = () => {
        const { selectedIndex } = this.state;
        const { markedTextHistory, advancedFontstyleHistory } = this.props;
        const { id, title } = this.props.fontPositionHistory;
        const sliderScale = staticAction.normalize(this.state.sliderValue + 25);
        switch (id) {
            case 0:
                return (
                    <View style={[styles.logoContainer, {
                        left: 15,
                        top: 15
                    }]}>
                        <Text style={[styles.overlayText, { fontSize: staticAction.normalize(this.state.sliderValue), fontFamily: advancedFontstyleHistory.title }]}>{markedTextHistory}</Text>
                    </View>
                )
            case 1:
                return (
                    <View style={[styles.logoContainer, {
                        top: 15,
                        right: 15
                    }]}>
                        <Text style={[styles.overlayText, { fontSize: staticAction.normalize(this.state.sliderValue), fontFamily: advancedFontstyleHistory.title }]}>{markedTextHistory}</Text>
                    </View>
                )
            case 2:
                return (
                    <View style={[styles.logoContainer, {
                        bottom: 15,
                        left: 15
                    }]}>
                        <Text style={[styles.overlayText, { fontSize: staticAction.normalize(this.state.sliderValue), fontFamily: advancedFontstyleHistory.title }]}>{markedTextHistory}</Text>
                    </View>
                )
            case 3:
                return (
                    <View style={[styles.logoContainer, {
                        bottom: 15,
                        right: 15
                    }]}>
                        <Text style={[styles.overlayText, { fontSize: staticAction.normalize(this.state.sliderValue), fontFamily: advancedFontstyleHistory.title }]}>{markedTextHistory}</Text>
                    </View>
                )
        }
    }

    render() {
        const { selectedIndex } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../../../../assets/image/preview_image.jpg')} resizeMode="cover" style={styles.backgroundImageContainer}>
                        </Image>
                        {this.renderLogoByposition()}
                    </View>

                    <View style={styles.bottomContainer}>
                        <Slider
                            value={this.state.sliderValue}
                            minimumValue={7}
                            maximumValue={35}
                            // trackStyle={{ flex: 1 }}
                            style={styles.sliderContainer}
                            step={1}
                            onValueChange={(value) => this.setState({ sliderValue: value })} />
                    </View>
                    {/* <Text style={{ fontSize: staticAction.normalize(this.state.sliderValue) }}>Value: {this.state.sliderValue}</Text> */}

                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFontSize);
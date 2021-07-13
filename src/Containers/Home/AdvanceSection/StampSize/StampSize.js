import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import styles from './styles';
import * as Constant from '../../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { AD_FONT_SIZE_ACTION } from '../../../../store/actions/status.action';
import Slider from 'react-native-slider';
import * as staticAction from '../../../../constants/staticAction'
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';

const mapStateToProps = (state) => {
    return {
        advancedFontSizeHistory: state.statusReducer.advancedFontSizeHistory,
        stampPositionHistory: state.statusReducer.stampPositionHistory,
        logoHistory: state.statusReducer.logoHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFontSizeSelected: (payload) => { dispatch(AD_FONT_SIZE_ACTION(payload)) },
    }
}

class StampSize extends React.Component {
    constructor(props) {
        super(props);

        this.positionArray = [
            { id: 0, title: 'Top Left' },
            { id: 1, title: 'Top Right' },
            { id: 2, title: 'Bottom Left' },
            { id: 3, title: 'Bottom Right' },
        ]

        this.state = {
            sliderValue: 7
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });
        this.props.navigation.setOptions({ title: 'Logo Size' })
        try {
            const { advancedFontSizeHistory } = this.props;
            if (advancedFontSizeHistory !== undefined) {
                this.setState({ sliderValue: advancedFontSizeHistory })
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
        const { id, title } = this.props.stampPositionHistory;
        const sliderScale = staticAction.normalize(this.state.sliderValue + 25);
        const logoScale = { height: sliderScale, width: sliderScale }
        switch (id) {
            case 0:
                return (
                    <View style={[styles.logoContainer, {
                        left: 15,
                        top: 15
                    }]}>
                        {this.props.logoHistory.isLocal
                            ?
                            <Image source={this.props.logoHistory.img} style={[styles.logoImage, { ...logoScale }]} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={[styles.logoImageGallery, { ...logoScale }]} />
                        }
                    </View>
                )
            case 1:
                return (
                    <View style={[styles.logoContainer, {
                        top: 15,
                        right: 15
                    }]}>
                        {this.props.logoHistory.isLocal
                            ?
                            <Image source={this.props.logoHistory.img} style={[styles.logoImage, { ...logoScale }]} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={[styles.logoImageGallery, { ...logoScale }]} />
                        }
                    </View>
                )
            case 2:
                return (
                    <View style={[styles.logoContainer, {
                        bottom: 15,
                        left: 15
                    }]}>
                        {this.props.logoHistory.isLocal
                            ?
                            <Image source={this.props.logoHistory.img} style={[styles.logoImage, { ...logoScale }]} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={[styles.logoImageGallery, { ...logoScale }]} />
                        }
                    </View>
                )
            case 3:
                return (
                    <View style={[styles.logoContainer, {
                        bottom: 15,
                        right: 15
                    }]}>
                        {this.props.logoHistory.isLocal
                            ?
                            <Image source={this.props.logoHistory.img} style={[styles.logoImage, { ...logoScale }]} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={[styles.logoImageGallery, { ...logoScale }]} />
                        }
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
                            maximumValue={30}
                            style={{ flex: 1 }}
                            step={1}
                            onValueChange={(value) => this.setState({ sliderValue: value })} />
                    </View>
                    {/* <Text style={{ fontSize: staticAction.normalize(this.state.sliderValue) }}>Value: {this.state.sliderValue}</Text> */}

                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StampSize);
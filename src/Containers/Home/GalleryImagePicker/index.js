/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as Constant from '../../../constants/constants';
import CameraRollPicker from 'react-native-camera-roll-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Marker, { Position, ImageFormat } from 'react-native-image-marker'
import CameraRoll from "@react-native-community/cameraroll";
import * as staticAction from '../../../constants/staticAction'
import Toast from 'react-native-simple-toast';
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
        logoHistory: state.statusReducer.logoHistory,
        markedTextHistory: state.statusReducer.markedTextHistory,
    }
}

class GalleryImagePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0,
            selected: [],
            resultImage: null,
            isLogoImage: false
        };

        this.getSelectedImages = this.getSelectedImages.bind(this);
    }

    componentDidMount() {
        const { fromScreen } = this.props.route.params;
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });

        this.props.navigation.setOptions({ title: '0 images has been selected' });

        if (fromScreen === 'LogoSelect') {
            this.setState({ isLogoImage: true })
        }
    }

    onSelectLogo = () => {
        const { selected } = this.state;
        const { navigation, route } = this.props;
        // navigation.state.params.onSelect(selected)
        route.params.onGalleryLogo(selected[0].uri);
        navigation.goBack();
    }

    setHeaderRight = state => {
        const { isLogoImage } = this.state;
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    isLogoImage ? this.onSelectLogo() :
                    this._showAdaddStamponImage();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    _showAdaddStamponImage = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.addStamponImage())
            .catch(() => this.addStamponImage());
    }

    getMarkerPosition = (position) => {
        switch (position) {
            case 'Top Left': return Position.topLeft
            case 'Top Right': return Position.topRight
            case 'Bottom Left': return Position.bottomLeft
            case 'Bottom Right': return Position.bottomRight
            default: return Position.bottomRight
        }
    }

    addStamponImage = () => {
        const { selected } = this.state;
        const { isLogoToggleHistory, logoHistory, stampPositionHistory, markedTextHistory, advancedFontColorHistory,
            advancedFontstyleHistory, advancedFontSizeHistory, fontPositionHistory, dateFontSizeHistory } = this.props;

        if (isLogoToggleHistory) {
            let count = 0;
            const logoScale = advancedFontSizeHistory / 30;
            selected.forEach((item, index) => {
                count++;
                Marker.markImage({
                    src: item.uri,
                    markerSrc: logoHistory.img,
                    position: this.getMarkerPosition(stampPositionHistory.title),  // topLeft, topCenter,topRight, bottomLeft, bottomCenter , bottomRight, center
                    scale: 1,
                    markerScale: logoHistory.isLocal ? logoScale < 0.4 ? 0.4 : logoScale : logoScale < 0.6 ? 0.1 : 0.2,
                    quality: 100
                }).then((path) => {
                    const resultUri = Platform.OS === 'android' ? 'file://' + path : path;
                    // this.setState({
                    //     resultImage: Platform.OS === 'android' ? 'file://' + path : path,
                    //     loading: false
                    // })
                    CameraRoll.save(resultUri, { type: "photo", album: 'ShotOnStamp' })
                }).catch((err) => {
                    console.log(err, 'err')
                    this.setState({
                        loading: false,
                        err
                    })
                })

                if (count === selected.length) {
                    Toast.show('Add stamp successfully', Toast.SHORT);
                }
            })
        } else {
            let count = 0;
            const fontsizeScale = staticAction.normalize(dateFontSizeHistory + 18);

            selected.forEach((item, index) => {
                count++;
                Marker.markText({
                    src: item.uri,
                    text: String(markedTextHistory),
                    position: this.getMarkerPosition(fontPositionHistory.title),
                    color: advancedFontColorHistory,
                    fontName: advancedFontstyleHistory.title,
                    fontSize: fontsizeScale,
                    scale: 1,
                    quality: 100
                }).then((path) => {
                    // console.log("the path is" + path)
                    // this.setState({
                    //     loading: false,
                    //     markResult: res
                    // })
                    const resultUri = Platform.OS === 'android' ? 'file://' + path : path;
                    // this.setState({
                    //     resultImage: Platform.OS === 'android' ? 'file://' + path : path,
                    //     loading: false
                    // })
                    CameraRoll.save(resultUri, { type: "photo", album: 'ShotOnStamp' })
                }).catch((err) => {
                    console.log(err)
                    this.setState({
                        loading: false,
                        err
                    })
                })

                if (count === selected.length) {
                    Toast.show('Add stamp successfully', Toast.SHORT);
                }
            })
        }
    }

    getSelectedImages(images, current) {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });

        this.props.navigation.setOptions({ title: `${num} images has been selected` });

        // console.log('------')
        // console.log(current);
        // console.log(this.state.selected);
    }

    render() {
        const { isLogoImage } = this.state;
        return (
            <View style={styles.container}>
                {/* <View>
                    {this.state.resultImage !== null
                        &&
                        <Image source={{ uri: this.state.resultImage }} style={{ height: 250, width: 250 }} resizeMode="contain" />
                    }
                </View> */}
                <CameraRollPicker
                    groupTypes='SavedPhotos'
                    maximum={3}
                    selectSingleItem={isLogoImage}
                    selected={this.state.selected}
                    assetType='Photos'
                    imagesPerRow={3}
                    imageMargin={5}
                    callback={this.getSelectedImages} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6AE2D',
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 16,
        alignItems: 'center',
        color: '#fff',
    },
    bold: {
        fontWeight: 'bold',
    },
    info: {
        fontSize: 12,
    },
    navigationRightButton: {
        marginRight: 16,
    },
});

export default connect(mapStateToProps)(GalleryImagePicker);

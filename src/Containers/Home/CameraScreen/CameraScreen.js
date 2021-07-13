'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, StatusBar, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ToastAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { connect } from 'react-redux';
import Marker, { Position, ImageFormat } from 'react-native-image-marker'
import * as staticAction from '../../../constants/staticAction'
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';
// import ShowClickedImageComponent from './components/ShowClickedImageComponent';
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

class CameraScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            cameraPosition: 1,      // 0 for front , 1 for back
            flash: "OFF",
            flashCount: 0,          // 0:OFF,1:ON,2:AUTO,3:TORCH
            clickedImageUri: "",
            clickedImageUriHolder: []
            // showImage:false     
        }
        this.flipCamera = this.flipCamera.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this.handleFlash = this.handleFlash.bind(this);

        async function requestCameraPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Ocr App Camera Permission',
                        message:
                            'Ocr App needs access to your camera',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');
                } else {
                    console.log('Camera permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
        // for storage read
        async function requestStorageReadPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Ocr App Storage read Permission',
                        message:
                            'Ocr App needs access to your storage for read',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the Ocr App for reading.');
                } else {
                    console.log('Read permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
        // for Storage Write 
        async function requestStorageWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Ocr App Storage Write Permission',
                        message:
                            'Ocr App needs access to your storage for Write ',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the Ocr App for writting.');
                } else {
                    console.log('Write permission denied.');
                }
            } catch (err) {
                console.warn(err);
            }
        }
        // call for permision grant
        if (Platform.OS === 'android') {
            requestCameraPermission();      // camera
            requestStorageReadPermission(); // for storage read
            requestStorageWritePermission(); // for storage write
        } else {
            alert('Android  device NOT found');
        }

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

    addStamponImage = (imgURI) => {
        const { clickedImageUriHolder } = this.state;
        const { isLogoToggleHistory, logoHistory, stampPositionHistory, markedTextHistory, advancedFontColorHistory,
            advancedFontstyleHistory, advancedFontSizeHistory, fontPositionHistory, dateFontSizeHistory } = this.props;
        let resultUriHolder = [...clickedImageUriHolder];

        if (isLogoToggleHistory) {
            let count = 0;
            const logoScale = advancedFontSizeHistory / 30;
            Marker.markImage({
                src: imgURI,
                markerSrc: logoHistory.img,
                position: this.getMarkerPosition(stampPositionHistory.title),  // topLeft, topCenter,topRight, bottomLeft, bottomCenter , bottomRight, center
                scale: 1,
                markerScale: logoHistory.isLocal ? logoScale < 0.4 ? 0.4 : logoScale : logoScale < 0.6 ? 0.1 : 0.2,
                quality: 100
            }).then((path) => {
                const resultUri = Platform.OS === 'android' ? 'file://' + path : path;
                resultUriHolder.push(resultUri);
                // this.setState({
                //     resultImage: Platform.OS === 'android' ? 'file://' + path : path,
                //     loading: false
                // })
                CameraRoll.save(resultUri, { type: "photo", album: 'ShotOnStamp' }).then(() => {
                    this.setState({ clickedImageUriHolder: [...resultUriHolder] })
                })
            }).catch((err) => {
                console.log(err, 'err')
                this.setState({
                    loading: false,
                    err
                })
            })
        } else {
            const fontsizeScale = staticAction.normalize(dateFontSizeHistory + 18);

            Marker.markText({
                src: imgURI,
                text: String(markedTextHistory),
                position: this.getMarkerPosition(fontPositionHistory.title),
                color: advancedFontColorHistory,
                fontName: advancedFontstyleHistory.title,
                fontSize: fontsizeScale,
                scale: 1,
                quality: 100
            }).then((path) => {
                console.log("the path is" + path)
                // this.setState({
                //     loading: false,
                //     markResult: res
                // })
                const resultUri = Platform.OS === 'android' ? 'file://' + path : path;
                resultUriHolder.push(resultUri);
                // this.setState({
                //     resultImage: Platform.OS === 'android' ? 'file://' + path : path,
                //     loading: false
                // })
                CameraRoll.save(resultUri, { type: "photo", album: 'ShotOnStamp' }).then(() => {
                    this.setState({ clickedImageUriHolder: [...resultUriHolder] })
                })
                // CameraRoll.save(resultUri, { type: "photo", album: 'ShotOnStamp' })
            }).catch((err) => {
                console.log(err)
                this.setState({
                    loading: false,
                    err
                })
            })
        }
    }

    flipCamera() {
        console.log("Flipping the camera mode");
        var bool1 = this.state.cameraPosition;
        this.setState({
            cameraPosition: !bool1
        });
    }

    handleFlash() {
        //alert("handle flash");
        var flashCount = this.state.flashCount + 1;
        flashCount = flashCount % 4;

        this.setState({ flashCount: flashCount });

        if (flashCount == 0) {
            this.setState({ flash: "OFF" });
        }
        else if (flashCount == 1) {
            this.setState({ flash: "ON" });
        }
        else if (flashCount == 2) {
            this.setState({ flash: "AUTO" });
        }
        else if (flashCount == 3) {
            this.setState({ flash: "TORCH" });
        }
    }

    _showAdonGalleryView = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onGalleryView())
            .catch(() => this.onGalleryView());
    }
  
    onGalleryView = () => {
        const { clickedImageUriHolder } = this.state;
        const { navigate } = this.props.navigation;
        navigate('GalleryView', { imageData: clickedImageUriHolder })
    }

    render() {
        const { navigation } = this.props;
        const { clickedImageUriHolder } = this.state;
        var typeCamera = this.state.cameraPosition ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front;

        var flashMode = "";
        if (this.state.flashCount == 0) {
            flashMode = RNCamera.Constants.FlashMode.off;

        }
        else if (this.state.flashCount == 1) {
            flashMode = RNCamera.Constants.FlashMode.on;
        }
        else if (this.state.flashCount == 2) {
            flashMode = RNCamera.Constants.FlashMode.auto;
            // alert("auto : " + flashMode);
        }
        else if (this.state.flashCount == 3) {
            flashMode = RNCamera.Constants.FlashMode.torch;
        }

        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />
                <View style={styles.rootContainer}>
                    <View style={styles.headerConatiner}>
                        <TouchableOpacity activeOpacity={0.7} onPress={this.handleFlash} style={[styles.headerItemContainer, { flexDirection: 'row' }]}>
                            <Icon
                                name="flash"
                                size={30}
                                color={"#fff"}
                            />
                            <Text style={{ marginLeft: 8, color: '#FFF' }}>{this.state.flash}</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.headerItemContainer}>
                            <Text style={{ color: '#FFF' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={typeCamera}
                        flashMode={flashMode}

                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    />

                    <View style={styles.footerContainer}>
                        <View style={styles.centerContainer}>
                            {clickedImageUriHolder.length > 0
                                &&
                                <TouchableOpacity style={styles.previewImageContainer} onPress={this._showAdonGalleryView}>
                                    <Image
                                        source={{ uri: clickedImageUriHolder[clickedImageUriHolder.length - 1] }}
                                        style={styles.previewImage}
                                    />
                                </TouchableOpacity>
                            }
                        </View>

                        <TouchableOpacity style={styles.centerContainer}>
                            <Icon.Button
                                name="camera"
                                size={50}
                                backgroundColor="black"
                                onPress={this.takePicture}
                            >
                            </Icon.Button>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.centerContainer}>
                            <Icon.Button
                                name="refresh"
                                size={40}
                                backgroundColor="black"
                                onPress={this.flipCamera}
                            >
                            </Icon.Button>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        );
    }

    takePicture = async () => {

        if (this.camera) {

            /**TODO: save clicked image into Folder of phone  */
            const options = { quality: 0.5 };
            const data = await this.camera.takePictureAsync(options).then(data => {
                // CameraRoll.saveToCameraRoll(data.uri);

                // this.setState({ clickedImageUri: data.uri }); // save clicked image uri to preview

                // console.log("clicked Image Data : " + data);
                // console.log("clicked Image URI : " + data.uri);

                this.addStamponImage(data.uri)

            });
        }

    }
};

export default connect(mapStateToProps)(CameraScreen);
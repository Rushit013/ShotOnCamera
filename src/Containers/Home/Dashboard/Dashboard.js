import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { FAB } from 'react-native-paper';
import EnterText from '../../../Components/EnterText/EnterText';
import { MARKED_TEXT_ACTION } from '../../../store/actions/status.action';
import Permissions from '../../../config/Permissions';
import { getDeviceName, getBrand } from 'react-native-device-info';
import NativeAdView from '../../../Components/NativeAdView';
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';
import DashboardOperation from '../../../constants/DashboardOperation';
import SplashScreen from 'react-native-splash-screen';

const mapStateToProps = (state) => {
    return {
        logoHistory: state.statusReducer.logoHistory,
        deviceNameHistory: state.statusReducer.deviceNameHistory,
        shotByHistory: state.statusReducer.shotByHistory,
        markedTextHistory: state.statusReducer.markedTextHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMarkedtextSelected: (payload) => { dispatch(MARKED_TEXT_ACTION(payload)) },
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.adsManager = new NativeAdsManager(nativeAdPlacementId, 10);

        this.state = {
            isShowModal: false,
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
        }
    }

    async componentDidMount() {
        SplashScreen.hide();
        // const DeviceHash = await AdSettings.currentDeviceHash;
        // AdSettings.clearTestDevices();
        // AdSettings.addTestDevice(DeviceHash);
    }

    onOptionNavigate = (screenName) => {
        const { navigate } = this.props.navigation;
        navigate(screenName)
    }

    _showAdongetMarkertext = (text) => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.getMarkertext(text))
            .catch(() => this.getMarkertext(text));
    }

    getMarkertext = (text) => {
        this.props.onMarkedtextSelected(text);
        this.setState({ isShowModal: false })
    }

    onSelectGallery = () => {
        const { navigate } = this.props.navigation;
        navigate('GalleryImagePicker', {
            fromScreen: 'Dashboard'
        })
    }

    onSelectCamera = async () => {
        const { navigate } = this.props.navigation;
        await Permissions.requestPermissions('camera');
        navigate('CameraScreen')
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <ScrollView>
                        <NativeAdView adsManager={this.adsManager} />
                        <View style={styles.shotOnOptionContainer}>
                            <TouchableOpacity style={[styles.headerItemContainer, { borderRightWidth: 0.8, borderRightColor: Constant.Gray }]} onPress={this.onSelectCamera}>
                                <MaterialIcons name="camera-alt" size={30} color="#000" />
                                <Text>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.headerItemContainer, { borderLeftWidth: 0.8, borderLeftColor: Constant.Gray }]} onPress={this.onSelectGallery}>
                                <Fontisto name="photograph" size={30} color="#000" />
                                <Text>Gallery</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onOptionNavigate('LogoSelect')}>
                                <Image source={require('../../../assets/image/picture.png')} style={styles.itemImage} />
                                <Text style={styles.itemTitleText}>Logo</Text>
                                <View style={{ flex: 1 }}></View>
                                {this.props.logoHistory !== undefined
                                    &&
                                    <View style={styles.logoContainer} activeOpacity={0.7}>
                                        {
                                            this.props.logoHistory.isLocal
                                                ?
                                                <Image source={this.props.logoHistory.img} style={styles.logoImage} />
                                                :
                                                <Image source={{ uri: this.props.logoHistory.img }} style={styles.logoImageGallery} />
                                        }
                                    </View>
                                }

                                <Feather name="chevron-right" size={20} color={Constant.Gray} />
                            </TouchableOpacity>

                            <EnterText isShowModal={this.state.isShowModal}
                                DonePress={this._showAdongetMarkertext}
                                cancelPress={() => this.setState({ isShowModal: false })} />

                            <TouchableOpacity style={styles.itemContainer} onPress={() => this.setState({ isShowModal: true })}>
                                <Image source={require('../../../assets/image/text.png')} style={[styles.itemImage, { height: 25, width: 25 }]} />
                                <Text style={styles.itemTitleText}>Text</Text>
                                <View style={{ flex: 1 }}></View>
                                {this.props.markedTextHistory !== undefined
                                    &&
                                    <Text style={styles.itemRightTitleText}>{this.props.markedTextHistory}</Text>
                                }
                                <Feather name="chevron-right" size={20} color={Constant.Gray} />
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('ShotonScreen')}>
                            <Image source={require('../../../assets/image/mobile_phone.png')} style={[styles.itemImage, { height: 25, width: 25 }]} />
                            <Text style={styles.itemTitleText}>Shot On</Text>
                            <View style={{ flex: 1 }}></View>
                            {this.props.deviceNameHistory !== undefined
                                &&
                                <Text style={styles.itemRightTitleText}>{this.props.deviceNameHistory}</Text>
                            }
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('ShotbyScreen')}>
                            <Image source={require('../../../assets/image/user.png')} style={styles.itemImage} />
                            <Text style={styles.itemTitleText}>Shot By</Text>
                            <View style={{ flex: 1 }}></View>
                            {this.props.shotByHistory !== undefined
                                &&
                                <Text style={styles.itemRightTitleText}>{this.props.shotByHistory.yourName}</Text>
                            }
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity> */}

                            <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('AdvanceScreen')}>
                                {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                                <Image source={require('../../../assets/image/grid.png')} style={styles.itemImage} />
                                <Text style={styles.itemTitleText}>Advanced</Text>
                                <View style={{ flex: 1 }}></View>
                                <Feather name="chevron-right" size={20} color={Constant.Gray} />
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={styles.itemContainer} onPress={() => this.onOptionNavigate('DateAdvanceScreen')}>
                            <Image source={require('../../../assets/image/calendar.png')} style={styles.itemImage} />
                            <Text style={styles.itemTitleText}>Date & Time</Text>
                            <View style={{ flex: 1 }}></View>
                            <Feather name="chevron-right" size={20} color={Constant.Gray} />
                        </TouchableOpacity> */}

                            <TouchableOpacity style={styles.itemContainer} onPress={() => DashboardOperation.onMoreApp()}>
                                {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                                <Image source={require('../../../assets/image/playstore.png')} style={styles.itemImage} />
                                <Text style={styles.itemTitleText}>Our Apps</Text>
                                <View style={{ flex: 1 }}></View>
                                <Feather name="chevron-right" size={20} color={Constant.Gray} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.itemContainer} onPress={() => DashboardOperation.onRateus()}>
                                {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                                <Image source={require('../../../assets/image/favorites.png')} style={styles.itemImage} />
                                <Text style={styles.itemTitleText}>Rate App</Text>
                                <View style={{ flex: 1 }}></View>
                                <Feather name="chevron-right" size={20} color={Constant.Gray} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.itemContainer} onPress={() => DashboardOperation.onShare()}>
                                {/* <Ionicons name="image-outline" size={30} color="#000" /> */}
                                <Image source={require('../../../assets/image/share.png')} style={styles.itemImage} />
                                <Text style={styles.itemTitleText}>Share App</Text>
                                <View style={{ flex: 1 }}></View>
                                <Feather name="chevron-right" size={20} color={Constant.Gray} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    <FAB
                        style={styles.fab}
                        // small
                        color={Constant.appColor2}
                        icon="eye"
                        onPress={() => this.onOptionNavigate('PreviewScreen')}
                    />

                    {/* <View style={[styles.bannerContainer, { position: this.state.is_adShow ? 'relative' : 'absolute' }]}>
                        <BannerView
                            placementId={this.state.bannerAdPlacementId}
                            type="standard"
                            onPress={() => console.log('click')}
                            onLoad={() => this.setState({ is_adShow: true })}
                            onError={(err) => console.log('error', err)}
                        />
                    </View> */}
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

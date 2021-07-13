import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import styles from './styles';
import * as Constant from '../../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { STAMP_POSITION_ACTION } from '../../../../store/actions/status.action';
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';

const mapStateToProps = (state) => {
    return {
        stampPositionHistory: state.statusReducer.stampPositionHistory,
        logoHistory: state.statusReducer.logoHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPositionSelected: (payload) => { dispatch(STAMP_POSITION_ACTION(payload)) },
    }
}

class StampPosition extends React.Component {
    constructor(props) {
        super(props);

        this.positionArray = [
            { id: 0, title: 'Top Left' },
            { id: 1, title: 'Top Right' },
            { id: 2, title: 'Bottom Left' },
            { id: 3, title: 'Bottom Right' },
        ]

        this.state = {
            selectedIndex: 3,
            selectedTitle: 'Bottom Right'
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });
        this.props.navigation.setOptions({ title: 'Logo Position' })
        try {
            const { id, title } = this.props.stampPositionHistory;
            this.setState({ selectedIndex: id, selectedTitle: title })
        } catch (error) {
            console.log(error)
        }
    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this._showAdonPositionSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    _showAdonPositionSelected = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onPositionSelected())
            .catch(() => this.onPositionSelected());
    }

    onPositionSelected = () => {
        const { selectedIndex, selectedTitle } = this.state;
        const { navigation } = this.props;
        const value = { id: selectedIndex, title: selectedTitle }
        this.props.onPositionSelected(value);
        navigation.goBack();
    }

    onPositionSelect = (title, index) => {
        this.setState({ selectedIndex: index, selectedTitle: title })
    }

    renderLogoByposition = () => {
        const { selectedIndex } = this.state;
        switch (selectedIndex) {
            case 0:
                return (
                    <View style={[styles.logoContainer, {
                        left: 15,
                        top: 15
                    }]}>
                        {this.props.logoHistory.isLocal
                            ?
                            <Image source={this.props.logoHistory.img} style={styles.logoImage} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={styles.logoImageGallery} />
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
                            <Image source={this.props.logoHistory.img} style={styles.logoImage} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={styles.logoImageGallery} />
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
                            <Image source={this.props.logoHistory.img} style={styles.logoImage} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={styles.logoImageGallery} />
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
                            <Image source={this.props.logoHistory.img} style={styles.logoImage} />
                            :
                            <Image source={{ uri: this.props.logoHistory.img }} style={styles.logoImageGallery} />
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
                        <View style={styles.itemOuterContainer}>
                            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onPositionSelect('Top Left', 0)}>
                                <Image source={require('../../../../assets/image/stamp_position.png')} resizeMode="contain"
                                    style={[styles.stampPlaceholder, {
                                        top: -10,
                                    }]} />
                            </TouchableOpacity>
                            <Text style={selectedIndex === 0 ? styles.selectedItemText : styles.itemText}>Top Left</Text>
                        </View>

                        <View style={styles.itemOuterContainer}>
                            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onPositionSelect('Top Right', 1)}>
                                <Image source={require('../../../../assets/image/stamp_position.png')} resizeMode="contain"
                                    style={[styles.stampPlaceholder, {
                                        top: -10,
                                        right: 0
                                    }]} />
                            </TouchableOpacity>
                            <Text style={selectedIndex === 1 ? styles.selectedItemText : styles.itemText}>Top Right</Text>
                        </View>

                        <View style={styles.itemOuterContainer}>
                            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onPositionSelect('Bottom Left', 2)}>
                                <Image source={require('../../../../assets/image/stamp_position.png')} resizeMode="contain"
                                    style={[styles.stampPlaceholder, {
                                        bottom: -10
                                    }]} />
                            </TouchableOpacity>
                            <Text style={selectedIndex === 2 ? styles.selectedItemText : styles.itemText}>Bottom Left</Text>
                        </View>

                        <View style={styles.itemOuterContainer}>
                            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onPositionSelect('Bottom Right', 3)}>
                                <Image source={require('../../../../assets/image/stamp_position.png')} resizeMode="contain"
                                    style={[styles.stampPlaceholder, {
                                        bottom: -10,
                                        right: 0
                                    }]} />
                            </TouchableOpacity>
                            <Text style={selectedIndex === 3 ? styles.selectedItemText : styles.itemText}>Bottom Right</Text>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StampPosition);
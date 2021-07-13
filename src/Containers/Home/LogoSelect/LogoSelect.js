import React from 'react';
import { SafeAreaView, View, Text, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';
import logoSchema from '../../../config/logoSchema';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { SELECTED_LOGO_ACTION } from '../../../store/actions/status.action';
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';

const mapStateToProps = (state) => {
    return {
        logoHistory: state.statusReducer.logoHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoSelected: (payload) => { dispatch(SELECTED_LOGO_ACTION(payload)) }
    }
}

class LogoSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logoHolder: [],
            selectedLogo: null
        }

    }

    componentDidMount() {
        const { logoHistory } = this.props;
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });
        this.props.navigation.setOptions({ title: 'Logo' });
        const newLogoSchema = logoSchema.map((item, index) => {
            return { ...item, isLocal: true }
        })
        this.setState({ logoHolder: [...newLogoSchema], selectedLogo: logoHistory === undefined ? logoSchema[0] : logoHistory })
        // const { params } = this.props.route;
        // if (params !== undefined) {
        //     const data = params.data;
        //     this.setState({ data: data });
        // }
    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this._showAdonLogoSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    _showAdonLogoSelected = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onLogoSelected())
            .catch(() => this.onLogoSelected());
    }

    onLogoSelected = () => {
        const { selectedLogo } = this.state;
        const { navigation } = this.props;
        this.props.onLogoSelected(selectedLogo);
        navigation.goBack();
    }

    renderOption = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.setState({ selectedLogo: item })} >
                <Image source={item.img} style={styles.itemImage} />
            </TouchableOpacity>
        )
    }

    GetFilename(url) {
        if (url) {
            var m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1) {
                return m[1];
            }
        }
        return "";
    }

    onGalleryLogo = (imgURI) => {
        let filename = this.GetFilename(imgURI)
        const data = {
            isLocal: false,
            name: filename,
            img: imgURI
        }
        this.setState({ selectedLogo: data })
    }

    selectFromGallery = () => {
        const { navigate } = this.props.navigation;
        navigate('GalleryImagePicker', {
            fromScreen: 'LogoSelect',
            onGalleryLogo: this.onGalleryLogo
        })
    }

    render() {
        const { logoHolder, selectedLogo } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLogoContainer}>
                            <View style={[styles.centerContainer, { flex: 1 }]}>
                                {selectedLogo !== null
                                    &&
                                    <>
                                        {selectedLogo.isLocal
                                            ?
                                            <Image source={selectedLogo.img} style={[styles.selectedImage, { tintColor: Constant.whiteColor }]} />
                                            :
                                            <Image source={{ uri: selectedLogo.img }} style={styles.selectedGalleryImage} />
                                        }
                                    </>
                                }
                            </View>
                            <View style={styles.pluseIconContainer}>
                                <TouchableOpacity onPress={this.selectFromGallery}>
                                    <MaterialIcons name="add" size={30} color={Constant.appColor1} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.centerContainer}
                            showsVerticalScrollIndicator={false}
                            data={logoHolder}
                            numColumns={5}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => this.renderOption({ item, index })}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoSelect);
import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import * as Constant from '../../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AD_FONT_STYLE_ACTION } from '../../../../store/actions/status.action';
import { connect } from 'react-redux';
import { bannerAdPlacementId, InterstitialAdPlacementId, nativeAdPlacementId } from '../../../../constants/Adskeys';
import { BannerView, InterstitialAdManager, NativeAdsManager, AdSettings } from 'react-native-fbads';

const mapStateToProps = (state) => {
    return {
        advancedFontstyleHistory: state.statusReducer.advancedFontstyleHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFontstyleSelected: (payload) => { dispatch(AD_FONT_STYLE_ACTION(payload)) },
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
            fontArrayHolder: [],
            is_adShow: false,
            bannerAdPlacementId: bannerAdPlacementId
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
            const { id } = this.props.advancedFontstyleHistory;
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
                    this._showAdonFontstyleSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    _showAdonFontstyleSelected = () => {
        InterstitialAdManager.showAd(InterstitialAdPlacementId)
            .then(() => this.onFontstyleSelected())
            .catch(() => this.onFontstyleSelected());
    }

    onFontstyleSelected = () => {
        const { navigation } = this.props;

        try {
            const { fontArrayHolder } = this.state;
            const selectedStyle = fontArrayHolder.filter(obj => obj.isSelected === true)
            this.props.onFontstyleSelected({ id: selectedStyle[0].id, title: selectedStyle[0].title });
            navigation.goBack();
        } catch (error) {
            navigation.goBack();
        }
    }

    onSelectTextstyle = (item, index) => {
        this.setState(prevState => ({
            fontArrayHolder: prevState.fontArrayHolder.map(
                el => el.id === index ? { ...el, isSelected: !el.isSelected } : { ...el, isSelected: false }
            )
        }))
    }

    renderOption = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => this.onSelectTextstyle(item, index)}>
                {item.isSelected
                    ?
                    <Text style={[styles.itemTitleText, { fontFamily: item.title, color: '#000', fontSize: 16 }]}>{item.title}</Text>
                    :
                    <Text style={[styles.itemTitleText, { fontFamily: item.title }]}>{item.title}</Text>
                }
            </TouchableOpacity>
        )
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

                    <View style={[styles.bannerContainer, { position: this.state.is_adShow ? 'relative' : 'absolute' }]}>
                        <BannerView
                            placementId={this.state.bannerAdPlacementId}
                            type="standard"
                            onPress={() => console.log('click')}
                            onLoad={() => this.setState({ is_adShow: true })}
                            onError={(err) => console.log('error', err)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceFontstyle);
import React from 'react';
import { SafeAreaView, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import * as staticAction from '../../../constants/staticAction'

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

class PreviewScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogoToggle: true,
            selectedIndex: 3,
            stampSize: 7,
            fontStampSize: 7
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: 'Preview' })
        try {
            const { isLogoToggleHistory, advancedFontSizeHistory, dateFontSizeHistory } = this.props;
            const { id, title } = this.props.stampPositionHistory;
            this.setState({ selectedIndex: id, isLogoToggle: isLogoToggleHistory, stampSize: advancedFontSizeHistory, fontStampSize: dateFontSizeHistory })
        } catch (error) {
            console.log(error)
        }
    }

    renderLogoByposition = () => {
        const { selectedIndex } = this.state;
        const sliderScale = staticAction.normalize(this.state.stampSize + 25);
        const logoScale = { height: sliderScale, width: sliderScale }
        switch (selectedIndex) {
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

    renderTextByposition = () => {
        const { markedTextHistory, advancedFontstyleHistory, advancedFontColorHistory } = this.props;
        const { id, title } = this.props.fontPositionHistory;
        const fontScale = staticAction.normalize(this.state.fontStampSize + 25);
        switch (id) {
            case 0:
                return (
                    <View style={[styles.logoContainer, {
                        left: 15,
                        top: 15
                    }]}>
                        <Text style={[styles.overlayText, {
                            fontSize: staticAction.normalize(this.state.fontStampSize),
                            fontFamily: advancedFontstyleHistory.title, color: advancedFontColorHistory
                        }]}>{markedTextHistory}</Text>
                    </View>
                )
            case 1:
                return (
                    <View style={[styles.logoContainer, {
                        top: 15,
                        right: 15
                    }]}>
                        <Text style={[styles.overlayText, {
                            fontSize: staticAction.normalize(this.state.fontStampSize),
                            fontFamily: advancedFontstyleHistory.title, color: advancedFontColorHistory
                        }]}>{markedTextHistory}</Text>
                    </View>
                )
            case 2:
                return (
                    <View style={[styles.logoContainer, {
                        bottom: 15,
                        left: 15
                    }]}>
                        <Text style={[styles.overlayText, {
                            fontSize: staticAction.normalize(this.state.fontStampSize),
                            fontFamily: advancedFontstyleHistory.title, color: advancedFontColorHistory
                        }]}>{markedTextHistory}</Text>
                    </View>
                )
            case 3:
                return (
                    <View style={[styles.logoContainer, {
                        bottom: 15,
                        right: 15
                    }]}>
                        <Text style={[styles.overlayText, {
                            fontSize: staticAction.normalize(this.state.fontStampSize),
                            fontFamily: advancedFontstyleHistory.title, color: advancedFontColorHistory
                        }]}>{markedTextHistory}</Text>
                    </View>
                )
        }
    }

    render() {
        const { isLogoToggle } = this.state;
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.rootContainer}>
                    <ImageBackground source={require('../../../assets/image/preview_image.jpg')} resizeMode="cover" style={styles.backgroundImageContainer}>
                        {isLogoToggle
                            ?
                            <>
                                {this.renderLogoByposition()}
                            </>
                            :
                            <>
                                {this.renderTextByposition()}
                            </>
                        }
                    </ImageBackground>
                </View>
            </SafeAreaView>
        )
    }
}

export default connect(mapStateToProps)(PreviewScreen);
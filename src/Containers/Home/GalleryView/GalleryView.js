import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Constant from '../../../constants/constants';

const statusbarHeight = getStatusBarHeight();
export default class GalleryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            images: [
            ]
        };
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    async componentDidMount() {
        const { imageData } = this.props.route.params;
        let imgDataHolder = imageData.map((element, index) => {
            return { caption: index, source: { uri: element } }
        })
        this.setState({ images: [...imgDataHolder] })
    }

    onChangeImage(index) {
        this.setState({ index });
    }

    renderError() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>This image cannot be displayed...</Text>
                <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>... but this is fine :)</Text>
            </View>
        );
    }

    get galleryCount() {
        const { navigation } = this.props;
        const { index, images } = this.state;
        return (
            <View style={{
                top: statusbarHeight, height: 50, flexDirection: 'row',
                alignItems: 'center', paddingHorizontal: '4%',
                backgroundColor: '#000', width: '100%', position: 'absolute', justifyContent: 'center'
            }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} >
                    <Ionicons name="chevron-back" size={25} color={Constant.whiteColor} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, fontStyle: 'italic', }}>{index + 1} / {images.length}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Gallery
                    style={{ flex: 1, backgroundColor: '#000' }}
                    images={this.state.images}
                    errorComponent={this.renderError}
                    onPageSelected={this.onChangeImage}
                    initialPage={0}
                />
                {this.galleryCount}
            </View>
        );
    }
}
import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import {
  withNativeAd,
  AdIconView,
  TriggerableView,
  MediaView,
  AdChoicesView,
} from 'react-native-fbads';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './styles';

const { width } = Dimensions.get('window');
var windowSize = Dimensions.get('window');

class NativeAdView extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.iconViewContainer}>
            <AdIconView style={styles.iconView} />
          </View>
          <View style={styles.headercenterBodyContainer}>
            <TriggerableView style={styles.headlineContainer}>
              <Text style={styles.headlineText}>
                {this.props.nativeAd.headline}
              </Text>
            </TriggerableView>
            <TriggerableView style={styles.sponsoredTranslationContainer}>
              <Text style={styles.sponsoredTranslationText}>
                {this.props.nativeAd.sponsoredTranslation}
              </Text>
            </TriggerableView>
          </View>
        </View>
        <MediaView style={styles.mediaViewContainer} />
        {/* <MediaView nativeAdView={this.props.nativeAd} style={{ height: 1, width: 1 }} /> */}
        <Text style={styles.advertiserNameText}>{this.props.nativeAd.advertiserName}</Text>
        <View style={styles.callToActionContainer}>
          <TriggerableView
            style={styles.callToActionButton}
          >
            {this.props.nativeAd.callToActionText}
          </TriggerableView>
        </View>
        <AdChoicesView location="topRight" expandable={true} style={styles.AdChoicesViewContainer} />
        <Text style={styles.translationText}>Ad</Text>
      </View>
    );
  }
}

export default withNativeAd(NativeAdView);
import { Platform } from 'react-native';  

const nativeAdPlacementId = Platform.OS === 'android' ? '1621125544747604_1621126374747521': '327887315427772_327953252087845';
const bannerAdPlacementId = Platform.OS === 'android' ? '1621125544747604_1621125701414255' : '327887315427772_327949098754927';
const InterstitialAdPlacementId = Platform.OS === 'android' ? '1621125544747604_1621125978080894' : '327887315427772_327952918754545';

export { nativeAdPlacementId, bannerAdPlacementId, InterstitialAdPlacementId };
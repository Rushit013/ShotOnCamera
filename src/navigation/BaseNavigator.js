import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as Constant from '../constants/constants';
//navigation pages
import Splash from '../Containers/Welcome/Splash';

import Dashboard from '../Containers/Home/Dashboard';
import LogoSelect from '../Containers/Home/LogoSelect';
import ShotonScreen from '../Containers/Home/ShotonScreen';
import ShotbyScreen from '../Containers/Home/ShotbyScreen';
import AdvanceScreen from '../Containers/Home/AdvanceScreen';
import AdvanceFontstyle from '../Containers/Home/AdvanceSection/AdvanceFontstyle';
import StampPosition from '../Containers/Home/AdvanceSection/StampPosition';
import StampSize from '../Containers/Home/AdvanceSection/StampSize';
import DateAdvanceScreen from '../Containers/Home/DateAdvanceScreen';
import DateFormate from '../Containers/Home/DateSection/DateFormate';
import DateFontstyle from '../Containers/Home/DateSection/DateFontstyle';
import DateFontSize from '../Containers/Home/DateSection/DateFontSize';
import PreviewScreen from '../Containers/Home/PreviewScreen';
import FontPosition from '../Containers/Home/AdvanceSection/FontPosition';
import GalleryImagePicker from '../Containers/Home/GalleryImagePicker';
import CameraScreen from '../Containers/Home/CameraScreen';
import GalleryView from '../Containers/Home/GalleryView';

// make navigation instnce
const Stack = createStackNavigator();

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Dashboard'
                screenOptions={{
                    gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: Constant.appColor1
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTintColor: Constant.appColor2,
                    headerBackTitleVisible: false,
                    ...TransitionPresets.SlideFromRightIOS
                }}
                headerMode='float'>
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ title: 'Splash Screen' }}
                />
                <Stack.Screen
                    name='Dashboard'
                    component={Dashboard}
                />
                <Stack.Screen
                    name='LogoSelect'
                    component={LogoSelect}
                />
                <Stack.Screen
                    name='ShotonScreen'
                    component={ShotonScreen}
                />
                <Stack.Screen
                    name='ShotbyScreen'
                    component={ShotbyScreen}
                />
                <Stack.Screen
                    name='AdvanceScreen'
                    component={AdvanceScreen}
                />
                <Stack.Screen
                    name='AdvanceFontstyle'
                    component={AdvanceFontstyle}
                />
                <Stack.Screen
                    name='StampPosition'
                    component={StampPosition}
                />
                <Stack.Screen
                    name='StampSize'
                    component={StampSize}
                />
                <Stack.Screen
                    name='DateAdvanceScreen'
                    component={DateAdvanceScreen}
                />
                <Stack.Screen
                    name='DateFormate'
                    component={DateFormate}
                />
                <Stack.Screen
                    name='DateFontstyle'
                    component={DateFontstyle}
                />
                <Stack.Screen
                    name='DateFontSize'
                    component={DateFontSize}
                />
                <Stack.Screen
                    name='PreviewScreen'
                    component={PreviewScreen}
                // options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='FontPosition'
                    component={FontPosition}
                />
                <Stack.Screen
                    name='GalleryImagePicker'
                    component={GalleryImagePicker}
                // options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='CameraScreen'
                    component={CameraScreen}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='GalleryView'
                    component={GalleryView}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { MainStackNavigator as BaseNavigator };
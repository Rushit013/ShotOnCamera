'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Text>Waiting</Text>
    </View>
);

export default class CameraScreen extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front} //set camera front
                    flashMode={RNCamera.Constants.FlashMode.off} //flash on.off
                    faceDetectionLandmarks={
                        RNCamera.Constants.FaceDetection.Landmarks.all
                    }
                    onFacesDetected={this.onFacesDetected}
                    onFaceDetectionError={this.onFaceDetectionError}
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
                    }}>
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (this.onFacesDetected) {
                            this.onFacesDetected;
                            //console.log('Faces detection success:');
                            //this.takePicture(camera);
                        } else {
                            this.onFaceDetectionError;
                        }
                        if (status !== 'READY') return <PendingView />;
                        return (
                            <View
                                style={{
                                    flex: 0,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => this.takePicture(camera)}
                                    style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> Capture </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }
    //onFacesDetected = ({faces}) => console.log('Faces detection success:', faces);
    onFacesDetected = async function (faces) {
        //console.log('Faces detection success:', faces.Object);
    };
    onFaceDetectionError = async function (state) {
        //console.log('Faces detection error:', state);
    };
    takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
        const formData = new FormData();
        formData.append('image', {
            uri: data.uri,
            type: 'image/jpg', // or photo.type
            name: 'testPhotoName',
        });
        const config = {
            method: 'POST',
            body: formData,
        };
        fetch('http://192.168.153.11:5000/api/upload', config)
            .then(responseData => {
                console.log("Data response", responseData);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
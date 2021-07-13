import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';

export default class Splash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true,
        }

    }

    Hide_Splash_Screen = () => {
        const { navigate } = this.props.navigation;
        navigate('Screen1')
    }

    componentDidMount() {
        setTimeout(() => {
            this.Hide_Splash_Screen();
        }, 3000);
    }

    render() {
        return (
            <View style={styles.rootContainer}>
            </View>
        )
    }
}
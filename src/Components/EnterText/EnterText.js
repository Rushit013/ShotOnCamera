import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Constant from '../../constants/constants';

export default class EnterText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markerText: ''
        }
    }

    render() {
        return (
            <Modal isVisible={this.props.isShowModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Enter Text!!!</Text>
                    </View>

                    <Text>Enter text that you want to show.</Text>

                    <View style={styles.textInputContainer}>
                        <TextInput 
                            placeholder="Your Text"
                            value={this.state.markerText}
                            onChangeText={(input) => this.setState({ markerText: input })}
                        />
                    </View>

                    <View style={styles.bottomButtonContainer}>
                        <CardView
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}
                            style={[styles.bottomButton, { marginRight: 12 }]}>
                            <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.cancelPress()}>
                                <Icon name="close" size={22} color={Constant.appColor2} />
                                <Text style={styles.bottomButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </CardView>

                        <CardView
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}
                            style={styles.bottomButton}>
                            <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.DonePress(this.state.markerText)}>
                                <Icon name="done" size={22} color={Constant.appColor2} />
                                <Text style={styles.bottomButtonText}>Enter</Text>
                            </TouchableOpacity>
                        </CardView>
                    </View>
                </View>
            </Modal>
        )
    }
}
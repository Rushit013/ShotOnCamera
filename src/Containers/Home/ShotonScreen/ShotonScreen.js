import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { SHOTON_TAG_ACTION, SHOTON_DEVICE_ACTION } from '../../../store/actions/status.action';
import ToggleSwitch from 'toggle-switch-react-native';
import { TextInput, Provider } from 'react-native-paper';
import {
    Dropdown,
    GroupDropdown,
    MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';

const shotonList = [
    { label: 'NONE', value: 'NONE' },
    { label: 'SHOT ON', value: 'SHOT ON' },
    { label: 'SHOT WITH', value: 'SHOT WITH' },
    { label: 'CAPTURED ON', value: 'CAPTURED ON' },
    { label: 'SELFIE ON', value: 'SELFIE ON' },
    { label: 'TAKEN WITH', value: 'TAKEN WITH' },
];

const mapStateToProps = (state) => {
    return {
        shotTagHistory: state.statusReducer.shotTagHistory,
        deviceNameHistory: state.statusReducer.deviceNameHistory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShotonSelected: (payload) => { dispatch(SHOTON_TAG_ACTION(payload)) },
        onDevicenameSelected: (payload) => { dispatch(SHOTON_DEVICE_ACTION(payload)) }
    }
}

class ShotonScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true,
            shotoOnToggle: false,
            shotoOnTag: 'NONE',
            deviceName: 'DEVICE NAME',
            showDropDown: false
        }

    }

    componentDidMount() {
        const { shotTagHistory, deviceNameHistory } = this.props;
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });
        this.setState({
            shotoOnTag: shotTagHistory === undefined ? 'NONE' : shotTagHistory,
            deviceName: deviceNameHistory === undefined ? 'DEVICE NAME' : deviceNameHistory
        })
    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this.onShotonSelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    onShotonSelected = () => {
        const { shotoOnTag, deviceName } = this.state;
        const { navigation } = this.props;
        this.props.onShotonSelected(shotoOnTag);
        this.props.onDevicenameSelected(deviceName);
        navigation.goBack();
    }

    onChangeDropdown(input) {
        this.setState({ shotoOnTag: input });
        this.devicenameInput.focus();
    }

    render() {
        const { shotoOnToggle, shotoOnTag, showDropDown, deviceName } = this.state;
        return (
            <Provider>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <View style={styles.rootContainer}>
                        <View style={styles.switchHeader}>
                            <View style={styles.switchHeaderTitleContainer}>
                                <Text style={styles.switchHeaderTitle}>Shot On</Text>
                            </View>
                            <ToggleSwitch
                                isOn={shotoOnToggle}
                                onColor={Constant.appColor1}
                                offColor={Constant.appColor2}
                                size="medium"
                                onToggle={isOn => this.setState({ shotoOnToggle: isOn })}
                            />
                        </View>

                        <View style={{ height: 80 }}>
                            <Dropdown
                                label="Shot On Tag"
                                data={shotonList}
                                disableSort
                                primaryColor={Constant.appColor1}
                                // mode="outlined"
                                underlineColor="transparent"
                                // parentDDContainerStyle={{ borderWidth: 1, borderColor: '#000' }}
                                mainContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderRadius: 5 }}
                                enableSearch={false}
                                value={shotoOnTag}
                                selectedItemTextStyle={{ color: Constant.appColor1, fontWeight: '700' }}
                                onChange={input => this.onChangeDropdown(input)}
                            />
                        </View>

                        <TextInput
                            ref={(input) => { this.devicenameInput = input; }}
                            mode='outlined'
                            label="Device Name"
                            value={deviceName}
                            onChangeText={input => this.setState({ deviceName: input })}
                            theme={{ colors: { text: Constant.appColor1, primary: Constant.appColor1, underlineColor: 'transparent', background: '#fff' } }}
                        />
                    </View>
                </SafeAreaView>
            </Provider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShotonScreen);
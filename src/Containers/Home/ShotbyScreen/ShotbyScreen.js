import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import * as Constant from '../../../constants/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { SHOTBY_ACTION } from '../../../store/actions/status.action';
import ToggleSwitch from 'toggle-switch-react-native';
import { TextInput, Provider } from 'react-native-paper';
import { Dropdown } from 'sharingan-rn-modal-dropdown';

const shotbyList = [
    { label: 'NONE', value: 'NONE' },
    { label: 'BY', value: 'BY' },
    { label: 'SHOT BY', value: 'SHOT BY' },
    { label: 'CAPTURED BY', value: 'CAPTURED BY' },
    { label: 'SELFIE BY', value: 'SELFIE BY' },
    { label: 'TAKEN BY', value: 'TAKEN BY' },
];

const mapStateToProps = (state) => {
    return {
        shotByHistory: state.statusReducer.shotByHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShotbySelected: (payload) => { dispatch(SHOTBY_ACTION(payload)) },
    }
}

class ShotbyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true,
            shotoByToggle: false,
            shotoByTag: 'NONE',
            yourName: 'YOUR NAME',
            showDropDown: false
        }

    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.setHeaderRight()
        });
        try {
            const { shotbyTag, yourName } = this.props.shotByHistory;
            this.setState({
                shotoByTag: shotbyTag === undefined ? 'NONE' : shotbyTag,
                yourName: yourName === undefined ? 'YOUR NAME' : yourName
            })
        } catch (error) {
            console.log(error)
        }

    }

    setHeaderRight = state => {
        return (
            <TouchableOpacity
                style={styles.navigationRightButton}
                onPress={() => {
                    this.onShotbySelected();
                }}
            >
                <MaterialIcons name="done" size={25} color={Constant.appColor2} />
            </TouchableOpacity>
        );
    };

    onShotbySelected = () => {
        const { shotoByTag, yourName } = this.state;
        const { navigation } = this.props;
        const value = { shotbyTag: shotoByTag, yourName: yourName }
        this.props.onShotbySelected(value);
        navigation.goBack();
    }

    onChangeDropdown(input) {
        this.setState({ shotoByTag: input });
        this.yourNameInput.focus();
    }

    render() {
        const { shotoByToggle, shotoByTag, showDropDown, yourName } = this.state;
        return (
            <Provider>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <View style={styles.rootContainer}>
                        <View style={styles.switchHeader}>
                            <View style={styles.switchHeaderTitleContainer}>
                                <Text style={styles.switchHeaderTitle}>Shot On</Text>
                            </View>
                            <ToggleSwitch
                                isOn={shotoByToggle}
                                onColor={Constant.appColor1}
                                offColor={Constant.appColor2}
                                size="medium"
                                onToggle={isOn => this.setState({ shotoByToggle: isOn })}
                            />
                        </View>

                        <View style={{ height: 80 }}>
                            <Dropdown
                                label="Shot By Tag"
                                data={shotbyList}
                                disableSort
                                primaryColor={Constant.appColor1}
                                // mode="outlined"
                                underlineColor="transparent"
                                // parentDDContainerStyle={{ borderWidth: 1, borderColor: '#000' }}
                                mainContainerStyle={{ borderWidth: 1, borderColor: '#808080', borderRadius: 5 }}
                                enableSearch={false}
                                value={shotoByTag}
                                selectedItemTextStyle={{ color: Constant.appColor1, fontWeight: '700' }}
                                onChange={input => this.onChangeDropdown(input)}
                            />
                        </View>

                        <TextInput
                            ref={(input) => { this.yourNameInput = input; }}
                            mode='outlined'
                            label="Your Name"
                            value={yourName}
                            onChangeText={input => this.setState({ yourName: input })}
                            theme={{ colors: { text: Constant.appColor1, primary: Constant.appColor1, underlineColor: 'transparent', background: '#fff' } }}
                        />
                    </View>
                </SafeAreaView>
            </Provider>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShotbyScreen);
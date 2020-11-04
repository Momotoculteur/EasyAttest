import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Alert, Modal, TouchableHighlight, View, Text, Platform, TouchableOpacity } from 'react-native';

import { styles } from './style'

interface IProps {
    description: string
}


export default class MomotoculteurModal extends React.Component<IProps> {
    state = {
        modalVisible: false
    };

    constructor(props: any) {
        super(props);
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{this.props.description}</Text>

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#e50d54' }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle} textBreakStrategy='simple'>
                                    Retour
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={{ flex: 1}}
                                onPress={() => this.setModalVisible(true)}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name={Platform.OS === 'ios' ? "ios-information-circle-outline" : 'md-information-circle-outline'} size={20} color='#e50d54' />
                                </View>

                            </TouchableOpacity>


            </View>
        );
    }
}
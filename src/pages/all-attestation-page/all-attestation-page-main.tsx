import React from 'react';
import { Alert, Button, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './style'


export default class AllAttestionPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewAllAttestation}>
                    <Text>AllAttestissson</Text>
                </View>

                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                    activeOpacity={0.7}
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>Tout supprimer</Text>

                        </TouchableOpacity>
                </View>

            </View>
        );
    }


}


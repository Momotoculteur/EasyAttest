import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { styles } from './style'

export default function CreateAttestion() {
    return (
        <View style={styles.container}>
            <View style={styles.viewCreateAttestation}>
                <Text>CreateAttestion</Text>

            </View>
            <View style={styles.viewButtonSection}>
                <Button
                    title="Générer attestation"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                    color='#e50d54'
                />
            </View>
        </View>
    );
}

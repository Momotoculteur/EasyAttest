import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { styles } from './style'

export default function AllAttestionPage() {
    return (
        <View style={styles.container}>
            <View style={styles.viewAllAttestation}>
                <Text>AllAttestion</Text>
            </View>

            <View style={styles.viewButtonSection}>
                <Button
                    title="Tout supprimer"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                    color='#e50d54'
                />
            </View>

        </View>
    );
}


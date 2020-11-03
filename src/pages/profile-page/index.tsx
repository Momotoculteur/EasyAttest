import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { styles } from './styles'

export default function Profile() {

    return (
        <View style={styles.global}>
            <View style={styles.viewProfilSection}>
                <Text style={styles.textHeader}>Profil séléctionné</Text>
                <Text>Bastien maurice</Text>

            </View>

            <View style={styles.viewButtonSection}>
                <Button
                    title="Ajouter profil"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                    color='#e50d54'
                />

                <Button
                    title="Changer profil"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                    color='#e50d54'
                />

            </View>

        </View>
    );
}


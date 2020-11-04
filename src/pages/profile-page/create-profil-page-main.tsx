import React from 'react';
import { View, Button, Alert } from 'react-native';
import { styles } from './styles'

export default function ProfilePage({navigation}) {

    return (
        <View style={styles.global}>
            <View style={styles.viewProfilSection}>

            </View>

            <View style={styles.viewButtonSection}>
                <Button
                    title="Créer profil"
                    onPress={() => navigation.navigate('createProfil')}
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


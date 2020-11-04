import React from 'react';
import { View, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles'

export default function ProfilePage({ navigation }) {

    return (
        <View style={styles.global}>
            <View style={styles.viewProfilSection}>

            </View>

            <View style={styles.viewButtonSection}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('createProfil')}
                    style={styles.buttonStyle}
                    activeOpacity={0.7}>
                    <Text style={styles.textStyle}>Créer profil</Text>

                </TouchableOpacity>



                <TouchableOpacity
                    onPress={() => Alert.alert('Button with adjusted color pressed')}

                    style={styles.buttonStyle}
                    activeOpacity={0.7}>
                    <Text style={styles.textStyle}>Changer profil</Text>


                </TouchableOpacity>


            </View>

        </View>
    );
}


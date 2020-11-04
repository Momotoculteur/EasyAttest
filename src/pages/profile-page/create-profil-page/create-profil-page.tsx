import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { styles } from './style'
import * as React from 'react'
import MomotoculteurTextInput from "../../../components/atoms/momotoculteur-text-input/momotoculteurTextInput";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateProfilePage({ navigation }) {

    return (
        <View style={styles.global}>
            <View style={styles.viewFormGlobal}>
                <ScrollView
                    style={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled">
                    <MomotoculteurTextInput placeholder="Prénom" />
                    <MomotoculteurTextInput placeholder="Nom" />
                    <MomotoculteurTextInput placeholder="Date de naissance" />
                    <MomotoculteurTextInput placeholder="Adresse" />
                    <MomotoculteurTextInput placeholder="Ville" />
                    <MomotoculteurTextInput placeholder="Code postal" />
                </ScrollView>
            </View>
            <View style={styles.viewButtonSection}>
                <TouchableOpacity 
                style={styles.buttonStyle}
                    onPress={() => navigation.navigate('createProfil')}
                    activeOpacity={0.7}>
                    <Text style={styles.textStyle}>Valider</Text>

                    </TouchableOpacity>
            </View>
        </View>

    );
}
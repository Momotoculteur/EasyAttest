import { View, Text, Button, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { styles } from './style'
import * as React from 'react'
import { TextInput } from 'react-native-paper';
import MomotoculteurTextInput from "../../../components/atoms/momotoculteur-text-input/momotoculteurTextInput";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import MomotoculteurCreateProfilForm from "../../../components/molecules/momotoculteur-create-profil-form/momotoculteurCreateProfilForm";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function CreateProfilePage({ navigation }) {
    const [text, setText] = React.useState('');
    return (
        <View style={styles.global}>
            <View style={styles.viewFormGlobal}>
                <KeyboardAwareScrollView style={{flex: 1}}>
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled">
                        <MomotoculteurCreateProfilForm />

                    </ScrollView>
                </KeyboardAwareScrollView  >

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
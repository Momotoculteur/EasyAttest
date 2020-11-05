import { View, Text, Button, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { styles } from './style'
import * as React from 'react'
import { TextInput } from 'react-native-paper';
import MomotoculteurTextInput from "../../../components/atoms/momotoculteur-text-input/momotoculteurTextInput";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import MomotoculteurCreateProfilForm from "../../../components/molecules/momotoculteur-create-profil-form/momotoculteurCreateProfilForm";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class CreateProfilePage extends React.Component {


    private firstName: string;
    private lastName: string;
    private birthdate: string;
    private birthplace: string;
    private adress: string;
    private city: string
    private postalCode: string;


    constructor(props: any) {
        super(props);
        this.firstName = '';
        this.lastName = '';
        this.birthdate = '';
        this.birthplace = '';
        this.adress = '';
        this.city = '';
        this.postalCode = '';
    }

    getFirstname(newName: string): void {
        this.firstName = newName;
    }
    getLastname(newLastname: string):void {
        this.lastName = newLastname;
    }
    getBirthdate(newBirthday: string):void {
        this.birthdate = newBirthday;
    }
    getBirthplace(newBirthplace: string): void {
        this.birthplace = newBirthplace;
    }
    getAdress(newAdress: string): void {
        this.adress = newAdress;
    }
    getCity(newCity: string):void {
        this.city = newCity;
    }
    getPostalcode(newPostalcode: string): void {
        this.postalCode = newPostalcode;
    }

    createUser() :void {

    }

    
    render(){
    return (
        <View style={styles.global}>
            <View style={styles.viewFormGlobal}>
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled">
                        <View style={{ flex: 1, flexDirection: 'column', padding: '5%' }}>
                            <MomotoculteurTextInput getData={this.getFirstname} label="Prénom" mode="outlined" />
                            <MomotoculteurTextInput getData={this.getLastname} label="Nom" mode="outlined" />
                            <MomotoculteurTextInput getData={this.getBirthdate} label="Date de naissance" mode="outlined" />
                            <MomotoculteurTextInput getData={this.getBirthplace} label="Lieu de naissance" mode="outlined" />
                            <MomotoculteurTextInput getData={this.getAdress} label="Adresse" mode="outlined" />
                            <MomotoculteurTextInput getData={this.getCity} label="Ville" mode="outlined" />
                            <MomotoculteurTextInput getData={this.getPostalcode} label="Code postal" mode="outlined" />

                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView  >

            </View>
            <View style={styles.viewButtonSection}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    activeOpacity={0.7}>
                    <Text style={styles.textStyle}>Valider</Text>

                </TouchableOpacity>
            </View>
        </View>

    );
}
}
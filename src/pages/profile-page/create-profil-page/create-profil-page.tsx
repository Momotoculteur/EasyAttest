import { View, Text, Button, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { styles } from './style'
import * as React from 'react'
import { TextInput } from 'react-native-paper';
import MomotoculteurTextInput from "../../../components/atoms/momotoculteur-text-input/momotoculteurTextInput";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import MomotoculteurCreateProfilForm from "../../../components/molecules/momotoculteur-create-profil-form/momotoculteurCreateProfilForm";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { IUser } from "../../../components/shared/interface/IUser";
import DatabaseManager from "../../../database/DatabaseManager";
import { useNavigation } from "@react-navigation/native";



export default class CreateProfilePage extends React.Component {

    private user: IUser;
    constructor(props: any) {
        super(props);
        this.user = {
            firstName: '',
            lastName: '',
            adress: '',
            city: '',
            birthdate: '',
            birthplace: '',
            postalCode: '',
        }

    }

    getFirstname(newName: string): void {
        this.user.firstName = newName;
    }
    getLastname(newLastname: string): void {
        this.user.lastName = newLastname;
    }
    getBirthdate(newBirthday: string): void {
        this.user.birthdate = newBirthday;
    }
    getBirthplace(newBirthplace: string): void {
        this.user.birthplace = newBirthplace;
    }
    getAdress(newAdress: string): void {
        this.user.adress = newAdress;
    }
    getCity(newCity: string): void {
        this.user.city = newCity;
    }
    getPostalcode(newPostalcode: string): void {
        this.user.postalCode = newPostalcode;
    }

    validate(): void {
        this.createUser();
        this.props.navigation.goBack();
    }

    createUser(): void {
        console.log( "user " + this.user)
        DatabaseManager.insertUser(this.user);
    }


    render() {
        return (
            <View style={styles.global}>
                <View style={styles.viewFormGlobal}>
                    <KeyboardAwareScrollView style={{ flex: 1 }}>
                        <ScrollView
                            style={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled">
                            <View style={{ flex: 1, flexDirection: 'column', padding: '5%' }}>
                                <MomotoculteurTextInput getData={this.getFirstname.bind(this)} label="Prénom" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getLastname.bind(this)} label="Nom" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getBirthdate.bind(this)} label="Date de naissance" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getBirthplace.bind(this)} label="Lieu de naissance" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getAdress.bind(this)} label="Adresse" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getCity.bind(this)} label="Ville" mode="outlined" />
                                <MomotoculteurTextInput getData={this.getPostalcode.bind(this)} label="Code postal" mode="outlined" />

                            </View>

                        </ScrollView>
                    </KeyboardAwareScrollView  >

                </View>
                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.validate.bind(this)}
                        activeOpacity={0.7}>
                        <Text style={styles.textStyle}>Valider</Text>

                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
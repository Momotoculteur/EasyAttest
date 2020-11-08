import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Alert, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { RadioButton } from 'react-native-paper';
import { IUser } from "../../../components/shared/interface/IUser";
import DatabaseManager from "../../../database/DatabaseManager";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface iState {
    listAllUsers: IUser[],
    idCurrentUser: string
}
interface IProps {
}
export default class SwitchProfilePage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            listAllUsers: [],
            idCurrentUser: ''
        }
    }

    componentDidMount(): void {
        this.updateListUsers();
        this.initializeCurrentProfil();
    }

    updateCurrentProfil(userId: string) {
        this.setState({ idCurrentUser: userId });

        this.saveCurrentProfil(userId);
    }

    async saveCurrentProfil(userId: string) {
        try {
            const userToSave: IUser = this.state.listAllUsers.find((user: IUser) => {
                return user.id?.toString() === userId;
            })
            await AsyncStorage.setItem('@connectedUser', JSON.stringify(userToSave))
        } catch (e) {
            console.log("ERROR: + " + e)
        }
    }

    openDeleteConfirmAlert(item: IUser): void {
        const title = item.firstName + " " + item.lastName.toUpperCase();
        const test =
            item.adress +
            "\n" +
            item.postalCode + " " + item.city.toUpperCase() +
            "\n" +
            item.birthdate + " " + item.birthplace.toUpperCase();

        Alert.alert(
            title,
            test,
            [
                {
                    text: "Retour",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        DatabaseManager.deleteUserWithId(item.id);
                        this.updateListUsers();
                        if (item.id.toString() === this.state.idCurrentUser) {
                            AsyncStorage.removeItem('@connectedUser');
                        }
                    }
                }
            ],
            { cancelable: false }
        )
    }



    async initializeCurrentProfil() {
        try {
            const jsonValue = await AsyncStorage.getItem('@connectedUser')
            if (jsonValue != null) {
                this.setState({ idCurrentUser: JSON.parse(jsonValue).id.toString() });
            } else {
                this.setState({ idCurrentUser: '' });
            }
        } catch (e) {
            console.log("ERROR: + " + e)
        }
    }

    updateListUsers(): void {
        DatabaseManager.getAllUser().then((result) => { this.setState({ listAllUsers: result }) });
    }

    renderEmptyProfilList() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', }}>Vous n'avez pas de profil</Text>
                    <View style={{ borderBottomColor: '#e50d54', borderBottomWidth: 3, width: '20%', paddingTop: 5 }} ></View>
                </View>

            </View>
        )
    }

    renderProfilList() {
        return (
            <ScrollView style={{ flex: 1 }}>

                <RadioButton.Group onValueChange={(userId: string) => { this.updateCurrentProfil(userId) }} value={this.state.idCurrentUser}>
                    {this.state.listAllUsers.map((item, index) => {

                        return (

                            <View key={item.id} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: (this.state.listAllUsers.length - 1) === index ? 10 : 0, paddingTop: 10 }}>

                                <View style={{ flex: 5, flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <RadioButton.Android color='#e50d54' value={item.id.toString()} />
                                    </View>

                                    <TouchableWithoutFeedback onPress={() => { this.updateCurrentProfil(item.id.toString()) }} style={{ flex: 1 }}>
                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>

                                            <View>
                                                <Text>
                                                    {item.firstName}{" "}{item.lastName.toUpperCase()}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    {item.adress}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text>
                                                    {item.postalCode}{" "}{item.city.toUpperCase()}
                                                </Text>
                                            </View>
                                            <View>

                                                <Text>
                                                    {item.birthdate}{" "}{item.birthplace.toUpperCase()}
                                                </Text>

                                            </View>
                                            {(() => {
                                                if ((this.state.listAllUsers.length - 1) !== index) {
                                                    return (
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>
                                                            <View style={{ borderBottomWidth: 3, borderBottomColor: '#e50d54', width: '30%' }}>

                                                            </View>
                                                        </View>)
                                                }

                                            })()}


                                        </View>

                                    </TouchableWithoutFeedback>

                                </View>


                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                    <TouchableOpacity
                                        style={{ flex: 1, borderRadius: 20 }}
                                        onPress={() => this.openDeleteConfirmAlert(item)}

                                    >
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Ionicons name={Platform.OS === 'ios' ? "ios-trash" : 'md-trash'} size={20} color='gray' />

                                        </View>

                                    </TouchableOpacity>
                                </View>


                            </View>
                        )
                    })
                    }
                </RadioButton.Group >
            </ScrollView >

        )
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                {(() => {
                    if (this.state.listAllUsers.length === 0) {
                        return (this.renderEmptyProfilList());
                    } else {
                        return (this.renderProfilList());
                    }
                })()}
            </View>







        );
    }
}
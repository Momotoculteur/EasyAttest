import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

    async initializeCurrentProfil() {
        try {
            const jsonValue = await AsyncStorage.getItem('@connectedUser')
            if (jsonValue != null) {
                this.setState({ idCurrentUser: JSON.parse(jsonValue).id.toString() });
            } else {
                //this.setState({ idCurrentUser: '' });
            }
        } catch (e) {
            console.log("ERROR: + " + e)
        }
    }

    updateListUsers(): void {
        DatabaseManager.getAllUser().then((result) => { this.setState({ listAllUsers: result }) });
    }

    render(): JSX.Element {
        return (

            <ScrollView style={{ flex: 1 }}>
                <RadioButton.Group onValueChange={(userId: string) => { this.updateCurrentProfil(userId) }} value={this.state.idCurrentUser}>
                    {this.state.listAllUsers.map((item, index) => {

                        return (
                            <View key={item.id} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: (this.state.listAllUsers.length - 1) === index ? 10 : 0, paddingTop: 10 }}>

                                <View style={{ flex: 5, flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <RadioButton.Android color='#e50d54' value={item.id ? item.id?.toString() : ''} />
                                    </View>
                                    
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

                                </View>


                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ flex: 1, borderRadius: 20 }}
                                    >
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Ionicons name={Platform.OS === 'ios' ? "ios-options" : 'md-options'} size={20} color='gray' />

                                        </View>

                                    </TouchableOpacity>


                                    <TouchableOpacity style={{ flex: 1, borderRadius: 20 }}
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

        );
    }
}
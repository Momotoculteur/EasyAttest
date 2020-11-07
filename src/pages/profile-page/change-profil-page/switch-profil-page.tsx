import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from 'react-native-paper';
import { IUser } from "../../../components/shared/interface/IUser";
import DatabaseManager from "../../../database/DatabaseManager";

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
            idCurrentUser: '0'
        }
    }

    componentDidMount(): void {
        this.updateListUsers();
    }


    updateListUsers(): void {
        DatabaseManager.getAllUser().then((result) => {this.setState({ listAllUsers: result }); console.log(result); });
    }

    render(): JSX.Element {
        return (

            <ScrollView style={{ flex: 1 }}>
                <RadioButton.Group onValueChange={(userId: string) => { this.setState({ idCurrentUser: userId }); console.log('userId + ' + userId); }} value={this.state.idCurrentUser}>
                    {this.state.listAllUsers.map((item, index) => {

                        return (
                            <View key={item.id} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingBottom: (this.state.listAllUsers.length-1) === index ? 10 : 0, paddingTop: 10}}>

                                <View style={{ flex: 5, flexDirection: 'row'}}>
                                    <View style={{ alignContent: 'center' }}>
                                        <View >
                                            <RadioButton.Android color='#e50d54' value={item.id ? item.id?.toString() : ''} />

                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column', borderWidth: 1, borderRadius: 5, borderColor: 'gray' }}>
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
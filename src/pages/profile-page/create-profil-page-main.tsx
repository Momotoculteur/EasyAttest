import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Button, Alert, TouchableOpacity, Text, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IUser } from '../../components/shared/interface/IUser';
import DatabaseManager from '../../database/DatabaseManager';
import { styles } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEqualIcon } from 'react-native-paper/lib/typescript/src/components/Icon';
import { Ionicons } from '@expo/vector-icons';
import { ROUTE_CONSTANT } from '../../navigation/route';


interface iState {
    listAllUsers: IUser[],
    connectedUser?: IUser
}
interface IProps {

}
export default class ProfilePage extends React.Component<IProps, iState> {


    constructor(props: IProps) {
        super(props)
        this.state = {
            listAllUsers: []
        }
        /*
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.updateListUsers();
            this.state.listAllUsers.forEach((item) => {
                console.log("ETAT : " + item.firstName);

            })

        });*/
    }

    componentDidMount() {
        this.updateListUsers();
        this.initializeConnectedUser();
        //console.log(this.listAllUsers)


    }

    async initializeConnectedUser() {

        /*
        try {
            const jsonValue = JSON.stringify({
                firstName: 'result.firstName',
                    lastName: 'result.lastName',
                    adress: 'result.adress',
                    city: 'result.city',
                    birthdate: 'result.birthdate',
                    birthplace: 'result.birthdate',
                    postalCode: 'result.postalCode'
            })
            await AsyncStorage.setItem('@connectedUser', jsonValue)
          } catch (e) {
            // saving error
          }*/

        try {
            const jsonValue = await AsyncStorage.getItem('@connectedUsessr')
            //return jsonValue != null ? JSON.parse(jsonValue) : null;
            if (jsonValue != null) {
                this.setState({ connectedUser: JSON.parse(jsonValue) as IUser });
            }
        } catch (e) {
            console.log("ERROR: + " + e)
        }
    }



    updateListUsers() {
        DatabaseManager.getAllUser().then((result) => this.setState({ listAllUsers: result }));
    }

    /*
    LISTER TOUT LES USERS
     <ScrollView style={{flex: 1}}>
        {this.state.listAllUsers.map((item, index) => {
            return(<Text>{item.firstName}</Text>)
        })
        }
    </ScrollView>
    */

    render() {
        //                    {this.state.connectedUser ? <Text>CONNECTED : {this.state.connectedUser.firstName}</Text> : <Text>Aucun</Text>}

        return (
            <View style={styles.global}>

                <View style={styles.viewProfilSection}>

                    <View style={{ flex: 3, flexDirection: 'column', margin: 10, justifyContent: 'space-evenly' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                <Ionicons name={Platform.OS === 'ios' ? "ios-person" : 'md-person'} size={30} color='#e50d54' />
                            </View>
                            <Text>
                                {this.state.connectedUser?.firstName}{" "}{this.state.connectedUser?.lastName.toUpperCase()}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 40 }}>

                                <Ionicons name={Platform.OS === 'ios' ? "ios-home" : 'md-home'} size={30} color='#e50d54' />
                            </View>
                            <View>
                                <Text>
                                    {this.state.connectedUser?.adress}
                                </Text>
                                <Text>
                                    {this.state.connectedUser?.postalCode}{" "}{this.state.connectedUser?.city.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 40 }}>

                                <Ionicons name={Platform.OS === 'ios' ? "ios-calendar" : 'md-calendar'} size={30} color='#e50d54' />
                            </View>
                            <Text>
                                {this.state.connectedUser?.birthdate}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 40 }}>

                                <Ionicons name={Platform.OS === 'ios' ? "ios-pin" : 'md-pin'} size={30} color='#e50d54' />
                            </View>
                            <Text>
                                {this.state.connectedUser?.birthplace.toUpperCase()}
                            </Text>
                        </View>


                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 40, height: 40 }}>
                            <TouchableOpacity style={{ flex: 1, borderRadius: 20 }}
                                onPress={() => this.props.navigation.navigate(ROUTE_CONSTANT.SETTINGS)}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name={Platform.OS === 'ios' ? "ios-settings" : 'md-settings'} size={30} color='gray' />

                                </View>

                            </TouchableOpacity>
                        </View>


                    </View>

                    <Text>dddd</Text>


                </View>


                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(ROUTE_CONSTANT.CREATE_PROFIL)}
                        style={styles.buttonStyle}
                        activeOpacity={0.7}>
                        <Text style={styles.textStyle}>Créer profil</Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => DatabaseManager.getAllUser()}

                        style={styles.buttonStyle}
                        activeOpacity={0.7}>
                        <Text style={styles.textStyle}>Changer profil</Text>


                    </TouchableOpacity>


                </View>

            </View>
        );
    }
}


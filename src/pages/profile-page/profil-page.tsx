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
import { ROUTE } from '../../navigation/route';


interface iState {
    connectedUser?: IUser
}
interface IProps {

}
export default class ProfilePage extends React.Component<IProps, iState> {


    constructor(props: IProps) {
        super(props)
        this.state = {
            connectedUser: undefined
        }
    }

    componentDidMount() {
        this.initializeConnectedUser();
        //console.log(this.listAllUsers)


    }

    async initializeConnectedUser() {
        try {
             //AsyncStorage.clear()
            const jsonValue = await AsyncStorage.getItem('@connectedUser')
            //return jsonValue != null ? JSON.parse(jsonValue) : null;
            if (jsonValue != null) {
                this.setState({ connectedUser: JSON.parse(jsonValue) as IUser });
            } else {
                this.setState({ connectedUser: undefined });
            }
        } catch (e) {
            console.log("ERROR: + " + e)
        }
    }





    /*
    LISTER TOUT LES USERS

    */

    render(): JSX.Element {
        //                    {this.state.connectedUser ? <Text>CONNECTED : {this.state.connectedUser.firstName}</Text> : <Text>Aucun</Text>}

        return (
            <View style={styles.global}>

                <View style={styles.viewProfilSection}>

                    <View style={{ flex: 3 }}>

                        {(() => {
                            if (this.state.connectedUser !== undefined) {
                                return (this.renderProfilSectionWhenUserSelected());
                            } else {
                                return (this.renderProfilSectionWhenUserNotSelected());
                            }

                        })()}

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: 40, height: 40 }}>
                            <TouchableOpacity style={{ flex: 1, borderRadius: 20 }}
                                onPress={() => this.props.navigation.navigate(ROUTE.PROFILE_TAB.SETTINGS)}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name={Platform.OS === 'ios' ? "ios-settings" : 'md-settings'} size={30} color='gray' />

                                </View>

                            </TouchableOpacity>
                        </View>


                    </View>



                </View>


                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(ROUTE.PROFILE_TAB.CREATE_PROFIL)}
                        style={styles.buttonStyle}
                        activeOpacity={0.7}>
                        <Text style={styles.textStyle}>Créer profil</Text>

                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(ROUTE.PROFILE_TAB.SWITCH_PROFILE)}
                        style={styles.buttonStyle}
                        activeOpacity={0.7}>
                        <Text style={styles.textStyle}>Changer profil</Text>


                    </TouchableOpacity>


                </View>

            </View>
        );
    }


    renderProfilSectionWhenUserSelected() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 10, justifyContent: 'space-evenly', }}>
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
        );
    }

    renderProfilSectionWhenUserNotSelected() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>Sélectionnez un profil</Text>
                <View style={{ borderBottomColor: '#e50d54', borderBottomWidth: 3, width: '20%', paddingTop: 5 }} ></View>
            </View>
        );
    }
}


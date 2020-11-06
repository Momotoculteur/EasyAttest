import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IUser } from '../../components/shared/interface/IUser';
import DatabaseManager from '../../database/DatabaseManager';
import { styles } from './styles'

interface iState {
    listAllUsers: IUser[]
}
interface IProps {

}
export default class ProfilePage extends React.Component<IProps, iState> {


    constructor(props: any) {
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
        //console.log(this.listAllUsers)
    }



    updateListUsers() {
        DatabaseManager.getAllUser().then((result) => this.setState({listAllUsers: result}) );
    }

    render() {

        return (
            <View style={styles.global}>
                <View style={styles.viewProfilSection}>
                    <ScrollView style={{flex: 1}}>
                       {this.state.listAllUsers.map((item, index) => {
                           return(<Text>{item.firstName}</Text>)
                       })
                       }
                    </ScrollView>
                </View>

                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('createProfil')}
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


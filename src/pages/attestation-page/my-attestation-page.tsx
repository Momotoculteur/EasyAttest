import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Button, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { IAttestationType } from '../../components/shared/interface/general/IAttestationType';
import { IAttestationObject } from '../../components/shared/interface/object/IAttestationObject';
import { IUserObject } from '../../components/shared/interface/object/IUserObject';
import DatabaseManager from '../../database/DatabaseManager';
import { getCurrentUser } from '../../services/storage/userAsyncStorage';
import { styles } from './style'

interface IProps {
}
interface iState {
    myAttestionList: IAttestationObject[],
    connectedUser?: IUserObject,
}
export default class MyAttestionPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            myAttestionList: [],
            connectedUser: undefined
        }
    }

    componentDidMount(): void {
        this.initializeAndProvideCurrentUser();

    }

    componentWillUnmount() {
    }

    updateListAttestations(): void {
        DatabaseManager.getAllAttestationByUserId(this.state.connectedUser?.id)
            .then((result: IAttestationObject[]) => {
                console.log(result)
                this.setState({
                    myAttestionList: result
                })
            });
    }

    canDelete(): boolean {
        return (this.state.connectedUser === undefined) || (this.state.myAttestionList.length === 0 )
    }



    initializeAndProvideCurrentUser(): void {
        console.log('FOCYS')
        this.props.navigation.addListener('focus', () => {
            getCurrentUser().then((user) => {
                if (user !== undefined) {
                    this.setState({ connectedUser: user });
                } else {
                    this.setState({
                        connectedUser: undefined
                    });
                }
                this.updateListAttestations();
            });
        });

    }

    deleteAllCurrentAttestations(): void {
        DatabaseManager.deleteAllAttestionWithCurrendUserId(this.state.connectedUser.id);
        this.setState({myAttestionList: []});
    }

    renderEmptyAttestationsList() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', }}>Vous n'avez pas d'attestation</Text>
                    <View style={{ borderBottomColor: '#e50d54', borderBottomWidth: 3, width: '20%', paddingTop: 5 }} ></View>
                </View>
            </View>
        )
    }

    renderAttestationsList() {
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                {this.state.myAttestionList.map((item, index) => {
                    return (


                        <View key={item.id} style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Ionicons name={Platform.OS === 'ios' ? "ios-share" : 'md-share'} size={20} color='gray' />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text>2</Text>

                            </View>
                            <View style={{ flex: 1 }}>
                                <Ionicons name={Platform.OS === 'ios' ? "ios-trash" : 'md-trash'} size={20} color='gray' />

                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }



    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 5 }}>
                    {(() => {
                        if (this.state.myAttestionList.length === 0) {
                            return (this.renderEmptyAttestationsList());
                        } else {
                            return (this.renderAttestationsList());
                        }
                    })()}
                </View>

                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                    disabled={this.canDelete()}
                        activeOpacity={0.7}
                        onPress={() => this.deleteAllCurrentAttestations()}
                        style={{...styles.buttonStyle, backgroundColor: (this.canDelete() ? 'gray' : '#e50d54')}}>
                        <Text style={styles.textStyle}>Tout supprimer</Text>

                    </TouchableOpacity>
                </View>

            </View>
        );
    }


}


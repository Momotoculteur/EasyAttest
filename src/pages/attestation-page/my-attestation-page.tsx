import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Button, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { ALL_ATTESTATIONS_TYPE } from '../../components/shared/constant/CAttestationType';
import { IAttestationType } from '../../components/shared/interface/general/IAttestationType';
import { IAttestationObject } from '../../components/shared/interface/object/IAttestationObject';
import { IUserObject } from '../../components/shared/interface/object/IUserObject';
import DatabaseManager from '../../database/DatabaseManager';
import { getCurrentUser } from '../../services/storage/userAsyncStorage';
import { styles } from './style'
import * as FileSystem from 'expo-file-system';


interface IProps {
}
interface iState {
    myAttestionList: IAttestationObject[],
    connectedUser?: IUserObject,
    popupActive: boolean,
    popupMessage: string
}
export default class MyAttestionPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            myAttestionList: [],
            connectedUser: undefined,
            popupActive: false,
            popupMessage: ''
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
        return (this.state.connectedUser === undefined) || (this.state.myAttestionList.length === 0)
    }



    initializeAndProvideCurrentUser(): void {
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
        this.setState({ myAttestionList: [] });
    }

    getFullLabelReason(rawReasonsList: string): string {
        const rawReasonsListCleaned: string[] = rawReasonsList.split(";").filter(Boolean);
        let result: string = '';
        rawReasonsListCleaned.forEach((reason: string, index) => {
            result += ALL_ATTESTATIONS_TYPE.find((item) => item.id === Number(reason))?.shortLabel;
            if (index === rawReasonsListCleaned.length - 1) {
                result += "";
            } else {
                result += ", "
            }
        });

        //console.log(result)



        return result;
    }

    renderEmptyAttestationsList() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontFamily: 'Arial' }}>Vous n'avez pas d'attestation</Text>
                    <View style={{ borderBottomColor: '#e50d54', borderBottomWidth: 3, width: '20%', paddingTop: 5 }} ></View>
                </View>
            </View>
        )
    }

    openDeleteConfirmAlert(attestation: IAttestationObject): void {
        const title = this.getFullLabelReason(attestation.reasons);
        const subTitle = attestation.time + " - " + attestation.date;

        Alert.alert(
            title,
            subTitle,
            [
                {
                    text: "Retour",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        DatabaseManager.deleteAttestationWithId(attestation.id)
                        .then(() => {
                            FileSystem.deleteAsync(attestation.path);
                        })
                        .then(() => {
                            let message: string = "Attestation supprimée";
                            this.setState({ popupActive: true, popupMessage: message })
                        }).
                        catch( (err) => {
                            let message: string = "ERREUR : " + err;
                            this.setState({ popupActive: true, popupMessage: message })
                        })
                        this.updateListAttestations();
                    }
                }
            ],
            { cancelable: false }
        )
    }



    renderAttestationsList() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                    {this.state.myAttestionList.map((item, index) => {
                        return (

                            <View style={{ flexDirection: 'column', flex: 1 }} key={item.id}>


                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingBottom: (this.state.myAttestionList.length - 1) === index ? 10 : 0, paddingTop: 10 }}>
                                    <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>{this.getFullLabelReason(item.reasons)}</Text>
                                        <Text>{item.time}{" - "}{item.date}</Text>


                                    </View>


                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <TouchableOpacity
                                            style={{ flex: 1, borderRadius: 20 }}
                                            onPress={() => { }}
                                        >
                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                <Ionicons name={Platform.OS === 'ios' ? "ios-paper" : 'md-paper'} size={30} color='gray' />

                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ flex: 1, borderRadius: 20 }}
                                            onPress={() => this.openDeleteConfirmAlert(item)}

                                        >
                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                <Ionicons name={Platform.OS === 'ios' ? "ios-trash" : 'md-trash'} size={30} color='#e50d54' />

                                            </View>

                                        </TouchableOpacity>

                                    </View>

                                </View>
                                <View style={{ flex: 1 }}>

                                    {(() => {
                                        if ((this.state.myAttestionList.length - 1) !== index) {
                                            return (
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <View style={{ flex: 4, alignItems: 'center', paddingTop: 10 }}>
                                                        <View style={{ borderBottomWidth: 3, borderBottomColor: '#e50d54', width: '30%' }}>

                                                        </View>
                                                    </View>

                                                    <View style={{ flex: 2 }}></View>
                                                </View>
                                            )
                                        }
                                    })()}

                                </View>
                            </View>
                        )
                    })}

                </ScrollView>



            </View>

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
                        style={{ ...styles.buttonStyle, backgroundColor: (this.canDelete() ? 'gray' : '#e50d54') }}>
                        <Text style={styles.textStyle}>Tout supprimer</Text>

                    </TouchableOpacity>
                </View>


                <Snackbar
                    visible={this.state.popupActive}
                    onDismiss={() => { this.setState({ popupActive: !this.state.popupActive }) }}
                    duration={2500}
                    theme={{ colors: { accent: '#e50d54', surface: '#e50d54', onSurface: 'white' } }}
                    action={{
                        label: 'OK',
                        onPress: () => {
                            this.setState({ popupActive: !this.state.popupActive });
                        }
                    }}
                >
                    {this.state.popupMessage}
                </Snackbar>

            </View>
        );
    }


}


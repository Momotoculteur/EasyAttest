import * as React from 'react';
import { Alert, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style'
import { ALL_ATTESTATIONS_TYPE } from '../../components/shared/constant/CAttestationType';
import MomotoculteurModal from '../../components/atoms/momotoculteur-modal/momotoculteurModal';
import { getCurrentUser } from '../../services/storage/userAsyncStorage';
import { IUserObject } from '../../components/shared/interface/object/IUserObject';
import DatabaseManager from '../../database/DatabaseManager';
import { ICheckboxList } from '../../components/shared/interface/general/ICheckboxList';
import { Checkbox, Snackbar, TextInput } from 'react-native-paper';
import { generateAttestationPdfFile } from '../../services/pdfFileGeneratorService';
import { getAutoDateSetting, getAutoTimeSetting } from '../../services/storage/settingsAsyncStorage';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



interface iState {
    connectedUser?: IUserObject,
    checkboxList: ICheckboxList[],
    popupActive: boolean,
    popupMessage: string,
    toggleAutoDate: boolean,
    toggleAutoTime: boolean,
    customDate: string,
    customTime: string
}
interface IProps {

}
export default class CreateAttestionPage extends React.Component<IProps, iState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            checkboxList: [
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[0] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[1] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[2] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[3] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[4] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[5] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[6] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[7] },
                { isChecked: false, attestation: ALL_ATTESTATIONS_TYPE[8] }
            ],
            popupActive: false,
            popupMessage: '',
            customTime: '',
            customDate: '',
            toggleAutoDate: false,
            toggleAutoTime: false
        }


    }

    componentDidMount() {
        // Init l'user courrant
        this.initializeAndProvideCurrentUser();
        this.initializeCustomDateTimeToggle();
    }





    initializeAndProvideCurrentUser(): void {
        this.props.navigation.addListener('focus', () => {
            getCurrentUser().then(result => this.setState({ connectedUser: result }));
        });
    }

    initializeCustomDateTimeToggle() {
        this.props.navigation.addListener('focus', () => {
            getAutoDateSetting()
                .then((toggle) => {
                    if (toggle !== undefined) {
                        this.setState({ toggleAutoDate: toggle });
                    }
                });
            getAutoTimeSetting()
                .then((toggle) => {
                    if (toggle !== undefined) {
                        this.setState({ toggleAutoTime: toggle });
                    }
                });
        });

    }



    resetAllCheckbox(): void {
        let temp = this.state.checkboxList;
        temp.forEach((checkbox) => {
            checkbox.isChecked = false;
        })
        this.setState({ checkboxList: temp })

    }

    getCustomDate(newDate: string): void {
        this.setState({ customDate: newDate });
    }

    getCustomTime(newTime: string): void {
        this.setState({ customTime: newTime });
    }

    

    generateAttestation() {

        const fullDatetime = new Date();
        //const dateNow: string = new Date().toLocaleDateString('fr-FR');
        const dateNow: string = fullDatetime.getDate().toString().padStart(2, '0') + "/" + (fullDatetime.getMonth() + 1).toString().padStart(2, '0') + "/" + fullDatetime.getFullYear().toString();
        const timeNow: string = fullDatetime.getHours().toString().padStart(2, '0') + ":" + fullDatetime.getMinutes().toString().padStart(2, '0');
        let reasonsIds: string = '';
        let reasonsIdsList: number[] = [];
        let reasonsLabelsList: string[] = [];

        this.state.checkboxList.forEach((checkbox: ICheckboxList) => {
            if (checkbox.isChecked) {
                reasonsIds += checkbox.attestation.id + ";";
                reasonsIdsList.push(checkbox.attestation.id);
                reasonsLabelsList.push(checkbox.attestation.shortLabel)
            }
        });


        generateAttestationPdfFile(this.state.connectedUser, reasonsIdsList, reasonsLabelsList, dateNow, timeNow, dateNow, timeNow)
            .then((path: string) => {
                DatabaseManager.createAttestation(Number(this.state.connectedUser?.id), reasonsIds, path, dateNow, timeNow, timeNow, dateNow)
                    .then(() => {
                        let message: string = "Attestation générée";
                        this.setState({ popupActive: true, popupMessage: message })
                    })
                    .catch((err) => {
                        const message: string = "ERREUR : " + err;
                        this.setState({ popupActive: true, popupMessage: message })
                    });
            })
            .catch((err) => console.log(err))


        this.resetAllCheckbox();


    }



    canGenerate(): boolean {
        if(this.state.toggleAutoDate === true && this.state.toggleAutoTime === false) {
            return (this.state.connectedUser === undefined) || (this.state.checkboxList.filter((item: ICheckboxList) => item.isChecked === true).length === 0 || this.state.customDate === "");

        } else if (this.state.toggleAutoDate === false && this.state.toggleAutoTime === true) {
            console.log("BITE")
            return (this.state.connectedUser === undefined) || (this.state.checkboxList.filter((item: ICheckboxList) => item.isChecked === true).length === 0 || this.state.customTime === "");
        } else if (this.state.toggleAutoDate === true && this.state.toggleAutoTime === true) {
            return (this.state.connectedUser === undefined) || (this.state.checkboxList.filter((item: ICheckboxList) => item.isChecked === true).length === 0 || this.state.customDate === "" || this.state.customTime === "");
        } else {
            return (this.state.connectedUser === undefined) || (this.state.checkboxList.filter((item: ICheckboxList) => item.isChecked === true).length === 0);
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.viewCreateAttestation}>











                    {
                        (() => {
                            if (this.state.toggleAutoDate === false && this.state.toggleAutoTime === false) {
                                return (this.renderCheckboxList())
                            } else {
                                return (
                                    <KeyboardAwareScrollView style={{ flex: 1 }}>
                                        <ScrollView
                                            style={{ flexGrow: 1 }}
                                            keyboardShouldPersistTaps="handled">
                                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                                {(() => {
                                                    return (this.renderCheckboxList());
                                                })()}

                                                <View style={{ flex: 1, padding: '5%', flexDirection: 'column' }}>

                                                    {(() => {
                                                        if (this.state.toggleAutoTime) {
                                                            return (
                                                                <TextInput
                                                                    theme={{ colors: { primary: 'red', placeholder: 'gray', background: 'white', text: 'black' } }}
                                                                    label="Heure sortie"
                                                                    mode="outlined"
                                                                    keyboardType="default"
                                                                    value={this.state.customTime}
                                                                    onChangeText={(newText)=> this.setState({customTime: newText})}
                                                                />);

                                                        }
                                                    })()}

                                                    {(() => {
                                                        if (this.state.toggleAutoDate) {
                                                            return (
                                                                <TextInput
                                                                    theme={{ colors: { primary: 'red', placeholder: 'gray', background: 'white', text: 'black' } }}
                                                                    label="Date sortie"
                                                                    mode="outlined"
                                                                    keyboardType="default"
                                                                    value={this.state.customDate}
                                                                    onChangeText={(newText)=> this.setState({customDate: newText})}
                                                                />);
                                                        }
                                                    })()}
                                                </View>

                                            </View>

                                        </ScrollView>
                                    </KeyboardAwareScrollView  >
                                )
                            }
                        })()
                    }



                </View>

                <View style={styles.viewButtonSection}>
                    <TouchableOpacity activeOpacity={0.7}
                        disabled={this.canGenerate()}
                        onPress={() => this.generateAttestation()}
                        style={{ ...styles.buttonStyle, backgroundColor: (this.canGenerate() ? 'gray' : '#e50d54') }} >
                        <Text style={styles.textStyle}>Générer attestation</Text>
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


    updateCheckboxList(index: number) {
        let temp = this.state.checkboxList;
        temp[index].isChecked = !temp[index].isChecked
        this.setState({ checkboxList: temp })
    }


    renderCheckboxList() {

        return (
            this.state.checkboxList.map((item: ICheckboxList, index) => {
                return (
                    <View style={styles.viewCreateAttestationContener} key={item.attestation.id}>
                        <View style={{ flex: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                <Checkbox.Android
                                    status={this.state.checkboxList[index].isChecked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        this.updateCheckboxList(index);
                                    }}
                                    color='#e50d54'
                                    uncheckedColor='gray'
                                />
                            </View>
                            <View style={{ flex: 5, flexDirection: 'column', justifyContent: 'center' }}>

                                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                    this.updateCheckboxList(index);
                                }}>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={{ color: this.state.checkboxList[index].isChecked ? 'black' : 'gray' }}>
                                            {item.attestation.shortDescription}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <MomotoculteurModal description={item.attestation.description} />

                        </View>

                    </View>
                )
            }));
    }

}

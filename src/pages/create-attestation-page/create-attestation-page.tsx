import * as React from 'react';
import { Alert, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { styles } from './style'
import { ALL_ATTESTATIONS_TYPE } from '../../components/shared/constant/CAttestationType';
import { IAttestationType } from '../../components/shared/interface/general/IAttestationType';
import MomotoculteurModal from '../../components/atoms/momotoculteur-modal/momotoculteurModal';
import { getCurrentUser } from '../../services/storage/userAsyncStorage';
import { IUserObject } from '../../components/shared/interface/object/IUserObject';
import MomotoculteurCheckbox from '../../components/atoms/momotoculteur-checkbox/momotoculteurCheckbox';
import DatabaseManager from '../../database/DatabaseManager';
import { ICheckboxList } from '../../components/shared/interface/general/ICheckboxList';
import { Checkbox } from 'react-native-paper';


interface iState {
    connectedUser?: IUserObject,
    checkboxList: ICheckboxList[],
}
interface IProps {

}
export default class CreateAttestionPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            connectedUser: undefined,
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
            ]
        }
    }

    componentDidMount() {
        // Init l'user courrant
        this.initializeAndProvideCurrentUser();
    }

    initializeAndProvideCurrentUser(): void {
        getCurrentUser().then(result => this.setState({ connectedUser: result }));
        this.props.navigation.addListener('focus', () => {
            getCurrentUser().then(result => this.setState({ connectedUser: result }));
        });
    }

    generateAttestation() {
        console.log('GEN ATTEST')

        const fullDatetime = new Date();

        // Date DD/MM/YYY
        //const dateNow: string = String(fullDatetime.getDate()).padStart(2, '0') + "/" + String(fullDatetime.getMonth() +1 ).padStart(2, '0') + "/" + fullDatetime.getFullYear()
        const dateNow: string = fullDatetime.toLocaleDateString('fr-FR');

        // Temps
        const timeNow: string = fullDatetime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });





        DatabaseManager.createAttestation(dateNow, timeNow, Number(this.state.connectedUser?.id), "2");


        //DatabaseManager.maurice(dateNow, timeNow, Number(this.state.connectedUser?.id), "1")
        //let list: IAttestation = [];
        //DatabaseManager.insertAttest(dateNow, timeNow, Number(this.state.connectedUser?.id), "1");
        //DatabaseManager.getAllAttestationByUserId(5);
    }



    canGenerate(): boolean {
        return (this.state.connectedUser === undefined) || (this.state.checkboxList.filter((item: ICheckboxList) => item.isChecked === true).length === 0);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewCreateAttestation}>


                    {(() => {
                        return (this.renderCheckboxList())
                    })()}



                </View>
                <View style={styles.viewButtonSection}>
                    <TouchableOpacity activeOpacity={0.7}
                        disabled={this.canGenerate()}
                        onPress={() => this.generateAttestation()}
                        style={{ ...styles.buttonStyle, backgroundColor: (this.canGenerate() ? 'gray' : '#e50d54') }} >
                        <Text style={styles.textStyle}>Générer attestation</Text>
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
    //                             <Ionicons name="md-information-circle-outline" size={15} color='#e50d54' onPress={() => Alert.alert('lolol')} />
    //                     <Text style={styles.textStyle}>Show Modal</Text>
    // <MomotoculteurModal description={item.description} />

    /*

    <View style={{ flex: 5 }}>
                            <MomotoculteurCheckbox label={item.shortDescription} />
                        </View>

                        */

    updateCheckboxList(index: number) {
        console.log(index)
        //console.log(this.state.checkboxList)
        let temp = this.state.checkboxList;
        temp[index].isChecked = !temp[index].isChecked
        this.setState({checkboxList: temp})
    }


    renderCheckboxList() {

        return (
            this.state.checkboxList.map((item: ICheckboxList, index) => {
                return (
                    <View style={styles.viewCreateAttestationContener} key={item.attestation.label}>
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
                                        <Text>
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

import * as React from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './style'
import { ALL_ATTESTATIONS_TYPE } from '../../components/shared/constant/CAttestationType';
import { IAttestationType } from '../../components/shared/interface/IAttestationType';
import MomotoculteurModal from '../../components/atoms/momotoculteur-modal/momotoculteurModal';
import { getCurrentUser } from '../../services/storage/userAsyncStorage';
import { IUser } from '../../components/shared/interface/IUser';
import MomotoculteurCheckbox from '../../components/atoms/momotoculteur-checkbox/momotoculteurCheckbox';




interface iState {
    connectedUser?: IUser,
}
interface IProps {

}
export default class CreateAttestionPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            connectedUser: undefined
        }
    }

    componentDidMount() {
        console.log('CHE')
        // Init l'user courrant
        this.initializeAndProvideCurrentUser();
    }

    initializeAndProvideCurrentUser(): void {
        getCurrentUser().then(result => this.setState({ connectedUser: result }));
        this.props.navigation.addListener('focus', () => {
            getCurrentUser().then(result => this.setState({ connectedUser: result }));
        });
    }

        render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewCreateAttestation}>


                    {this.renderCheckboxList()}



                </View>
                <View style={styles.viewButtonSection}>
                    <TouchableOpacity activeOpacity={0.7}
                    disabled={this.state.connectedUser === undefined}
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        style={{...styles.buttonStyle, backgroundColor:(this.state.connectedUser === undefined ? 'gray' : '#e50d54') }} >
                        <Text style={styles.textStyle}>Générer attestation</Text>
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
    //                             <Ionicons name="md-information-circle-outline" size={15} color='#e50d54' onPress={() => Alert.alert('lolol')} />
    //                     <Text style={styles.textStyle}>Show Modal</Text>
    // <MomotoculteurModal description={item.description} />

    renderCheckboxList() {

        return (
            ALL_ATTESTATIONS_TYPE.map((item: IAttestationType) => {
                return (
                    <View style={styles.viewCreateAttestationContener} key={item.id}>
                        <View style={{ flex: 5 }}>
                            <MomotoculteurCheckbox label={item.shortDescription} />
                        </View>
                        <View style={{ flex: 1 }}>
                           <MomotoculteurModal description={item.description} />

                        </View>

                    </View>
                )
            }));
    }

}

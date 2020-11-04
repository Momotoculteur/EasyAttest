import * as React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import { styles } from './style'
import { ALL_ATTESTATIONS_TYPE } from '../../components/shared/constant/CAttestationType';
import { IAttestationType } from '../../components/shared/IAttestationType';
import { Ionicons } from '@expo/vector-icons'
import { Checkbox } from 'react-native-paper';
import MomotoculteurCheckbox from '../../components/atoms/momotoculteur-checkbox/momotoculteurCheckbox';
import MomotoculteurModal from '../../components/atoms/momotoculteur-modal/momotoculteurModal';



export default class CreateAttestionPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewCreateAttestation}>


                    {this.renderCheckboxList()}



                </View>
                <View style={styles.viewButtonSection}>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        style={styles.buttonStyle}>
                             <Text style={styles.textStyle}>Générer attestation</Text>
                        </TouchableOpacity>
                       
                    
                </View>
            </View>
        );
    }
    //                             <Ionicons name="md-information-circle-outline" size={15} color='#e50d54' onPress={() => Alert.alert('lolol')} />
    //                     <Text style={styles.textStyle}>Show Modal</Text>

    renderCheckboxList() {

        return (
            ALL_ATTESTATIONS_TYPE.map((item: IAttestationType) => {
                return (
                    <View style={styles.viewCreateAttestationContener} key={item.id}>
                        <View style={{ flex: 5 }}>
                            <MomotoculteurCheckbox label={item.shortDescription} />
                        </View>
                        <View style={{ flex: 1}}>
                            <MomotoculteurModal description={item.description}/>

                        </View>

                    </View>
                )
            }));
    }

}

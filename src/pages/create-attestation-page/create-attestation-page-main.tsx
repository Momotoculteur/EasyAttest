import * as React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { styles } from './style'
import { ALL_ATTESTATIONS_TYPE } from '../../components/shared/constant/CAttestationType';
import { IAttestationType } from '../../components/shared/IAttestationType';
import { Ionicons } from '@expo/vector-icons'
import { Checkbox } from 'react-native-paper';
import MomotoculteurCheckbox from '../../components/atoms/momotoculteur-text-input/momotoculteurCheckbox';


export default class CreateAttestionPage extends React.Component {


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewCreateAttestation}>


                    {this.renderCheckboxList()}



                </View>
                <View style={styles.viewButtonSection}>
                    <Button
                        title="Générer attestation"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        color='#e50d54'
                    />
                </View>
            </View>
        );
    }

    renderCheckboxList() {

        return (
            ALL_ATTESTATIONS_TYPE.map((item: IAttestationType) => {
                return (
                    <View style={styles.viewCreateAttestationContener} key={item.id}>
                        <View style={{flex: 1, flexDirection:'column', justifyContent:'center'}}>
                        <MomotoculteurCheckbox />
                            </View>
                        <View style={{flex: 5, flexDirection:'column', justifyContent:'center'}}>
                              <Text onPress={() => {console.log('click')}}>
                                  
                            {item.shortDescription}
                        </Text>
                        </View>
                      <View style={{flex: 1, flexDirection:'column', justifyContent:'center', alignItems:'flex-end', paddingRight:10}}>
                      <Ionicons name="md-information-circle-outline" size={15} color='#e50d54' />

                      </View>

                    </View>
                )
            }));
    }

}

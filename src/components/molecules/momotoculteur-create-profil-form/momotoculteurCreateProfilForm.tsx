import * as React from 'react';
import { View } from 'react-native';
import MomotoculteurTextInput from '../../atoms/momotoculteur-text-input/momotoculteurTextInput';
import { styles } from './style'


export default class MomotoculteurCreateProfilForm extends React.Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: '5%'}}>
                <MomotoculteurTextInput label="Prénom" mode="outlined" />
                <MomotoculteurTextInput label="Nom" mode="outlined" />
                <MomotoculteurTextInput label="Date de naissance" mode="outlined"  />
                <MomotoculteurTextInput label="Lieu de naissance" mode="outlined"  />
                <MomotoculteurTextInput label="Adresse" mode="outlined" />
                <MomotoculteurTextInput label="Ville" mode="outlined"  />
                <MomotoculteurTextInput label="Code postal" mode="outlined"  />

            </View>

        );
    }
}
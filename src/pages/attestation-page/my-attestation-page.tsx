import React from 'react';
import { Alert, Button, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { IAttestationObject } from '../../components/shared/interface/object/IAttestationObject';
import { IUserObject } from '../../components/shared/interface/object/IUserObject';
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
            connectedUser: undefined,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 5 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.lis.map((item, index) => {

                        })}
                    </ScrollView>

                </View>

                <View style={styles.viewButtonSection}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                        style={styles.buttonStyle}>
                        <Text style={styles.textStyle}>Tout supprimer</Text>

                    </TouchableOpacity>
                </View>

            </View>
        );
    }


}


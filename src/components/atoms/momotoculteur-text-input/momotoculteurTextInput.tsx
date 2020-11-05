import * as React from "react";
import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInputFocusEventData,
    TextInputProps
} from "react-native";
import { TextInput } from 'react-native-paper';
import { styles } from './style'

interface IProps {
    mode: string;
    label: string;
    getData: any
}

export default class MomotoculteurTextInput extends React.Component<IProps> {

    state = {
        inputTextValue: ''
    }


    constructor(props: any) {
        super(props);
        this.updateUi = this.updateUi.bind(this)
    }

    updateUi(updatedInputValue: string) {
        this.setState({ inputTextValue: updatedInputValue });
        this.props.getData(updatedInputValue)
    }



    render() {
        const { inputTextValue } = this.state;

        return (
            <TextInput
                label={this.props.label}
                value={inputTextValue}
                onChangeText={this.updateUi}
                //underlineColor={this.props.color}
                theme={{ colors: { primary: 'red', placeholder: 'gray', background: 'white', text: 'black' } }}
                mode={this.props.mode}
            />
        );
    }

}



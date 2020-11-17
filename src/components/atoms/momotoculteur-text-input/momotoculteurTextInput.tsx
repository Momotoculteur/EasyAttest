import * as React from "react";
import {
    View,
} from "react-native";
import { HelperText, TextInput, } from 'react-native-paper';
import { styles } from './style'
import { validateCreateProfilFormService } from '../../../services/validateCreateProfilFormService'
import { Observable, Observer } from "rxjs";
import {TextInputMask} from 'react-native-text-input-mask';

interface IProps {
    mode: string,
    label: string,
    getData: any,
    keyboardType: string,
    maxLength?: number,
}
interface IState {
    inputTextValue: string,
    errorInForm: boolean
}

export default class MomotoculteurTextInput extends React.Component<IProps, IState> {

    subscription: any;

    constructor(props: any) {
        super(props);

        this.state = {
            inputTextValue: '',
            errorInForm: false,
        };
        this.updateUi = this.updateUi.bind(this);
    }

    componentDidMount() {
        this.subscription = validateCreateProfilFormService.validateForm().subscribe(() => {
            if (this.state.inputTextValue === "") {
                this.setState({ errorInForm: true });
            } else {
                this.setState({ errorInForm: false });
            }
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    updateUi(updatedInputValue: string) {
        this.setState({ inputTextValue: updatedInputValue });
        this.props.getData(updatedInputValue);
    }

    isEmpty() {
        return (this.state.inputTextValue === "");
    }

    renderErrorEmptyForm() {
        return (

            <HelperText type="error" visible={this.state.errorInForm}>
                {this.props.label} est requis
            </HelperText>
        )
    }

    render() {
        const { inputTextValue } = this.state;

        return (
            <View>
                <TextInput
                    error={this.state.errorInForm}
                    label={this.props.label}
                    value={inputTextValue}
                    onChangeText={this.updateUi}
                    //underlineColor={this.props.color}
                    theme={{ colors: { primary: 'red', placeholder: 'gray', background: 'white', text: 'black' } }}
                    mode={this.props.mode}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                />

                {(() => {
                    if (this.state.errorInForm) {
                        return (this.renderErrorEmptyForm())
                    }
                })()}
            </View>

        );
    }

}



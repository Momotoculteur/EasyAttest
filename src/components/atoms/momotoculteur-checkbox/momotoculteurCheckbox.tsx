import * as React from 'react';
import { render } from 'react-dom';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { ECheckboxState } from '../../shared/enum/ECheckboxState';


interface IProps {
    label: string
}

export default class MomotoculteurCheckbox extends React.Component<IProps> {

    private currentState: ECheckboxState;
    state = {
        checked: false
    };

    constructor(props: any) {
        super(props);
        this.currentState = ECheckboxState.UNCHECKED;

    }

    render() {
        const { checked } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Checkbox.Android
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            this.setState({ checked: !checked });
                        }}
                        color='#e50d54'
                        uncheckedColor='gray'
                    />
                </View>
                <View style={{ flex: 5, flexDirection: 'column', justifyContent: 'center' }}>
                    
                    <Text onPress={() => {
                        this.setState({ checked: !checked });
                    }}>
                        {this.props.label}
                    </Text>
                </View>

            </View >
        );
    }

};


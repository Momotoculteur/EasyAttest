import * as React from 'react';
import { render } from 'react-dom';
import { Checkbox } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { ECheckboxState } from '../../shared/enum/ECheckboxState';



export default class MomotoculteurCheckbox extends React.Component {

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
            <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    this.setState({checked: !checked});
                    console.log(checked)
                }}
                color='#e50d54'
                uncheckedColor='gray'
                
            />
        );
    }

};


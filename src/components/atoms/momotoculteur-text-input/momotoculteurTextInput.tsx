import * as React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps
} from "react-native";
import {styles} from './style'

interface State {
  isFocused: boolean;
}
const BLUE = "#e50d54";
const LIGHT_GRAY = "#D3D3D3";


export default class MomotoculteurTextInput extends React.Component<TextInputProps, State> {
    state = {
      isFocused: false
    };
  
    handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      this.setState({ isFocused: true });
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    };
  
    handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      this.setState({ isFocused: false });
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    };
  
    render() {
      const { isFocused } = this.state;
      const { onFocus, onBlur, placeholder } = this.props;
      return (
        <TextInput
          selectionColor={BLUE}
          underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={styles.textInput}
          placeholder={placeholder}
        />
      );
    }
  }
  


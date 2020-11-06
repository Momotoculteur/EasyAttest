import { styles } from './style'
import * as React from 'react'
import { View, Text, Switch } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface iState {
    checkboxAutoDate: boolean;
    checkboxAutoHour: boolean;
    toggleDarkTheme: boolean;
}
interface IProps {
}
export default class SettingsPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            checkboxAutoDate: true,
            checkboxAutoHour: true,
            toggleDarkTheme: false
        }
    }

    initializeSettings() {

    }





    render() {
        return (
            <View style={styles.global}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', margin: 20 }}>

                    <View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Attestations</Text>
                            <View style={{ borderBottomColor: '#e50d54', borderBottomWidth: 3, width: '20%', paddingTop: 5 }} ></View>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <Checkbox.Android
                                status={this.state.checkboxAutoDate ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({ checkboxAutoDate: !this.state.checkboxAutoDate });
                                }}
                                color='#e50d54'
                                uncheckedColor='gray'
                            />
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                this.setState({ checkboxAutoDate: !this.state.checkboxAutoDate });
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text style={{}}>Remplissage auto Date</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Checkbox.Android
                                status={this.state.checkboxAutoHour ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    this.setState({ checkboxAutoHour: !this.state.checkboxAutoHour });
                                }}
                                color='#e50d54'
                                uncheckedColor='gray'
                            />
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                this.setState({ checkboxAutoHour: !this.state.checkboxAutoHour });
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text>Remplissage auto Heure</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View>
                        <View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Interface</Text>
                                <View style={{ borderBottomColor: '#e50d54', borderBottomWidth: 3, width: '20%', paddingTop: 5 }}></View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>

                                <Switch
                                    value={this.state.toggleDarkTheme}
                                    trackColor={{ true: '#e50d54' }}
                                    ios_backgroundColor="gray"
                                    onValueChange={
                                        () => {
                                            this.setState({ toggleDarkTheme: !this.state.toggleDarkTheme })
                                        }}
                                />
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                    this.setState({ toggleDarkTheme: !this.state.toggleDarkTheme });
                                }}>
                                    <View style={{ flex: 1, paddingLeft: 10, flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text>Theme sombre</Text>

                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>






                </View>
            </View >
        )
    }
}
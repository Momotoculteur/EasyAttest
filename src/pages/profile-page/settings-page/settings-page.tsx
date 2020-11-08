import { styles } from './style'
import * as React from 'react'
import { View, Text, Switch } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface iState {
    toggleAutoDate: boolean;
    toggleAutoHour: boolean;
    toggleDarkTheme: boolean;
    toggleAutoTitle: boolean

}
interface IProps {
}
export default class SettingsPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            toggleAutoDate: true,
            toggleAutoHour: true,
            toggleDarkTheme: false,
            toggleAutoTitle: true
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
                            <Switch
                                value={this.state.toggleAutoDate}
                                onValueChange={() => {
                                    this.setState({ toggleAutoDate: !this.state.toggleAutoDate });
                                }}
                                trackColor={{ true: '#e50d54', false: "gray" }} thumbColor={this.state.toggleDarkTheme ? "white" : "white"}
                                ios_backgroundColor="gray" />
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                this.setState({ toggleAutoDate: !this.state.toggleAutoDate });
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text style={{}}>Remplissage auto Date</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

                            <Switch
                                value={this.state.toggleAutoHour}
                                onValueChange={() => {
                                    this.setState({ toggleAutoHour: !this.state.toggleAutoHour });
                                }}
                                trackColor={{ true: '#e50d54', false: "gray" }} thumbColor={this.state.toggleDarkTheme ? "white" : "white"}
                                ios_backgroundColor="gray"
                            />
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                this.setState({ toggleAutoHour: !this.state.toggleAutoHour });
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text>Remplissage auto Heure</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>

                            <Switch
                                value={this.state.toggleAutoTitle}
                                onValueChange={() => {
                                    this.setState({ toggleAutoTitle: !this.state.toggleAutoTitle });
                                }}
                                trackColor={{ true: '#e50d54', false: "gray" }} thumbColor={this.state.toggleDarkTheme ? "white" : "white"}
                                ios_backgroundColor="gray"
                            />
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                this.setState({ toggleAutoTitle: !this.state.toggleAutoTitle });
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text>Remplissage titre attestation</Text>
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
                                    trackColor={{ true: '#e50d54', false: "gray" }} thumbColor={this.state.toggleDarkTheme ? "white" : "white"}
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
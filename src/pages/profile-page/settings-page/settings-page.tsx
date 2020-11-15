import { styles } from './style'
import * as React from 'react'
import { View, Text, Switch } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getAutoDateSetting, getAutoTimeSetting } from '../../../services/storage/settingsAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface iState {
    toggleAutoDate?: boolean;
    toggleAutoTime?: boolean;
    toggleDarkTheme: boolean;

}
interface IProps {
}
export default class SettingsPage extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            toggleDarkTheme: false
        }
    }



    initializeSettings() {
        getAutoDateSetting()
            .then((toggle) => {
                if (toggle !== undefined) {
                    this.setState({ toggleAutoDate: toggle });
                    console.log(toggle)
                }
            });
        getAutoTimeSetting()
            .then((toggle) => {
                if (toggle !== undefined) {
                    this.setState({ toggleAutoTime: toggle });
                }
            });
    }

    componentDidMount() {
        this.initializeSettings()
    }

    persistAutoDate() {
        this.setState({ toggleAutoDate: !this.state.toggleAutoDate });
        AsyncStorage.setItem('@settings_AutoDate', JSON.stringify(!this.state.toggleAutoDate))
    }

    persistAutoTime() {
        this.setState({ toggleAutoTime: !this.state.toggleAutoTime });
        AsyncStorage.setItem('@settings_AutoTime', JSON.stringify(!this.state.toggleAutoTime))
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
                                    this.persistAutoDate();
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
                                value={this.state.toggleAutoTime}
                                onValueChange={() => {
                                    this.persistAutoTime();
                                }}
                                trackColor={{ true: '#e50d54', false: "gray" }} thumbColor={this.state.toggleDarkTheme ? "white" : "white"}
                                ios_backgroundColor="gray"
                            />
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                                this.setState({ toggleAutoTime: !this.state.toggleAutoTime });
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
                                    disabled
                                    value={this.state.toggleDarkTheme}
                                    trackColor={{ true: '#e50d54', false: "gray" }} thumbColor={this.state.toggleDarkTheme ? "white" : "white"}
                                    ios_backgroundColor="gray"
                                    onValueChange={
                                        () => {
                                            this.setState({ toggleDarkTheme: !this.state.toggleDarkTheme })
                                        }}
                                />
                                <TouchableOpacity style={{ flex: 1 }} disabled onPress={() => {
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
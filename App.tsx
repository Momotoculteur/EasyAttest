import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MainTabNav from './src/navigation/tabNavigator'
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import DatabaseManager from './src/database/DatabaseManager'
import { initializeAllAsyncStorage } from './src/services/storage/initializeAsyncStorage';



let customFonts = {
    'Arial': require('./src/assets/fonts/arial.ttf'),
}

interface iState {
    fontsLoaded: boolean;
}
interface IProps {

}
export default class App extends React.Component<IProps, iState> {

  
    constructor(props: IProps) {
        super(props);      

        this.state = {
            fontsLoaded: false,
        }




    }




    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
        initializeAllAsyncStorage();
        DatabaseManager.initializeDatabase();
    }


    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {

            return (

                <SafeAreaView style={styles.container}>
                        <MainTabNav />
                </SafeAreaView >
            )
        }
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});


import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MainTabNav from './src/navigation/tabNavigator'
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import DatabaseManager from './src/database/DatabaseManager'
import { initializeAllAsyncStorage } from './src/services/storage/initializeAsyncStorage';


export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

export const ThemeContext = React.createContext({
    toggleTheme: () => { },
    theme: themes.dark, // valeur par défaut
});

let customFonts = {
    'Arial': require('./src/assets/fonts/arial.ttf'),
}

interface iState {
    fontsLoaded: boolean;
    theme: any;
    toggleTheme: any;
}
interface IProps {

}
export default class App extends React.Component<IProps, iState> {

    constructor(props: IProps) {
        super(props);




        this.state = {
            fontsLoaded: false,
            theme: themes.light,
            toggleTheme: this.toggleTheme
        }


        initializeAllAsyncStorage();
        DatabaseManager.initializeDatabase();

    }



    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }


    render() {
        if (this.state.fontsLoaded) {
            return <AppLoading />;
        } else {

            return (

                <SafeAreaView style={styles.container}>
                    <ThemeContext.Provider value={this.state}>
                        <MainTabNav />
                    </ThemeContext.Provider>
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


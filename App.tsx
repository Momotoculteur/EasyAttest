import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import MainTabNav from './src/navigation/tabNavigator'

export default function App() {
    return (
        <SafeAreaView  style={styles.container}>
            <MainTabNav />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS ==="android" ? StatusBar.currentHeight :0
    }
});

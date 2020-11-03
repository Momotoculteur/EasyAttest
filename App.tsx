import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import MainTabNav from './src/navigation/tabNavigator'

export default function App() {
    return (
        <View style={styles.container}>
            <MainTabNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
});

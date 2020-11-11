import AsyncStorage from "@react-native-async-storage/async-storage"

export async function initializeAllAsyncStorage() {
    /*
    try {
        // SETTINGS
        await AsyncStorage.setItem('@settings_AutoDate', JSON.stringify(true))
        await AsyncStorage.setItem('@settings_AutoHour', JSON.stringify(true))

    } catch (e) {
        console.log("ERROR: + " + e)
    }
    */

    initSettingsThemeToggle();

}

async function initSettingsThemeToggle() {
    try {
        const jsonValue = await AsyncStorage.getItem('@settings_Theme')
        if(jsonValue == null) {
            await AsyncStorage.setItem('@settings_Theme', JSON.stringify(false))
        }
      } catch(e) {
            console.log('ERREUR : ' + e);
      }
}

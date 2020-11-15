import AsyncStorage from "@react-native-async-storage/async-storage"

export async function initializeAllSettings() {
    initSettingsThemeToggle();
    initSettingsAutoDate();
    initSettingsAutoTime();
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

async function initSettingsAutoDate() {
    try {
        const jsonValue = await AsyncStorage.getItem('@settings_AutoDate')
        if(jsonValue == null) {
            await AsyncStorage.setItem('@settings_AutoDate', JSON.stringify(true))
        }
      } catch(e) {
            console.log('ERREUR : ' + e);
      }
}

async function initSettingsAutoTime() {
    try {
        const jsonValue = await AsyncStorage.getItem('@settings_AutoTime')
        if(jsonValue == null) {
            await AsyncStorage.setItem('@settings_AutoTime', JSON.stringify(true))
        }
      } catch(e) {
            console.log('ERREUR : ' + e);
      }
}

export async function getAutoDateSetting() {
    try {
        const value = await AsyncStorage.getItem('@settings_AutoDate')
        if(value !== null) {
          return Boolean(JSON.parse(value));
        } else {
            return undefined;
        }
      } catch(e) {
      }
}

export async function getAutoTimeSetting() {
    try {
        const value = await AsyncStorage.getItem('@settings_AutoTime')
        if(value !== null) {
            return Boolean(JSON.parse(value));
        } else {
            return undefined;
        }
      } catch(e) {
      }
}
#! /bin/sh

# #
# Genere un apk
# #

# Clean
echo ""
echo "~~~ CLEAN DIST"
echo ""
rm -rf dist 

# Export
echo ""
echo "~~~ EXPORT APP"
echo ""
expo export --dev --public-url http://127.0.0.1:8000/ 

# Serve
echo ""
echo "~~~ SERVE DU DOSSIER DIST"
echo ""
cd ./dist
python3 -m http.server 8000 &
sleep 5 
cd ..


# Build 
echo ""
echo "~~~ BUILD"
echo ""
EXPO_ANDROID_KEYSTORE_PASSWORD="" \
EXPO_ANDROID_KEY_PASSWORD="" \
turtle build:android \
--type apk \
--keystore-path ./certif/android/keystore.jks \
--keystore-alias "easyattest" \
--allow-non-https-public-url \
--public-url http://127.0.0.1:8000/android-index.json

# Recup
echo ""
echo "~~~ MOVE"
echo ""
mv /home/momotoculteur/expo-apps/* ./apk/




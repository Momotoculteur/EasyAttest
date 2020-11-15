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
EXPO_IOS_DIST_P12_PASSWORD="" \
turtle build:ios \
  --team-id 5JVNANHGYR \
  --dist-p12-path ./certif/ios/certif.p12 \
  --provisioning-profile-path ./certif/ios/provision.mobileprovision \
  --allow-non-https-public-url \
  --public-url http://127.0.0.1:8000/ios-index.json



# Recup
echo ""
echo "~~~ MOVE"
echo ""
mv /Users/momotoculteur/expo-apps/* ./build/ios/
#!/usr/bin/env bash

# this script needs to be executed BEFORE build or run the RN project

# if script is not running as expected, you may need to grant permission by running: chmod +x ./configure-env.sh

# this scrpt is called via npm by using "npm run configure-env -- <local || develop || qa || prod>"

# if firebase is installed 

AppEnv=$1

echo "AppEnv: $AppEnv" # local, develop, stage, prod;; We currently don't have a local version of firebase

PATH_TO_ENV_FILES="./.envFiles"
ENV_FILE_DESINATION_PATH="./.env"

APPCENTER_PLISTS_SOURCE_PATH="./appcenterConfigFiles"
APP_CENTER_PLIST_DESTINATION_PATH="./ios/AppCenter-Config.plist"
APP_CENTER_JSON_DESTINATION_PATH="./android/app/src/main/assets/appcenter-config.json"
GOOGLE_SERVICE_SOURCE_PATH="./firebaseConfigFiles"
GOOGLE_SERVICE_DESTINATION_PATH="./android/app/google-services.json"

case "${AppEnv}" in

  "uat" )
  cp -r "$PATH_TO_ENV_FILES/.env.uat" "$ENV_FILE_DESINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/AppCenter-Config-uat.plist" "$APP_CENTER_PLIST_DESTINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/appcenter-config-uat.json" "$APP_CENTER_JSON_DESTINATION_PATH"
  cp -r "$GOOGLE_SERVICE_SOURCE_PATH/google-services-uat.json" "$GOOGLE_SERVICE_DESTINATION_PATH"
  echo ".env" > /tmp/envfile
  ;;

  "dev" )
  cp -r "$PATH_TO_ENV_FILES/.env.dev" "$ENV_FILE_DESINATION_PATH"
  echo ".env" > /tmp/envfile
  ;;

  "qa" )
  cp -r "$PATH_TO_ENV_FILES/.env.qa" "$ENV_FILE_DESINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/AppCenter-Config-qa.plist" "$APP_CENTER_PLIST_DESTINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/appcenter-config-qa.json" "$APP_CENTER_JSON_DESTINATION_PATH"
  cp -r "$GOOGLE_SERVICE_SOURCE_PATH/google-services-uat.json" "$GOOGLE_SERVICE_DESTINATION_PATH"
  echo ".env" > /tmp/envfile
  ;;

  "prod" )
  cp -r "$PATH_TO_ENV_FILES/.env.prod" "$ENV_FILE_DESINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/AppCenter-Config-qa.plist" "$APP_CENTER_PLIST_DESTINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/appcenter-config-qa.json" "$APP_CENTER_JSON_DESTINATION_PATH"
  cp -r "$GOOGLE_SERVICE_SOURCE_PATH/google-services-prod.json" "$GOOGLE_SERVICE_DESTINATION_PATH"
  echo ".env" > /tmp/envfile
  ;;

  "local" )
  cp -r "$PATH_TO_ENV_FILES/.env.local" "$ENV_FILE_DESINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/AppCenter-Config-qa.plist" "$APP_CENTER_PLIST_DESTINATION_PATH"
  cp -r "$APPCENTER_PLISTS_SOURCE_PATH/appcenter-config-qa.json" "$APP_CENTER_JSON_DESTINATION_PATH"
  cp -r "$GOOGLE_SERVICE_SOURCE_PATH/google-services-uat.json" "$GOOGLE_SERVICE_DESTINATION_PATH"
  echo ".env" > /tmp/envfile
  ;;

  *)
  echo "No App environment specified. Using develop as default.  Valid options: dev, qa, prod"

  cp -r "$PATH_TO_ENV_FILES/.env.develop" "$ENV_FILE_DESINATION_PATH"
  echo ".env" > /tmp/envfile
  ;;
esac
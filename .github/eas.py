import json
import sys


expo_public_api_key = sys.argv[1]
expo_public_auth_domain = sys.argv[2]
expo_public_project_id = sys.argv[3]
expo_public_storage_bucket = sys.argv[4]
expo_public_messaging_sender_id = sys.argv[5]
expo_public_app_id = sys.argv[6]
expo_public_measurement_id = sys.argv[7]

# Data to be written
dictionary = {
    "build": {
        "preview": {
            "android": {
                "buildType": "apk"
            },
            "env": {
                "EXPO_PUBLIC_API_KEY": expo_public_api_key,
                "EXPO_PUBLIC_AUTH_DOMAIN": expo_public_auth_domain,
                "EXPO_PUBLIC_PROJECT_ID": expo_public_project_id,
                "EXPO_PUBLIC_STORAGE_BUCKET": expo_public_storage_bucket,
                "EXPO_PUBLIC_MESSAGING_SENDER_ID": expo_public_messaging_sender_id,
                "EXPO_PUBLIC_APP_ID": expo_public_app_id,
                "EXPO_PUBLIC_MEASUREMENT_ID": expo_public_measurement_id
        }
      }
    }
}

# Serializing json
json_object = json.dumps(dictionary, indent=4)

# Writing to sample.json
with open("./eas.json", "w") as outfile:
    outfile.write(json_object)
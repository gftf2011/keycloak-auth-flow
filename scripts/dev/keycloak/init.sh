keycloak_url='http://keycloak:8080'
keycloak_realm='master'
keycloak_new_realm='keycloak-auth-flow'
keycloak_client_id_web='f62e00fa-f1b5-4791-9486-3befce70442e'
keycloak_client_id_backend='f62e00fa-f1b5-4791-9486-3befce70442f'

access_token=$(curl -X POST \
  $keycloak_url/realms/$keycloak_realm/protocol/openid-connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=admin' \
  -d 'password=admin' \
  -d 'grant_type=password' \
  -d 'client_id=admin-cli' | jq -r '.access_token')

echo $access_token

create_realm_response=$(curl -X POST \
  $keycloak_url/admin/realms \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${access_token}" \
  -d '{
    "realm": "'"${keycloak_new_realm}"'",
    "enabled":true
  }')

echo $create_realm_response

user_registration=$(curl -X PUT \
  $keycloak_url/admin/realms/$keycloak_new_realm \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${access_token}" \
  -d '{
    "registrationAllowed": true,
    "registrationEmailAsUsername": true,
    "verifyEmail": false,
    "duplicateEmailsAllowed": false,
    "passwordPolicy": "length(8) and upperCase(1) and lowerCase(1) and specialChars(1)"
  }')

echo $user_registration

create_client_response_web=$(curl -X POST \
  $keycloak_url/admin/realms/$keycloak_new_realm/clients \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${access_token}" \
  -d '{
    "id": "a92e1835-81a4-4de7-940f-df9397b67070",
    "clientId": "'"${keycloak_client_id_web}"'",
    "name": "keycloak-auth-flow_web-client",
    "description": "client for keycloak-auth-flow web application",
    "enabled": true,
    "consentRequired": false,
    "fullScopeAllowed": false,
    "authorizationServicesEnabled": false,
    "directAccessGrantsEnabled": true,
    "standardFlowEnabled": true,
    "surrogateAuthRequired": false,
    "publicClient": true,
    "defaultClientScopes": ["openid", "profile", "email"],
    "secret": "F0gLCQpDuK0sIukW1qCqPIFirDBOPHxA",
    "rootUrl": "http://localhost:5173/",
    "redirectUris": [ "http://localhost:5173/*" ],
    "webOrigins": [ "*" ]
  }')

# "defaultClientScopes": ["openid", "profile", "email", "offline_access"],

echo $create_client_response_web

create_client_response_backend=$(curl -X POST \
  $keycloak_url/admin/realms/$keycloak_new_realm/clients \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${access_token}" \
  -d '{
    "id": "a92e1835-81a4-4de7-940f-df9397b67071",
    "clientId": "'"${keycloak_client_id_backend}"'",
    "name": "keycloak-auth-flow_backend-client",
    "description": "client for keycloak-auth-flow backend application",
    "enabled": true,
    "consentRequired": false,
    "fullScopeAllowed": false,
    "authorizationServicesEnabled": true,
    "directAccessGrantsEnabled": false,
    "standardFlowEnabled": true,
    "serviceAccountsEnabled": true,
    "surrogateAuthRequired": false,
    "publicClient": false,
    "defaultClientScopes": ["openid", "profile", "email"],
    "secret": "F1gLCQpDuK0sIukW1qCqPIFirDBOPHxA",
    "rootUrl": "http://localhost:3001/",
    "redirectUris": [ "http://localhost:3001/*" ],
    "webOrigins": [ "*" ],
    "protocolMappers": [{
      "name": "refresh-token",
      "protocol": "openid-connect",
      "protocolMapper": "oidc-usersession-model-realm",
      "consentRequired": false,
      "config": {
        "user.session.note": "Refresh Token",
        "id.token.claim": "true",
        "access.token.claim": "true",
        "claim.name": "refresh_token",
        "jsonType.label": "String"
      }
    }]
  }')

echo $create_client_response_backend

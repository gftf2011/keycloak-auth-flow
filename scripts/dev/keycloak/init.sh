keycloak_url='http://keycloak:8080'
keycloak_realm='master'
keycloak_new_realm='keycloak-auth-flow'
keycloak_client_id_web='f62e00fa-f1b5-4791-9486-3befce70442e'
keycloak_client_id_backend='f62e00fa-f1b5-4791-9486-3befce70442f'
# backend_client_service_account_username="service-account-${keycloak_client_id_backend}"

access_token=$(curl -X POST \
  $keycloak_url/realms/$keycloak_realm/protocol/openid-connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=admin' \
  -d 'password=admin' \
  -d 'grant_type=password' \
  -d 'client_id=admin-cli' | jq -r '.access_token')

echo $access_token

# admin_id=$(curl -X GET \
#   $keycloak_url/admin/realms/$keycloak_realm/clients?clientId=admin-cli \
#   -H 'Content-Type: application/json' \
#   -H "Authorization: Bearer ${access_token}" | jq -r '.[0].id')

# echo $admin_id

create_realm_response=$(curl -X POST \
  $keycloak_url/admin/realms \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${access_token}" \
  -d '{
    "realm": "'"${keycloak_new_realm}"'",
    "enabled":true
  }')

# create_realm_response=$(curl -X POST \
#   $keycloak_url/admin/realms \
#   -H 'Content-Type: application/json' \
#   -H "Authorization: Bearer ${access_token}" \
#   -d @"./realm.json")

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
    "authorizationServicesEnabled": false,
    "directAccessGrantsEnabled": true,
    "standardFlowEnabled": true,
    "serviceAccountsEnabled": true,
    "surrogateAuthRequired": false,
    "publicClient": false,
    "defaultClientScopes": ["openid", "profile", "email"],
    "secret": "F1gLCQpDuK0sIukW1qCqPIFirDBOPHxA",
    "rootUrl": "http://localhost:3001/",
    "redirectUris": [ "http://localhost:3001/*" ],
    "webOrigins": [ "*" ]
  }')

echo $create_client_response_backend

# backend_client_service_account_user_id=$(curl -X GET \
#   $keycloak_url/admin/realms/$keycloak_new_realm/clients/a92e1835-81a4-4de7-940f-df9397b67071/service-account-user \
#   -H 'Content-Type: application/json' \
#   -H "Authorization: Bearer ${access_token}" | jq -r '.id')

# echo $backend_client_service_account_user_id

# role_mapping=$(curl -X POST \
#   $keycloak_url/admin/realms/$keycloak_new_realm/users/$backend_client_service_account_user_id/role-mappings/clients/a92e1835-81a4-4de7-940f-df9397b67071 \
#   -H "Authorization: Bearer ${access_token}" \
#   -H 'Content-Type: application/json' \
#   --data-raw '[
#     {
#       "id": "0d18220a-fadb-4cc0-ae58-5492c16d3258",
#       "name": "manage-users",
#       "description": "${role_manage-users}",
#       "composite": false,
#       "clientRole": true,
#       "containerId": "ad28f84c-22ea-4be1-9a13-c58bd5918859"
#     }
#   ]')

# role_mapping=$(curl -X POST \
#   $keycloak_url/admin/realms/$keycloak_new_realm/clients/a92e1835-81a4-4de7-940f-df9397b67071/roles \
#   -H "Authorization: Bearer ${access_token}" \
#   -H 'Content-Type: application/json' \
#   --data-raw '{
#     "id": "0d18220a-fadb-4cc0-ae58-5492c16d3258",
#     "name": "manage-users",
#     "description": "${role_manage-users}",
#     "composite": false,
#     "clientRole": true,
#     "containerId": "ad28f84c-22ea-4be1-9a13-c58bd5918859"
#   }')

# echo $role_mapping

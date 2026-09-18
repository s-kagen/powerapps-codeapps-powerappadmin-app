/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * This file is auto-generated. Do not modify it manually.
 * Changes to this file may be overwritten.
 */

export const dataSourcesInfo = {
  "powerappsforadmins": {
    "tableId": "",
    "version": "",
    "primaryKey": "",
    "dataSourceType": "Connector",
    "apis": {
      "Get-AdminAppRoleAssignment": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}/permissions",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Set-AdminAppOwner": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}/modifyAppOwner",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": false,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      },
      "Set-AppQuarantineState": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}/setAppQuarantineState",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": false,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      },
      "Set-PowerAppConditionalAccess": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}/setPowerAppConditionalAccessDetails",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": false,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      },
      "Get-AdminApps": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer"
          },
          {
            "name": "$skiptoken",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          },
          "default": {
            "type": "void"
          }
        }
      },
      "Get-PowerAppConditionalAccess": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}/getPowerAppConditionalAccessDetails",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "array"
          }
        }
      },
      "Get-AdminApp": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Remove-AdminApp": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}",
        "method": "DELETE",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      },
      "Edit-AdminAppRoleAssignment": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apps/{app}/modifyPermissions",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "app",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$filter",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Get-AdminConnections": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/connections",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Remove-AdminConnection": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apis/{connectorName}/connections/{connectionName}",
        "method": "DELETE",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connectorName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connectionName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      },
      "Get-AdminConnectionRoleAssignment": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apis/{connectorName}/connections/{connectionName}/permissions",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connectorName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connectionName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Edit-AdminConnectionRoleAssignment": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apis/{connector}/connections/{connection}/modifyPermissions",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connector",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connection",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": false,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      },
      "Get-AdminConnectors": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apis",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Get-AdminConnectorRoleAssignment": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apis/{connectorName}/permissions",
        "method": "GET",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connectorName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "$top",
            "in": "query",
            "required": false,
            "type": "integer"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "object"
          }
        }
      },
      "Edit-AdminConnectorRoleAssignment": {
        "path": "/{connectionId}/providers/Microsoft.PowerApps/scopes/admin/environments/{environment}/apis/{connectorName}/modifyPermissions",
        "method": "POST",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "environment",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "connectorName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "api-version",
            "in": "query",
            "required": false,
            "type": "string"
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": false,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": false,
            "type": "object"
          }
        ],
        "responseInfo": {
          "200": {
            "type": "void"
          }
        }
      }
    }
  }
};

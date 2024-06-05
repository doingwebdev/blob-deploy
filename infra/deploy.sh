#!/bin/bash

# Set default location
location="eastus2"

# Check for the existence of the resource group, create if not exists
resourceGroupName="myResourceGroup"
if ! az group exists --name $resourceGroupName; then
  echo "Creating resource group: $resourceGroupName"
  az group create --name $resourceGroupName --location $location
else
  echo "Resource group $resourceGroupName already exists."
fi

# Deploy resources using Bicep file
echo "Deploying resources to $resourceGroupName in $location..."
az deployment group create --resource-group $resourceGroupName --template-file infra/main.bicep --parameters location=$location

# Check for the existence of the storage account, create if not exists
storageAccountName="mystorageaccount"
if ! az storage account check-name --name $storageAccountName --query 'nameAvailable'; then
  echo "Creating storage account: $storageAccountName"
  az storage account create --name $storageAccountName --resource-group $resourceGroupName --location $location --sku Standard_LRS
else
  echo "Storage account $storageAccountName already exists."
fi

# Upload contents of /src to the Azure blob storage
echo "Uploading contents of /src to $storageAccountName..."
az storage blob upload-batch --account-name $storageAccountName --source src --destination \$web

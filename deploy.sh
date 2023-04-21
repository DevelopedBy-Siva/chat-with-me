#!/bin/sh

echo "Preparing application for deployment...\n"

PROJECT_DIR="/Users/technophyle/Code/chat-with-me"
DEPLOYMENT_FOLDER="/Users/technophyle/Code/deploy-chatwithme"
CLIENT_FOLDER="${DEPLOYMENT_FOLDER}/client/"
SERVER_FOLDER="${DEPLOYMENT_FOLDER}/server/"

trap "rm -rf ${DEPLOYMENT_FOLDER}" ERR EXIT

rm -rf $DEPLOYMENT_FOLDER

mkdir $DEPLOYMENT_FOLDER

# Client
read -p "Do you want to deploy client (y/n)? " choice

if [[ $choice == "y" || $choice == "Y" ]]; then
    echo "Please wait...\n"
    mkdir $CLIENT_FOLDER
    cd $CLIENT_FOLDER
    git clone git@github.com:DevelopedBy-Siva/chat-with-me.git -b client
    cd ./chat-with-me
    echo "\nPreparing client code for deployment..."
    yes | cp -a "${PROJECT_DIR}/client/." .
    git status
    read -p "These are changes to be pushed. Continue (y/n)?" choice
    if [[ $choice == "y" || $choice == "Y" ]]; then
        read -p "Enter a commit message: " message
        git add .
        git commit $message
        git push origin client
        echo "\nClient changes successfully pushed to remote repository. You can check the deployment status in GitHub"
    fi
fi

# Server
read -p "Do you want to deploy server (y/n)? " choice

if [[ $choice == "y" || $choice == "Y" ]]; then
    echo "Please wait...\n"
    mkdir $SERVER_FOLDER
    cd $SERVER_FOLDER
    git clone git@github.com:DevelopedBy-Siva/chat-with-me.git -b server
    cd ./chat-with-me
    echo "\nPreparing server code for deployment..."
    yes | cp -a "${PROJECT_DIR}/server/." .
    git status
    read -p "These are changes to be pushed. Continue (y/n)?" choice
    if [[ $choice == "y" || $choice == "Y" ]]; then
        read -p "Enter a commit message: " message
        git add .
        git commit $message
        git push origin server
        echo "\nServer changes successfully pushed to remote repository. You can check the deployment status in GitHub"
    fi
fi

echo "\nFINISHED...\n"
#!/bin/bash

# Function to run Docker Compose
run_compose() {
    echo "Preparing the project..."
    docker network create "web"
    local file=$1
    echo "Running Docker Compose using $file..."
    docker-compose --env-file ./.env -f $file up -d
}

# User prompt to select environment
echo "Select environment: [dev/prod]"
read ENVIRONMENT

# Determine the compose file based on user input
if [ "$ENVIRONMENT" == "prod" ]; then
    COMPOSE_FILE="./compose.prod.yml"
elif [ "$ENVIRONMENT" == "dev" ]; then
    COMPOSE_FILE="./compose.dev.yml"
else
    echo "Invalid environment selected. Please choose 'dev' or 'prod'."
    exit 1
fi

# Run the appropriate Docker Compose file
run_compose $COMPOSE_FILE

#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env.example exists
if [ ! -f .env.example ]; then
    echo "Error: .env.example file not found"
    exit 1
fi

# Copy .env.example to .env
cp .env.example .env
echo -e "${GREEN}Created .env file from .env.example${NC}"

# Function to generate secrets
generate_secrets() {
    # Generate JWT_SECRET
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i "s|JWT_SECRET=\"\"|JWT_SECRET=\"$JWT_SECRET\"|" .env
    
    # Generate COOKIE_SECRET (48 bytes will give us ~64 characters after base64)
    COOKIE_SECRET=$(head -c 48 /dev/urandom | base64 | tr -d '\n' | tr -d '=' )
    COOKIE_SECRET_ESCAPED=$(echo "$COOKIE_SECRET" | sed 's/[\/&]/\\&/g')
    sed -i "s|COOKIE_SECRET=\"\"|COOKIE_SECRET=\"$COOKIE_SECRET_ESCAPED\"|" .env
    
    # Generate MEILI_MASTER_KEY
    MEILI_MASTER_KEY=$(openssl rand -base64 32)
    sed -i "s|MEILI_MASTER_KEY=\"\"|MEILI_MASTER_KEY=\"$MEILI_MASTER_KEY\"|" .env
    
    echo -e "${GREEN}Generated secrets successfully${NC}"
}

# Ask user if they want to generate secrets
read -p "Do you want to auto-generate secrets? (yes/no): " GENERATE_SECRETS

case $GENERATE_SECRETS in
    [Yy]* ) generate_secrets;;
    [Nn]* ) echo "Skipping secret generation";;
    * ) echo "Please answer yes or no. Skipping secret generation";;
esac

# Ask for domain
read -p "Enter your domain (without http/https): " DOMAIN

if [ -n "$DOMAIN" ]; then
    # Replace all instances of example.com with the provided domain
    sed -i "s|example.com|$DOMAIN|g" .env
    echo -e "${GREEN}Replaced domain successfully${NC}"
else
    echo "No domain provided, keeping example.com"
fi

echo -e "${BLUE}Environment setup complete! Please review your .env file${NC}"

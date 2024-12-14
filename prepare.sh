#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Files that need domain replacement
FILES_TO_SWAP_DOMAINS=(
    ".env"
    "./caddy/Caddyfile"
    "./frontend/next.config.js"
)

# Function to validate domain format
validate_domain() {
    if [[ ! $1 =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$ ]]; then
        echo -e "${RED}Invalid domain format. Please use format like: yourdomain.com${NC}"
        return 1
    fi
    return 0
}

# Function to validate email format
validate_email() {
    if [[ ! $1 =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
        echo -e "${RED}Invalid email format. Please use format like: your@email.com${NC}"
        return 1
    fi
    return 0
}

# Gather all inputs first
echo -e "${BLUE}Welcome to environment setup script${NC}"
echo "-------------------------------------"

# 1. Get domain
while true; do
    read -p "Enter your domain (without http/https, e.g., yourdomain.com): " DOMAIN
    if validate_domain "$DOMAIN"; then
        break
    fi
done

# 2. Get email for SSL
while true; do
    read -p "Enter email for SSL certificates: " SSL_EMAIL
    if validate_email "$SSL_EMAIL"; then
        break
    fi
done

# 3. Ask about secrets
while true; do
    read -p "Do you want to auto-generate secrets? (yes/no): " GENERATE_SECRETS
    case $GENERATE_SECRETS in
        [Yy]* ) GENERATE_SECRETS="yes"; break;;
        [Nn]* ) GENERATE_SECRETS="no"; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo -e "\n${BLUE}Starting setup process...${NC}"

# 1. Copy .env.example to .env
if [ ! -f .env.example ]; then
    echo -e "${RED}Error: .env.example file not found${NC}"
    exit 1
fi

cp .env.example .env
echo -e "${GREEN}Created .env file from .env.example${NC}"

# 2. Replace domains in all specified files
echo "Updating domain in files..."
for file in "${FILES_TO_SWAP_DOMAINS[@]}"; do
    if [ -f "$file" ]; then
        sed -i "s|example.com|$DOMAIN|g" "$file"
        echo -e "${GREEN}Updated domain in $file${NC}"
    else
        echo -e "${RED}Warning: $file not found, skipping...${NC}"
    fi
done

# Update SSL email in Caddyfile
if [ -f "./caddy/Caddyfile" ]; then
    # First, check if the tls line exists
    if grep -q "tls" "./caddy/Caddyfile"; then
        sed -i "s|tls [^ ]*|tls $SSL_EMAIL|g" "./caddy/Caddyfile"
    else
        # If no tls line exists, add it after the domain line
        sed -i "/^$DOMAIN {/a \  tls $SSL_EMAIL" "./caddy/Caddyfile"
    fi
    echo -e "${GREEN}Updated SSL email in Caddyfile${NC}"
else
    echo -e "${RED}Warning: ./caddy/Caddyfile not found, skipping SSL email update...${NC}"
fi

# 3. Generate and update secrets if requested
if [ "$GENERATE_SECRETS" = "yes" ]; then
    echo "Generating secrets..."
    
    # Generate JWT_SECRET
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i "s|JWT_SECRET=\"\"|JWT_SECRET=\"$JWT_SECRET\"|" .env
    
    # Generate COOKIE_SECRET
    COOKIE_SECRET=$(head -c 48 /dev/urandom | base64 | tr -d '\n' | tr -d '=' )
    COOKIE_SECRET_ESCAPED=$(echo "$COOKIE_SECRET" | sed 's/[\/&]/\\&/g')
    sed -i "s|COOKIE_SECRET=\"\"|COOKIE_SECRET=\"$COOKIE_SECRET_ESCAPED\"|" .env
    
    # Generate MEILI_MASTER_KEY
    MEILI_MASTER_KEY=$(openssl rand -base64 32)
    sed -i "s|MEILI_MASTER_KEY=\"\"|MEILI_MASTER_KEY=\"$MEILI_MASTER_KEY\"|" .env
    
    echo -e "${GREEN}Generated and updated secrets successfully${NC}"
fi

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "${BLUE}Please review the updated files:${NC}"
echo "1. .env - Check all environment variables"
echo "2. ./caddy/Caddyfile - Verify domain and SSL settings"
echo "3. ./frontend/next.config.js - Confirm domain settings"
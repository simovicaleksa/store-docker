#!/bin/bash

# Function to validate email format
validate_email() {
    if [[ $1 =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
        return 0
    else
        return 1
    fi
}

# Function to validate password (at least 8 characters)
validate_password() {
    if [[ ${#1} -ge 8 ]]; then
        return 0
    else
        return 1
    fi
}

# Clear screen for better UX
clear

echo "=== Medusa Store Setup ==="
echo "This script will create an admin user and seed the database."
echo

# Get and validate email
while true; do
    read -p "Enter admin email: " email
    if validate_email "$email"; then
        break
    else
        echo "Invalid email format. Please try again."
    fi
done

# Get and validate password
while true; do
    read -s -p "Enter admin password (min 8 characters): " password
    echo
    if validate_password "$password"; then
        break
    else
        echo "Password must be at least 8 characters long. Please try again."
    fi
done

echo
echo "Creating admin user..."
docker exec store-backend medusa user -e "$email" -p "$password"

if [ $? -eq 0 ]; then
    echo "Admin user created successfully!"
    
    echo
    echo "Seeding database..."
    docker exec store-backend medusa seed -f ./data/seed-onboarding.json
    
    if [ $? -eq 0 ]; then
        echo "Database seeded successfully!"
        echo
        echo "Setup complete! You can now log in to your Medusa store with:"
        echo "Email: $email"
        echo "Password: [your chosen password]"
    else
        echo "Error: Failed to seed database"
        exit 1
    fi
else
    echo "Error: Failed to create admin user"
    exit 1
fi
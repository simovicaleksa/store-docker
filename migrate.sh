#!/bin/bash

# Array of target locations for .env file
TARGET_LOCATIONS=(
    "./frontend/.env"
)

# Source .env file location (same directory as this script)
SOURCE_ENV="$(dirname "$0")/.env"

# Text colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print success message
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error message
print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if source .env file exists
if [ ! -f "$SOURCE_ENV" ]; then
    print_error "Source .env file not found at: $SOURCE_ENV"
    exit 1
fi

# Counter for successful copies
success_count=0

# Iterate through target locations
for target in "${TARGET_LOCATIONS[@]}"; do
    # Create target directory if it doesn't exist
    target_dir=$(dirname "$target")
    mkdir -p "$target_dir"
    
    # Copy the file
    if cp "$SOURCE_ENV" "$target"; then
        print_success "Copied .env to: $target"
        ((success_count++))
    else
        print_error "Failed to copy .env to: $target"
    fi
done

# Print summary
echo -e "\nMigration Summary:"
echo "Total targets: ${#TARGET_LOCATIONS[@]}"
echo "Successful copies: $success_count"

if [ "$success_count" -eq "${#TARGET_LOCATIONS[@]}" ]; then
    echo -e "${GREEN}All files copied successfully!${NC}"
    exit 0
else
    echo -e "${RED}Some copies failed. Please check the errors above.${NC}"
    exit 1
fi
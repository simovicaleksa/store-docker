#!/bin/bash

# Usage function to display help
usage() {
    echo "Usage: $0 [-d] [additional arguments]"
    echo "   -d  Run containers in detached mode"
    exit 1
}

# Default values
DETACHED=""

# Parse command-line options
while getopts "d" opt; do
    case $opt in
        d)
            DETACHED="-d"
            ;;
        *)
            usage
            ;;
    esac
done

# Shift parsed options to get additional arguments
shift $((OPTIND - 1))

# Run docker compose with the prod compose file
docker compose -f compose.prod.yml up --build $DETACHED "$@"

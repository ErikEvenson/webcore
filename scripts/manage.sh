#!/bin/bash
# A management script.
#
# 2012-2014 3E Enterprises, LLC

# Get script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Load dependencies
# source "$DIR/scripts/bash_utility_functions.sh"

# Set usage string
USAGE=$(cat <<EOF
Usage: ${0##*/} test
EOF
)

# Grab the command and shift the positional parameters.
COMMAND=${1:-$_NULL}
shift

# Set script parameters
# Switch between various management commands
case $COMMAND in
  test)
    echo "TEST"
    exit
    ;;
esac

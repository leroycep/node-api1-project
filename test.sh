#!/usr/bin/env sh

# Get output of /api/users
echo "GET /api/users"
curl -sS http://localhost:8482/api/users | jq .

# Post a new users
echo "POST /api/users correctly"
curl -sS http://localhost:8482/api/users \
    -H "Content-Type: application/json" \
    -d '{ "name":"Ryuko Matoi", "bio":"New kid on the block" }' | jq .

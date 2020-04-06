#!/usr/bin/env sh

# Get output of /api/users
echo "GET /api/users"
curl -sS http://localhost:8482/api/users | jq .

# Post a new user
echo "POST /api/users -- correctly"
USER=$(
    curl -sS http://localhost:8482/api/users \
        -H "Content-Type: application/json" \
        -d '{ "name":"Ryuko Matoi", "bio":"New kid on the block" }'
)

printf "%s\n" "$USER" | jq .

# Post a new user, but the user object is incorrect
echo "POST /api/users -- incorrectly"
curl -sS http://localhost:8482/api/users \
    -H "Content-Type: application/json" \
    -d '{ "name":"Hello", "age":20 }' | jq .

# Get a specific user
echo "GET /api/users/:id -- get user that we just posted"
ID=$(printf "%s" "$USER" | jq -r .id)
curl -sS "http://localhost:8482/api/users/${ID}" | jq .

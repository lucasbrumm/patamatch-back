#!/bin/bash

# Create .env file
echo "Creating .env file..."
cat > .env << EOL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/patamatch"
EOL

echo ".env file created successfully!"
echo "Database URL configured as: postgresql://postgres:postgres@localhost:5432/patamatch"

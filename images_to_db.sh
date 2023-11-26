#!/bin/bash

# Database connection parameters
DB_HOST="localhost"
DB_NAME="test"
DB_USER="levi"
DB_PASSWORD="test"

IMAGE_DIRECTORY="data/images"

export PGPASSWORD=$DB_PASSWORD

for FILE_PATH in $IMAGE_DIRECTORY/*; do

    if [ -f "$FILE_PATH" ]; then

        FILE_NAME=$(basename "$FILE_PATH")

        QUERY="INSERT INTO soundmap_images (name, file_path) VALUES ('$FILE_NAME', '$FILE_PATH');"

        psql -h "$DB_HOST" -d "$DB_NAME" -U "$DB_USER" -p 5433 -c "$QUERY"
    fi
done

echo "Image paths loaded into the database successfully."


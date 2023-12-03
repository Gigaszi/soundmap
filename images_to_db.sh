#!/bin/bash

# Database connection parameters
DB_HOST="localhost"
DB_NAME="test"
DB_USER="levi"
DB_PASSWORD="test"

IMAGE_DIRECTORY="assets/images"
LOCALHOST_ROOT="http://localhost:4200"

export PGPASSWORD=$DB_PASSWORD

for FILE_PATH in $IMAGE_DIRECTORY/*; do

    if [ -f "$FILE_PATH" ]; then

        FILE_NAME=$(basename "$FILE_PATH")

        # Update the file_path to use localhost as the root
        FILE_PATH_LOCALHOST="$LOCALHOST_ROOT/${IMAGE_DIRECTORY}/${FILE_NAME}"

        QUERY="INSERT INTO soundmap_images (name, file_path) VALUES ('$FILE_NAME', '$FILE_PATH_LOCALHOST');"

        psql -h "$DB_HOST" -d "$DB_NAME" -U "$DB_USER" -p 5433 -c "$QUERY"
    fi
done

echo "Image paths loaded into the database successfully."

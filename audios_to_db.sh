#!/bin/bash

# Database connection parameters
DB_HOST="localhost"
DB_NAME="test"
DB_USER="levi"
DB_PASSWORD="test"

AUDIO_DIRECTORY="assets/audios"
LOCALHOST_ROOT="http://localhost:4200"

export PGPASSWORD=$DB_PASSWORD

for FILE_PATH in $AUDIO_DIRECTORY/*; do

    if [ -f "$FILE_PATH" ]; then

        FILE_NAME=$(basename "$FILE_PATH")
        echo $FILE_NAME
        # Update the file_path to use localhost as the root
        FILE_PATH_LOCALHOST="$LOCALHOST_ROOT/${AUDIO_DIRECTORY}/${FILE_NAME}"

        QUERY="INSERT INTO soundmap_audios (name, file_path) VALUES ('$FILE_NAME', '$FILE_PATH_LOCALHOST');"

        psql -h "$DB_HOST" -d "$DB_NAME" -U "$DB_USER" -p 5433 -c "$QUERY"
    fi
done

echo "Audio paths loaded into the database successfully."

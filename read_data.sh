#!/bin/bash

# Check if the root directory path is provided
if [ -z "$1" ]; then
    echo "Please provide the path to the root directory containing subdirectories with .docx files."
    exit 1
fi

# Check if output JSON file is provided
if [ -z "$2" ]; then
    echo "Please provide the name of the output JSON file."
    exit 1
fi

# Root directory containing subdirectories with .docx files
ROOT_DIR="$1"

# Output JSON file
OUTPUT_FILE="$2"

# Initialize the JSON structure
echo '{"points": [' > "$OUTPUT_FILE"

# Initialize counter for incremental ID
ID=1

# Directories for images and sounds
IMAGE_DIR="$ROOT_DIR/image"
SOUND_DIR="$ROOT_DIR/sound"

# Create directories if they don't exist
mkdir -p "$IMAGE_DIR"
mkdir -p "$SOUND_DIR"

# Loop through all subdirectories in the specified root directory
for SUBDIR in "$ROOT_DIR"/*/; do
    # Check if the subdirectory exists
    if [ -d "$SUBDIR" ]; then
        echo "Processing directory: $SUBDIR"

        # Initialize variables for image and sound files
        JPG_FILE=""
        FLAC_FILE=""

        # Check for .jpg and .flac files in the current subdirectory
        if ls "$SUBDIR"*.jpg 1> /dev/null 2>&1; then
            JPG_FILE=$(ls "$SUBDIR"*.jpg | head -n 1)  # Get the first jpg file
        fi

        if ls "$SUBDIR"*.flac 1> /dev/null 2>&1; then
            FLAC_FILE=$(ls "$SUBDIR"*.flac | head -n 1)  # Get the first flac file
        fi

        # Loop through all .docx files in the current subdirectory
        for DOCX_FILE in "$SUBDIR"*.docx; do
            # Check if the file exists
            if [ -f "$DOCX_FILE" ]; then
                echo "Processing $DOCX_FILE..."

                # Extract text from the .docx file using docx2txt
                docx2txt "$DOCX_FILE" temp.txt

                # Read the extracted text
                TEXT=$(cat temp.txt)

                # Parse fields using grep
                TITLE_DE=$(echo "$TEXT" | grep -oP "(?<=Titel_de:\s).*")
                DESCRIPTION_DE=$(echo "$TEXT" | grep -oP "(?<=Beschreibung_de:\s).*")
                TITLE_EN=$(echo "$TEXT" | grep -oP "(?<=Titel_en:\s).*")
                DESCRIPTION_EN=$(echo "$TEXT" | grep -oP "(?<=Beschreibung_en:\s).*")
                COORDINATES=$(echo "$TEXT" | grep -oP "(?<=Koordinaten:\s).*")
                COLOR=$(echo "$TEXT" | grep -oP "(?<=Farbe:\s).*")
                IMAGE=$(echo "$TEXT" | grep -oP "(?<=Bild:\s).*")

                # Split coordinates on comma
                LAT=$(echo "$COORDINATES" | cut -d',' -f1)
                LON=$(echo "$COORDINATES" | cut -d',' -f2 | sed 's/^ *//')  # Remove leading spaces from LON

                # Create an array for image paths
                IMAGE_PATHS=()

                # Copy and rename JPG file if it exists
                if [ -n "$JPG_FILE" ]; then
                    IMAGE_PATH="$IMAGE_DIR/$ID.jpg"
                    cp "$JPG_FILE" "$IMAGE_PATH"
                    IMAGE_PATHS+=("http://localhost:4200/assets/images/$ID.jpg")
                    echo "Copied $JPG_FILE to $IMAGE_PATH"
                fi

                # Copy and rename FLAC file if it exists
                AUDIO_PATH=""
                if [ -n "$FLAC_FILE" ]; then
                    AUDIO_PATH="http://localhost:4200/assets/audios/$ID.flac"
                    cp "$FLAC_FILE" "$SOUND_DIR/$ID.flac"
                    echo "Copied $FLAC_FILE to $SOUND_DIR/$ID.flac"
                fi

                # Prepare the JSON object for this point using the same headers as the CSV
                JSON_POINT=$(cat <<EOF
{
    "id": $ID,
    "title_de": "$TITLE_DE",
    "description_de": "$DESCRIPTION_DE",
    "title_en": "$TITLE_EN",
    "description_en": "$DESCRIPTION_EN",
    "coordinates": [$LAT, $LON],
    "color": "$COLOR",
    "image_paths": [$(IFS=,; echo "\"${IMAGE_PATHS[*]}\"")],
    "audio_path": "$AUDIO_PATH"
}
EOF
)

                # Write the JSON object to the output file
                echo "$JSON_POINT," >> "$OUTPUT_FILE"

                # Clean up the temporary file
                rm temp.txt

                # Increment the ID for the next entry
                ID=$((ID + 1))
            else
                echo "No .docx files found in directory $SUBDIR."
            fi
        done
    fi
done

# Finalize the JSON structure
# Remove the last comma and close the JSON array and object
sed -i '$ s/,$//' "$OUTPUT_FILE"  # Remove the last comma
echo ']}' >> "$OUTPUT_FILE"

echo "Data saved to $OUTPUT_FILE"

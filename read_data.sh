#!/bin/bash


if [ -z "$1" ]; then
    echo "Please provide the path to the root directory containing subdirectories with .docx files."
    exit 1
fi

# Check if output CSV file is provided
if [ -z "$2" ]; then
    echo "Please provide the name of the output CSV file."
    exit 1
fi

ROOT_DIR="$1"


OUTPUT_FILE="$2"

# Create CSV header (if the file doesn't exist)
if [ ! -f "$OUTPUT_FILE" ]; then
    echo "id,title_de,description_de,title_en,description_en,latitude,longitude,color,image" > "$OUTPUT_FILE"
fi

# Initialize counter for incremental ID
ID=1


IMAGE_DIR="$ROOT_DIR/image"
SOUND_DIR="$ROOT_DIR/sound"

mkdir -p "$IMAGE_DIR"
mkdir -p "$SOUND_DIR"

# Loop through all subdirectories in the specified root directory
for SUBDIR in "$ROOT_DIR"/*/; do

    if [ -d "$SUBDIR" ]; then
        echo "Processing directory: $SUBDIR"

        JPG_FILE=""
        FLAC_FILE=""

        # Check for .jpg and .flac files in the current subdirectory
        if ls "$SUBDIR"*.jpg 1> /dev/null 2>&1; then
            JPG_FILE=$(ls "$SUBDIR"*.jpg | head -n 1)
        fi

        if ls "$SUBDIR"*.flac 1> /dev/null 2>&1; then
            FLAC_FILE=$(ls "$SUBDIR"*.flac | head -n 1)
        fi

        for DOCX_FILE in "$SUBDIR"*.docx; do
            if [ -f "$DOCX_FILE" ]; then
                echo "Processing $DOCX_FILE..."

                # Extract text from .docx file
                docx2txt "$DOCX_FILE" temp.txt

		# Read extracted text
                TEXT=$(cat temp.txt)

                # Parse fields
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

                # Append data to the CSV file with incremental ID
                echo "$ID,\"$TITLE_DE\",\"$DESCRIPTION_DE\",\"$TITLE_EN\",\"$DESCRIPTION_EN\",$LAT,$LON,\"$COLOR\",\"$IMAGE\"" >> "$OUTPUT_FILE"

                rm temp.txt

                if [ -n "$JPG_FILE" ]; then
                    cp "$JPG_FILE" "$IMAGE_DIR/$ID.jpg"
                    echo "Copied $JPG_FILE to $IMAGE_DIR/$ID.jpg"
                fi

                if [ -n "$FLAC_FILE" ]; then
                    cp "$FLAC_FILE" "$SOUND_DIR/$ID.flac"
                    echo "Copied $FLAC_FILE to $SOUND_DIR/$ID.flac"
                fi

                ID=$((ID + 1))
            else
                echo "No .docx files found in directory $SUBDIR."
            fi
        done
    fi
done

echo "Data saved to $OUTPUT_FILE"

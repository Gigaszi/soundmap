
#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 file.json replacement_domain"
  exit 1
fi

FILE="$1"
REPLACEMENT="$2"

jq --arg rep "$REPLACEMENT" '
  walk(
    if type == "string" then
      gsub("localhost(:[0-9]+)?"; $rep)
    else
      .
    end
  )
' "$FILE" > tmp.json && mv tmp.json "$FILE"

echo "Replaced 'localhost[:port]' with '$REPLACEMENT' in $FILE"

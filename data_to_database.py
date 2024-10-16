import json
import psycopg2

# Read the JSON file
with open('points.json') as f:
    data = json.load(f)

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname='test', 
    user='levi', 
    password='test', 
    host='localhost',
    port='5433'
)
cur = conn.cursor()

# Insert data into the tables
for point in data['points']:

    # Insert into points table
    cur.execute(
        "INSERT INTO soundmap_points (name, geom, color) VALUES (%s, POINT(%s, %s), %s) RETURNING id", 
        (point['name'], point['coordinates'][0], point['coordinates'][1], point['color'],)
    )
    point_id = cur.fetchone()[0]
    
    # Insert into soundmap_image_paths table
    for file_path in point['image_paths']:
        cur.execute(
            "INSERT INTO public.soundmap_image_paths (point_id, file_path) VALUES (%s, %s)",
            (point_id, file_path)
        )
    
    # Insert into soundmap_audio_path table
    cur.execute(
        "INSERT INTO public.soundmap_audio_paths (id, file_path) VALUES (%s, %s)",
        (point_id, point['audio_path'])
    )

# Commit the changes and close the connection
conn.commit()
cur.close()
conn.close()

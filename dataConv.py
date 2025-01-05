import json
import requests

def get_wikipedia_image(title):
    """
    Fetch the main image URL from a Wikipedia page using its API.
    """
    try:
        endpoint = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "titles": title.replace(" ", "_"),
            "prop": "pageimages",
            "format": "json",
            "pithumbsize": 100
        }
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        data = response.json()
        print(f"API response for {title}: {data}")  # Debug: Print the API response
        page = next(iter(data['query']['pages'].values()))
        
        # Check if the thumbnail key exists and has a source URL
        image_url = page.get("thumbnail", {}).get("source", None)
        if not image_url:
            print(f"No image found for {title}")
        return image_url
    except Exception as e:
        print(f"Error fetching image for '{title}': {e}")
        return None

with open("db.json", "r", encoding="utf-8") as file:
    original_data = json.load(file)

movies = []
for key, value in original_data.items():
    movie = {"id": int(key), **value}
    print(f"Fetching image for: {movie['Title']}")
    movie["image"] = get_wikipedia_image(movie["Title"])
    movies.append(movie)

new_data = {"movies": movies}

with open("db_transformed.json", "w", encoding="utf-8") as file:
    json.dump(new_data, file, indent=4, ensure_ascii=False)

print("Transformation and image fetching complete. Check db_transformed.json.")
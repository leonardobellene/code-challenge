import pandas as pd
import sqlite3

# Define paths to your TSV files (current directory)
tsv_files = {
    "title_basics": "./title.basics.tsv",
    "title_principals": "./title.principals.tsv",
    "name_basics": "./name.basics.tsv",
    "title_ratings": "./title.ratings.tsv"  # Added ratings dataset
}

# Define your top 20 movie titles
top_movies = [
    "Pinocchio", "Zootopia", "One Hundred and One Dalmatians", "Dumbo",
    "Snow White and the Seven Dwarfs", "Moana", "Aladdin", "Beauty and the Beast",
    "The Little Mermaid", "Finding Nemo", "Toy Story", "The Lion King",
    "Fantasia", "The Incredibles", "Ratatouille", "Up", "Coco", "Inside Out",
    "WALL-E", "Toy Story 3"
]

# Function to print status updates with emojis
def status_update(message, emoji="✨"):
    print(f"{emoji} {message}")

# Load TSV data into Pandas DataFrames
def load_tsv(file_path, name):
    status_update(f"Loading {name} data from {file_path}...", "📂")
    return pd.read_csv(file_path, sep='\t', na_values='\\N', dtype=str)

status_update("Starting the IMDb data processing script!", "🚀")

# Step 1: Load data
title_basics = load_tsv(tsv_files["title_basics"], "Title Basics")
title_principals = load_tsv(tsv_files["title_principals"], "Title Principals")
name_basics = load_tsv(tsv_files["name_basics"], "Name Basics")
title_ratings = load_tsv(tsv_files["title_ratings"], "Title Ratings")  # Load Ratings

# Step 2: Filter movies
status_update("Filtering movies to include only the top 20 Disney animated movies...", "🎬")
filtered_titles = title_basics[
    (title_basics['primaryTitle'].isin(top_movies)) &
    (title_basics['titleType'] == 'movie')  # Ensure we only get movies
]
status_update(f"Filtered {len(filtered_titles)} movies from Title Basics.", "✅")

# Step 3: Merge Ratings Data
status_update("⭐ Adding ratings to the filtered movies...")
filtered_titles = filtered_titles.merge(
    title_ratings, on="tconst", how="left"
)
filtered_titles.rename(columns={"averageRating": "average_rating", "numVotes": "num_votes"}, inplace=True)
filtered_titles["average_rating"] = filtered_titles["average_rating"].astype(float)
filtered_titles["num_votes"] = filtered_titles["num_votes"].astype("Int64")  # Handle NaN values properly

status_update(f"✅ Added ratings for {filtered_titles['average_rating'].notna().sum()} movies.")

# Step 4: Filter principals
status_update("🎭 Filtering principals (cast and crew) for the selected movies...")
filtered_principals = title_principals[
    title_principals['tconst'].isin(filtered_titles['tconst'])
]
status_update(f"Filtered {len(filtered_principals)} principals.", "✅")

# Step 5: Filter names
status_update("Filtering names for the selected principals...", "🧑‍🎨")
filtered_names = name_basics[
    name_basics['nconst'].isin(filtered_principals['nconst'])
]
status_update(f"Filtered {len(filtered_names)} names.", "✅")

# Step 6: Save data to SQLite
status_update("Connecting to SQLite database...", "💾")
database_path = "imdb_subset.db"
conn = sqlite3.connect(database_path)

status_update("Saving filtered movies to the database...", "🎥")
filtered_titles.to_sql("movies", conn, if_exists="replace", index=False)
status_update("Saving filtered principals to the database...", "👥")
filtered_principals.to_sql("principals", conn, if_exists="replace", index=False)
status_update("Saving filtered names to the database...", "📜")
filtered_names.to_sql("names", conn, if_exists="replace", index=False)

conn.close()
status_update("All data has been successfully saved to the SQLite database!", "🎉")

status_update("Script completed. Enjoy exploring your IMDb data! 🚀", "🌟")
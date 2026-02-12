from app.services.scraper import extract_article
import sys

print("Testing scraper...")
# Use a known stable URL or a generic one. 
url = "https://www.google.com" # fallback
# Better to use a real news site if possible, but let's stick to something safe.
# Actually, the scraper expects article content. 
# Let's mock the internal logic or use a dummy URL that newspaper can handle or fail gracefully.
url = "https://example.com"

try:
    data = extract_article(url)
    if data:
        print(f"Title: {data['title']}")
        print(f"Text length: {len(data['text'])}")
    else:
        print("Result: None (as expected for example.com or if failed)")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)

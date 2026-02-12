import newspaper
from newspaper import Article
import requests
import cloudscraper
from bs4 import BeautifulSoup

def extract_article(url):
    """
    Extracts title, text, and metadata from a given URL.
    Returns a dictionary with article data or raises an exception.
    """
    try:
        # Use cloudscraper to bypass WAF/Cloudflare
        scraper = cloudscraper.create_scraper(browser='chrome')
        response = scraper.get(url, timeout=15)
        response.raise_for_status()
        
        # Initialize and parse
        article = Article(url)
        article.set_html(response.text)
        article.parse()
        
        # If text is too short, might be a failed parse or mostly JS
        if len(article.text) < 100:
             # Fallback to simple BS4 extraction if newspaper fails on some dynamic sites
             pass

        return {
            'title': article.title,
            'text': article.text,
            'authors': article.authors,
            'publish_date': article.publish_date.isoformat() if article.publish_date else None,
            'top_image': article.top_image,
            'images': list(article.images),
            'url': url
        }
    except Exception as e:
        # In production, log this error
        print(f"Error extracting article from {url}: {e}")
        return {'error': str(e)}

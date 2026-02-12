from transformers import pipeline
import sys

print("Starting model test...")
try:
    classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")
    print("Model loaded successfully.")
    result = classifier("This is a test article.")
    print(f"Prediction: {result}")
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

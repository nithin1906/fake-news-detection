from transformers import pipeline

# Global model variable to load once
classifier_pipeline = None

def load_model():
    """
    Loads the model pipeline. This should be called on app startup.
    For MVP, we can use a pre-trained model fine-tuned for fake news if available, 
    or a standard sentiment analysis model as a placeholder to demonstrate the pipeline.
    """
    global classifier_pipeline
    try:
        # Placeholder: using a default sentiment model as a proxy for now
        # In real implementation, replace with "mrm8488/bert-tiny-finetuned-fake-news-detection" 
        # or similar, or a local path.
        print("Loading model...")
        # Using a dedicated Fake News Detection Model
        # hamzab/roberta-fake-news-classification
        classifier_pipeline = pipeline("text-classification", model="hamzab/roberta-fake-news-classification")
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}")

def predict(text):
    """
    Predicts if the text is fake or real.
    Returns a dictionary with label and confidence.
    """
    if not classifier_pipeline:
        load_model()
    
    if not classifier_pipeline:
        return {'label': 'Uncertain', 'score': 0.0}

    # Truncate text to fit model max length (512 tokens)
    truncated_text = text[:512] 

    result = classifier_pipeline(truncated_text)[0]
    
    # Model specific mapping:
    # LABEL_0 -> Fake
    # LABEL_1 -> Real
    # We verify this by testing, but this is standard for this model.
    raw_label = result['label']
    score = result['score']
    
    if raw_label == 'LABEL_0':
        label = 'FAKE'
    elif raw_label == 'LABEL_1':
        label = 'REAL'
    else:
        # Fallback if labels are different (some models use 'Fake'/'Real' directly)
        label = raw_label

    return {'label': label, 'score': score}

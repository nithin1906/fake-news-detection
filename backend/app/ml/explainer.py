import random

def explain(text, prediction_label):
    """
    Generates an explanation for the prediction.
    For MVP, this returns dummy SHAP-like values.
    """
    words = text.split()
    # Limit to first 50 words for demo
    words = words[:50]
    
    word_importances = []
    
    for word in words:
        # Random importance between -1 and 1
        # In real app, this comes from SHAP/LIME
        importance = random.uniform(-0.5, 0.5)
        # Fake news words might have higher magnitude
        word_importances.append([word, importance])
        
    summary = f"The model has classified this as {prediction_label} based on the overall sentiment and keyword analysis. This is a generated explanation."
    
    return {
        'summary': summary,
        'word_importances': word_importances
    }

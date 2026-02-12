from flask import request, jsonify
from . import check_bp
from app.services.scraper import extract_article

@check_bp.route('/check', methods=['POST'])
def check_article():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    text = data.get('text')
    url = data.get('url')
    
    if not text and not url:
        return jsonify({'error': 'Please provide either text or a URL'}), 400
        
    extracted_data = {}
    if url:
        extracted_data = extract_article(url)
        if not extracted_data or 'error' in extracted_data:
             error_msg = extracted_data.get('error', 'Failed to extract article from URL')
             return jsonify({'error': error_msg}), 400
        text = extracted_data.get('text', '')
        
    # Integrate ML model
    from app.ml.classifier import predict
    from app.ml.explainer import explain
    
    # Predict
    prediction = predict(text)
    label = prediction['label']
    confidence = prediction['score']
    
    # Explain
    explanation = explain(text, label)
    
    response = {
        'label': label,
        'confidence': confidence,
        'explanation_summary': explanation['summary'],
        'word_importances': explanation['word_importances'],
        'metadata': extracted_data
    }
    
    return jsonify(response)

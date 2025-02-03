import pandas as pd
import json
import sys
from joblib import load

def load_models(model_dir='AI/models/'):
    # Load saved transformers and model
    scaler = load(f'{model_dir}scaler.joblib')
    poly = load(f'{model_dir}poly.joblib')
    model = load(f'{model_dir}model.joblib')
    return scaler, poly, model

def predict_percentage(scaler, poly, model, input_data):
    # Prepare input data
    input_df = pd.DataFrame([input_data])
    
    # Scale and transform input
    input_scaled = scaler.transform(input_df)
    input_poly = poly.transform(input_scaled)
    
    # Predict and clip result
    prediction = model.predict(input_poly)[0]
    return max(0, min(prediction, 100))

def main(data_features):
    # Load saved models
    scaler, poly, model = load_models()
    
    # Load user data
    with open('AI/data/userData.json', 'r') as file:
        user_data = json.load(file)[data_features]
    
    # Make prediction
    prediction = predict_percentage(scaler, poly, model, user_data)
    print(prediction)

if __name__ == "__main__":
    main(sys.argv[1])
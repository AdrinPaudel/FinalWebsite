# predict_model.py
import pandas as pd
import json
import sys
from joblib import load

def load_models(model_dir='AI/models/'):
    """Load saved transformers and model."""
    scaler = load(f'{model_dir}scaler.joblib')
    poly = load(f'{model_dir}poly.joblib')
    model = load(f'{model_dir}model.joblib')
    return scaler, poly, model

def predict_percentage(scaler, poly, model, input_data):
    """Predict payment percentage with input data."""
    input_df = pd.DataFrame([input_data])
    input_scaled = scaler.transform(input_df)
    input_poly = poly.transform(input_scaled)
    prediction = model.predict(input_poly)[0]
    return max(0, min(prediction, 100))

def main(data_features):
    """Main prediction function."""
    shouldPredict = True
    scaler, poly, model = load_models()
    
    with open('AI/data/userData.json', 'r') as file:
        user_data = json.load(file)[data_features]

    if (user_data["Premium Amount"]>user_data["Income"]*0.90):
        prediction = 0
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.90) and (user_data["Premium Amount"]>user_data["Income"]*0.80) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.2
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.80) and (user_data["Premium Amount"]>user_data["Income"]*0.70) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.4
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.70) and (user_data["Premium Amount"]>user_data["Income"]*0.60) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.6
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.60) and (user_data["Premium Amount"]>user_data["Income"]*0.50) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.7
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.50) and (user_data["Premium Amount"]>user_data["Income"]*0.40) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.8   
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.40) and (user_data["Premium Amount"]>user_data["Income"]*0.30) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.9  
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.30) and (user_data["Premium Amount"]>user_data["Income"]*0.20) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 0.95  
    elif (user_data["Premium Amount"]<=user_data["Income"]*0.20) and (user_data["Premium Amount"]>user_data["Income"]*0.10) :
        prediction = predict_percentage(scaler, poly, model, user_data)
        prediction = prediction * 1  
    else:
        prediction = predict_percentage(scaler, poly, model, user_data)
    print(prediction)

if __name__ == "__main__":
    main(sys.argv[1])
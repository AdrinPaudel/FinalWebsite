# train_model.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import Ridge
from joblib import dump

def load_and_preprocess_data(csv_path):
    # Read and preprocess data
    data = pd.read_csv(csv_path)
    
    # Map categorical features
    payment_type_map = {'yearly': 1.0, 'half_yearly': 0.5, 'quarterly': 0.25, 'monthly': 0.083}
    insurance_type_map = {'Endowment': 1.0}
    
    data['Payment Type'] = data['Payment Type'].map(payment_type_map)
    data['Insurance Type'] = data['Insurance Type'].map(insurance_type_map)
    
    # Separate features and target
    features = ['Age', 'Income', 'Insurance Type', 'Premium Amount',
                'Insured Years', 'Payment Type', 'Insured Amount']
    X = data[features]
    y = data['Percentage of Payment']
    
    return X, y

def train_and_save_model(csv_path, model_dir='models/'):
    # Create models directory if it doesn't exist
    import os
    os.makedirs(model_dir, exist_ok=True)
    
    # Load and preprocess data
    X, y = load_and_preprocess_data(csv_path)
    
    # Initialize transformers and model
    scaler = StandardScaler()
    poly = PolynomialFeatures(degree=2, include_bias=False)
    model = Ridge(alpha=1.0)
    
    # Fit transformers and model
    X_scaled = scaler.fit_transform(X)
    X_poly = poly.fit_transform(X_scaled)
    model.fit(X_poly, y)
    
    # Save transformers and model
    dump(scaler, f'{model_dir}scaler.joblib')
    dump(poly, f'{model_dir}poly.joblib')
    dump(model, f'{model_dir}model.joblib')
    
    print("Model and transformers saved successfully!")

if __name__ == "__main__":
    train_and_save_model('./data.csv')

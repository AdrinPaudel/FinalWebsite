# train_model.py
import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error, r2_score
from joblib import dump

def load_and_preprocess_data(csv_path):
    """Load and preprocess insurance data."""
    data = pd.read_csv(csv_path)
    
    # Map categorical features
    payment_type_map = {
        'yearly': 1.0, 
        'half_yearly': 0.5, 
        'quarterly': 0.25, 
        'monthly': 0.083
    }
    insurance_type_map = {'Endowment': 1.0}
    
    data['Payment Type'] = data['Payment Type'].map(payment_type_map)
    data['Insurance Type'] = data['Insurance Type'].map(insurance_type_map)
    
    features = [
        'Age', 'Income', 'Insurance Type', 'Premium Amount',
        'Insured Years', 'Payment Type', 'Insured Amount'
    ]
    X = data[features]
    y = data['Percentage of Payment']
    
    return X, y

def train_and_save_model(csv_path, model_dir='models/', test_size=0.2, random_state=42):
    """Train, evaluate, and save machine learning model."""
    os.makedirs(model_dir, exist_ok=True)
    
    X, y = load_and_preprocess_data(csv_path)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    scaler = StandardScaler()
    poly = PolynomialFeatures(degree=5, include_bias=False)
    model = Ridge(alpha=1.0)
    
    X_train_scaled = scaler.fit_transform(X_train)
    X_train_poly = poly.fit_transform(X_train_scaled)
    model.fit(X_train_poly, y_train)
    
    X_test_scaled = scaler.transform(X_test)
    X_test_poly = poly.transform(X_test_scaled)
    
    y_pred = model.predict(X_test_poly)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    dump(scaler, f'{model_dir}scaler.joblib')
    dump(poly, f'{model_dir}poly.joblib')
    dump(model, f'{model_dir}model.joblib')
    
    print(f"Model Performance - MSE: {mse:.4f}, R2: {r2:.4f}")
    return model, scaler, poly

if __name__ == "__main__":
    train_and_save_model('AI/data.csv')
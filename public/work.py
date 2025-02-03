import pandas as pd
import numpy as np

# Correct file path
file_path = 'C:/Users/paude/Desktop/term.csv'  
term_data = pd.read_csv(file_path)

# Define scaling ranges for the requested adjustments
scaling_ranges = {
    "scaled_0_to_10": (0, 0.1),
    "scaled_-10_to_0": (-0.1, 0)
}

# Determine min and max values for age and term from the data
min_age, max_age = term_data['Age'].min(), term_data['Age'].max()
min_term, max_term = 5, 52  # Assuming term ranges from 5 to 52

# Define a function to calculate the scaling factor
def calculate_variation_scaled(age, term, scale_min, scale_max):
    age_factor = (age - min_age) / (max_age - min_age)
    term_factor = (term - min_term) / (max_term - min_term)
    scaling_factor = scale_min + (age_factor + term_factor) * (scale_max - scale_min)
    return scaling_factor

# Generate and save the adjusted CSV files for each scaling range
for file_name, (scale_min, scale_max) in scaling_ranges.items():
    adjusted_data = term_data.copy()
    
    # Apply the scaling for each term
    for term in range(min_term, max_term + 1):
        term_column = str(term)
        if term_column in adjusted_data.columns:
            adjusted_data[term_column] = adjusted_data.apply(
                lambda row: row[term_column] * (1 + calculate_variation_scaled(row['Age'], term, scale_min, scale_max)) 
                if not np.isnan(row[term_column]) else np.nan,
                axis=1
            )
    
    # Round values to 3 decimal places
    adjusted_data = adjusted_data.round(3)
    
    # Save each adjusted file to your specified folder
    new_file_path = f'C:/Users/paude/Desktop/{file_name}_term.csv'
    adjusted_data.to_csv(new_file_path, index=False)
    print(f"Saved {new_file_path}")

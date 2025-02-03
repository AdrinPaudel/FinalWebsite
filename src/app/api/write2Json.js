'use server'
import fs from 'fs';
import path from 'path';

export const handlePremiumUpdate = (formData, premiumValue) => {
console.log(formData, premiumValue)
  const updatedData = {
    data1: {
      "Age": parseInt(formData.age),
      "Income": parseInt(formData.income),
      'Insurance Type':1,
      'Premium Amount': (premiumValue),
      'Insured Years': parseInt(formData.insuredTerm),
      'Payment Type': parseInt(formData.type),
      'Insured Amount': parseInt(formData.insuredAmount),
    }
  };
  
const filePath = path.join(process.cwd(), 'AI', 'data', 'userData.json');
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
};

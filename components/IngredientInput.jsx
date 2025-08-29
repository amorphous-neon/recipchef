
import React, { useState } from 'react';

const IngredientInput = ({ ingredients, onAddIngredient, onRemoveIngredient }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAddIngredient(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddClick();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., chicken breast, tomatoes"
          className="flex-grow w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-200"
        />
        <button
          onClick={handleAddClick}
          className="w-full sm:w-auto bg-gray-800 text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-900 transition-colors duration-300"
        >
          Add
        </button>
      </div>
      
      {ingredients.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm font-medium text-gray-700 mb-3">Your ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="flex items-center bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                {ingredient}
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="ml-2 text-emerald-600 hover:text-emerald-800 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
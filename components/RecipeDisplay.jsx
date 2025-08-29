
import React from 'react';

const RecipeDisplay = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
      <div className="p-6 sm:p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{recipe.recipeName}</h2>
        <p className="mt-3 text-lg text-gray-600">{recipe.description}</p>
        
        <div className="mt-6 flex items-center text-gray-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">{recipe.cookingTimeMinutes} minutes</span>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 sm:px-8 py-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
               <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-8 w-8 bg-emerald-600 text-white font-bold flex items-center justify-center rounded-full mr-4">{index + 1}</span>
                <span className="text-gray-700 mt-1">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;

import React, { useState, useCallback } from 'react';
import { generateRecipe } from './services/geminiService.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import IngredientInput from './components/IngredientInput.jsx';
import RecipeDisplay from './components/RecipeDisplay.jsx';
import Loader from './components/Loader.jsx';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddIngredient = (ingredient) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleGenerateRecipe = useCallback(async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">What's in your kitchen?</h2>
            <p className="mt-2 text-lg text-gray-600">List your ingredients and our AI chef will whip up a recipe for you!</p>
          </div>
          
          <IngredientInput
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
          />
          
          <div className="mt-8 text-center">
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || ingredients.length === 0}
              className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:shadow-none"
            >
              {isLoading ? 'Crafting Recipe...' : 'Generate Recipe'}
            </button>
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          {isLoading && <Loader />}
          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert"><p>{error}</p></div>}
          {recipe && !isLoading && <RecipeDisplay recipe={recipe} />}
           {!recipe && !isLoading && !error && (
            <div className="text-center py-10 px-6 bg-white rounded-2xl shadow-lg border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Your custom recipe will appear here</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add some ingredients above and click "Generate Recipe".
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
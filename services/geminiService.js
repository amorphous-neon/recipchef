
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "Creative and appealing name for the recipe."
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish."
    },
    cookingTimeMinutes: {
      type: Type.INTEGER,
      description: "The total estimated cooking time in minutes."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A required ingredient for the recipe, including quantity."
      },
      description: "A list of all ingredients needed, including those provided by the user and any additional ones."
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single step in the cooking instructions."
      },
      description: "A step-by-step guide to preparing the dish."
    },
  },
  required: ["recipeName", "description", "cookingTimeMinutes", "ingredients", "instructions"]
};

export const generateRecipe = async (ingredients) => {
  const prompt = `You are a world-class culinary expert. Based on the following ingredients: ${ingredients.join(', ')}, create a unique and delicious recipe. 
  Ensure you list all necessary ingredients, not just the ones provided.
  The instructions should be clear and easy to follow.
  Respond ONLY with a single JSON object that conforms to the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation to ensure the response structure is as expected
    if (
      !recipeData.recipeName ||
      !recipeData.description ||
      !recipeData.cookingTimeMinutes ||
      !Array.isArray(recipeData.ingredients) ||
      !Array.isArray(recipeData.instructions)
    ) {
      throw new Error("Invalid recipe format received from API.");
    }

    return recipeData;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate a recipe. The AI chef might be busy. Please try again later.");
  }
};
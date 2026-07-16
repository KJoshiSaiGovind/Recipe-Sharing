const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export const fetchRecipes = async (query) => {
  if (!query) return null;
  const response = await fetch(`${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

export const fetchMoreRecipes = async (nextPageUrl) => {
  if (!nextPageUrl) return null;
  const response = await fetch(nextPageUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch more recipes');
  }
  return response.json();
};

export const fetchRecipeById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return response.json();
};

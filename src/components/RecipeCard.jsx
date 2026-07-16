import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';
import './RecipeCard.css';

const RecipeCard = ({ recipeData }) => {
  const { recipe } = recipeData;
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  
  // Extracting unique ID from Edamam URI
  const id = recipe.uri.split('#recipe_')[1];
  const isFav = isFavorite(recipe.uri);

  return (
    <div className="recipe-card animate-fade-in">
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.label} className="recipe-image" loading="lazy" />
        <button 
          className="fav-btn" 
          onClick={() => toggleFavorite(recipeData)}
          aria-label="Toggle Favorite"
        >
          <Heart fill={isFav ? '#ef4444' : 'transparent'} size={24} />
        </button>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.label}</h3>
        <div className="recipe-meta">
          <span>{Math.round(recipe.calories)} kcal</span>
          <span>{recipe.cuisineType?.[0] || 'Mixed'}</span>
        </div>
        
        <div className="recipe-labels">
          {recipe.healthLabels?.slice(0, 3).map((label) => (
            <span key={label} className="label">{label}</span>
          ))}
        </div>
        
        <Link to={`/recipe/${id}`} className="view-btn">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;

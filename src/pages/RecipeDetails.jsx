import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorAlert from '../components/ErrorAlert';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data.recipe);
      } catch (err) {
        setError('Failed to load recipe details.');
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  if (loading) return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }}></div>
      <div style={{ marginTop: '2rem' }}><LoadingSkeleton count={1} /></div>
    </div>
  );

  if (error) return <ErrorAlert message={error} />;
  if (!recipe) return <ErrorAlert message="Recipe not found." />;

  return (
    <div className="animate-fade-in">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Search
      </Link>
      
      <div className="recipe-details-container">
        <div className="details-header">
          <img src={recipe.image} alt={recipe.label} className="details-image" />
          <div className="details-overlay">
            <div>
              <h1 className="details-title">{recipe.label}</h1>
              <div className="details-meta-top">
                <span>By {recipe.source}</span>
                {recipe.totalTime > 0 && <span>• {recipe.totalTime} mins</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="details-content">
          <div>
            <h2 className="section-title">Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="ingredient-item">
                  <CheckCircle2 size={20} className="ingredient-bullet" />
                  <span>{ing.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="section-title">Nutrition</h2>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <div className="nutrition-val">{Math.round(recipe.calories)}</div>
                <div className="nutrition-label">Calories</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-val">{Math.round(recipe.totalNutrients.PROCNT?.quantity || 0)}g</div>
                <div className="nutrition-label">Protein</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-val">{Math.round(recipe.totalNutrients.FAT?.quantity || 0)}g</div>
                <div className="nutrition-label">Fat</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-val">{Math.round(recipe.totalNutrients.CHOCDF?.quantity || 0)}g</div>
                <div className="nutrition-label">Carbs</div>
              </div>
            </div>

            <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="instructions-btn">
              Full Instructions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

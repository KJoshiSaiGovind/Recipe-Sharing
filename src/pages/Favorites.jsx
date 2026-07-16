import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Your Favorites</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Recipes you've saved for later</p>
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
          <Heart size={48} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No favorites yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Start searching and click the heart icon to save recipes here.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          {favorites.map((recipeData, index) => (
            <RecipeCard key={`fav-${recipeData.recipe.uri}-${index}`} recipeData={recipeData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

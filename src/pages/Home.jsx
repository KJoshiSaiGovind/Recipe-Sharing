import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorAlert from '../components/ErrorAlert';
import { fetchRecipes, fetchMoreRecipes } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [query, setQuery] = useState('healthy'); // Default query

  useEffect(() => {
    handleSearch(query);
  }, []);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError('');
    setQuery(searchQuery);
    try {
      const data = await fetchRecipes(searchQuery);
      if (data?.hits?.length === 0) {
        setError('No recipes found for your search. Please try another ingredient.');
        setRecipes([]);
        setNextPageUrl(null);
      } else {
        setRecipes(data.hits);
        setNextPageUrl(data._links?.next?.href || null);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recipes.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageUrl) return;
    setLoading(true);
    try {
      const data = await fetchMoreRecipes(nextPageUrl);
      setRecipes((prev) => [...prev, ...data.hits]);
      setNextPageUrl(data._links?.next?.href || null);
    } catch (err) {
      setError(err.message || 'Failed to load more recipes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Hero />
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorAlert message={error} />}

      {!error && (
        <>
          <div className="recipes-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            width: '100%',
            marginBottom: '3rem'
          }}>
            {recipes.map((recipeData, index) => (
              <RecipeCard key={`${recipeData.recipe.uri}-${index}`} recipeData={recipeData} />
            ))}
          </div>

          {loading && <LoadingSkeleton count={recipes.length > 0 ? 3 : 6} />}

          {nextPageUrl && !loading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                onClick={loadMore} 
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '1px solid var(--border-color)',
                  transition: 'background var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--border-color)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

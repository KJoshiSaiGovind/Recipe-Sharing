import { useState, useRef, useEffect } from 'react';
import { Search, History } from 'lucide-react';
import './SearchBar.css';

const PREDEFINED_SUGGESTIONS = ['Chicken', 'Vegetarian', 'Salad', 'Smoothie', 'Keto', 'Pasta'];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter an ingredient or recipe name.');
      return;
    }
    setError('');
    setShowSuggestions(false);
    onSearch(query.trim());
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setError('');
    onSearch(suggestion);
  };

  const filteredSuggestions = PREDEFINED_SUGGESTIONS.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-container" ref={containerRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for 'smoothie', 'salad', etc."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError('');
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <button type="submit" className="search-btn">
          <Search size={20} />
          <span>Search</span>
        </button>
      </form>
      
      {error && <span className="search-error">{error}</span>}

      {showSuggestions && (
        <div className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <History size={16} className="text-secondary" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

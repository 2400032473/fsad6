import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import '../styles/searchFilter.css';

function SearchFilter({ data, onFilter, categories = [], riskLevels = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, selectedCategory, selectedRisk);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category, selectedRisk);
  };

  const handleRiskChange = (risk) => {
    setSelectedRisk(risk);
    applyFilters(searchTerm, selectedCategory, risk);
  };

  const applyFilters = (search, category, risk) => {
    let filtered = [...data];

    // Search filter
    if (search) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Risk filter
    if (risk && risk !== 'all') {
      filtered = filtered.filter(item => item.risk === risk);
    }

    onFilter(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedRisk('all');
    onFilter(data);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedRisk !== 'all';

  return (
    <div className="search-filter-container">
      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search funds by name, category..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => handleSearch('')}
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="filter-section">
        <button
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
          {hasActiveFilters && <span className="filter-badge"></span>}
        </button>

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filter-panel">
          {categories.length > 0 && (
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {riskLevels.length > 0 && (
            <div className="filter-group">
              <label>Risk Level</label>
              <select
                value={selectedRisk}
                onChange={(e) => handleRiskChange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Risk Levels</option>
                {riskLevels.map(risk => (
                  <option key={risk} value={risk}>{risk}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchFilter;

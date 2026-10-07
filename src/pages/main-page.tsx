import {RecipesList} from '../components/recipes-list'
import '../app.css'
import { useState, type ChangeEvent, type SubmitEvent } from 'react';

export const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); 
  };

  const handleSearchSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setSubmittedQuery(searchQuery); 
  };
    return (
        <>
        <div className="page-title">
            <h1>Ricette Vegetariane</h1>
        </div>

        
      <main className="content">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input type="text" aria-label="Testo da cercare" value={searchQuery} onChange={handleInputChange} />
          <button type="submit">Vai</button>
        </form>
        <RecipesList searchQuery={submittedQuery} />
      </main>
      </>
    );
};
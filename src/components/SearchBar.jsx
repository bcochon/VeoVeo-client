import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import "./SearchBar.css";
import useUserService from "../services/userService";

const SearchResults = ({ loading, results = [] }) => {
  if (results?.length > 0) return (
    <>
      {results.map((result) => (
        <Link className="search-result" key={result?.id} to={`/users/${result?.id}`}>
          <img
            src="./placeholder.jpg"
            alt={`Foto de perfil de ${result?.username}`}
          />
          <span>{result?.username}</span>
        </Link>
      ))}
    </>
  );

  if (loading) return <p>Buscando...</p>;

  return (
    <p>Ningún resultado coincide con la búsqueda</p>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { searchUsers } = useUserService();

  useEffect(() => {
    if(!query || loading) return;
    const load = async () => {
      console.log('Buscando...');
      try {
        setLoading(true);
        const users = await searchUsers(query);
        setResults(users || []);
      } catch(err) {
        console.error(`Error buscando:`, err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [query]);

  const handleQueryChange = (e) => {
    if (loading) return;
    e.preventDefault();
    setQuery(e?.target?.value);
  }

  return (
    <header className="search-container fixed-top">
      <div className="searchbar-container">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className="searchbar"
          name="Búsqueda"
          type="search"
          onChange={handleQueryChange}
        />
      </div>
      {query && (
        <div className="search-results-container">
          <SearchResults loading={loading} results={results} />
        </div>
      )}
    </header>
  );
};

export default SearchBar;
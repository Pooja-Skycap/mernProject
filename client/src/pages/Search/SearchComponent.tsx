// SearchComponent.tsx
import React, { useState, useEffect } from "react";
import { typesenseClient } from "./typesense";

interface SearchHit {
  document: {
    id: string;
    title: string;
    [key: string]: any; // Use this for additional fields
  };
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      try {
        const searchResults = await typesenseClient
          .collections("Sites")
          .documents()
          .search({
            q: query,
            query_by: "shopname,address",
          });
          console.log('searchResults', searchResults)
        setResults(searchResults.hits);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);
  console.log("results", results);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((result) => (
          <li key={result.document.id}>{result.document.shopname}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;

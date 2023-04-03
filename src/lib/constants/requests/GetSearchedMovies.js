import React, { useState } from 'react'
import { apiKey } from '../API';
const SEARCHAPI =
    `https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=`;
export default function useSearchedMovies(query) {
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(SEARCHAPI + query);
            const data = await response.json();
            setSearchedMovies(() => [...data?.results]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    });
    return { searchedMovies, loading, error }
}



import { useEffect, useState } from 'react'
import { apiKey } from '../API';
import axios from 'axios';

export function useMovieDetails(id) {
    const [movieExtraDetails, setMoviesExtraDetails] = useState([]);
    const movieDetails = `
https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(movieDetails).then((res) => {
                    setMoviesExtraDetails(res.data);
                }).catch((err) => {
                    console.debug(err);
                })
            } catch (error) {
                console.debug(error);
            }
        }
        fetchData()
    }, [])

    return { movieExtraDetails }
}


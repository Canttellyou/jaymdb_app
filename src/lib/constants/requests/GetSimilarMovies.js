import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiKey } from '../API';

export default function useSimilarMovies(movieId) {
    const [similarMovies, setSimilarMovies] = useState([]);
    const [error, setError] = useState(null);
    const fetchMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`);
            const data = await response.json();
            setSimilarMovies(() => [...data?.results]);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    });

    return { similarMovies, setSimilarMovies, error }

}

const styles = StyleSheet.create({})